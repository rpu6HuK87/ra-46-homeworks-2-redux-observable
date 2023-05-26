import { ofType } from 'redux-observable'
import { ajax } from 'rxjs/ajax'
import { map, switchMap, catchError } from 'rxjs/operators'
import { ON_REQUEST } from '../actions/actionTypes'
import { onSuccess, onFailure } from '../actions/actionCreators'
import { of } from 'rxjs'

const apiUrl = process.env.REACT_APP_SERVICES_URL
console.log(process.env)

export const getServicesEpic = (action$) =>
  action$.pipe(
    ofType(ON_REQUEST),
    switchMap((o) =>
      ajax.getJSON(o.payload.id ? `${apiUrl}/${o.payload.id}` : apiUrl).pipe(
        map((data) => onSuccess(data)),
        catchError((e) => of(onFailure(e)))
      )
    )
  )
