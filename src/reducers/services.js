import { ON_REQUEST, ON_FAILURE, ON_SUCCESS } from '../actions/actionTypes'

const initialState = {
  dataset: false,
  loading: false,
  error: null
}

export function servicesReducer(state = initialState, action) {
  switch (action.type) {
    case ON_REQUEST:
      return {
        ...state,
        dataset: false,
        loading: true,
        error: null
      }
    case ON_FAILURE:
      const { error } = action.payload
      return {
        ...state,
        loading: false,
        error
      }
    case ON_SUCCESS:
      const { dataset } = action.payload
      return {
        ...state,
        dataset,
        loading: false,
        error: null
      }

    default:
      return state
  }
}
