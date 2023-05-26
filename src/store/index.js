import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import { combineEpics, createEpicMiddleware } from 'redux-observable'
import { servicesReducer } from '../reducers/services'
import { getServicesEpic } from '../epics'

const reducer = combineReducers({
  services: servicesReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const epic = combineEpics(getServicesEpic)

const epicMiddleware = createEpicMiddleware()

const store = createStore(
  reducer,
  composeEnhancers(applyMiddleware(epicMiddleware))
)

epicMiddleware.run(epic)

export default store
