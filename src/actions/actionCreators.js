import { ON_REQUEST, ON_FAILURE, ON_SUCCESS } from './actionTypes'

export const onRequest = (id = false) => ({
  type: ON_REQUEST,
  payload: { id }
})

export const onFailure = (error) => ({
  type: ON_FAILURE,
  payload: { error }
})

export const onSuccess = (dataset) => ({
  type: ON_SUCCESS,
  payload: { dataset }
})
