import { ofType } from 'redux-observable'
import { ajax } from 'rxjs/ajax'
import {
  map,
  tap,
  retry,
  debounceTime,
  switchMap,
  catchError
} from 'rxjs/operators'
import {
  CHANGE_SEARCH_FIELD,
  SEARCH_SKILLS_REQUEST
} from '../actions/actionTypes'
import {
  searchSkillsRequest,
  searchSkillsSuccess,
  searchSkillsFailure
} from '../actions/actionCreators'
import { of } from 'rxjs'

export const changeSearchEpic = (action$) =>
  action$.pipe(
    ofType(CHANGE_SEARCH_FIELD),
    map((o) => o.payload.search.trim()),
    //filter((o) => o !== ''),
    debounceTime(100),
    map((o) => searchSkillsRequest(o))
  )

const searchUrl =
  process.env.REACT_APP_SEARCH_URL || 'http://localhost:7070/api/search'
export const searchSkillsEpic = (action$) =>
  action$.pipe(
    ofType(SEARCH_SKILLS_REQUEST),
    map((o) => o.payload.search),
    map((o) => (o ? new URLSearchParams({ q: o }) : false)),
    tap((o) => console.log(o)),
    switchMap((o) =>
      o
        ? ajax.getJSON(`${searchUrl}?${o}`).pipe(
            retry(3),
            map((o) => searchSkillsSuccess(o)),
            catchError((e) => of(searchSkillsFailure(e)))
          )
        : of(searchSkillsSuccess([]))
    )
  )
