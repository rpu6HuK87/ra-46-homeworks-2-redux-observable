import React, { useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { onRequest } from '../actions/actionCreators'

export const ServiceDetail = () => {
  const { serviceId } = useParams()
  const { dataset, loading, error } = useSelector((state) => state.services)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(onRequest(serviceId))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <>
      {loading && <div>Загрузка описания услуги #{serviceId}..</div>}
      {error ? (
        <div>
          <p>Ошибка загрузки</p>
          <button onClick={() => dispatch(onRequest(serviceId))}>
            Повторить
          </button>
        </div>
      ) : (
        dataset && (
          <div>
            <Link to="/">На главную</Link>
            <br />
            <p>Услуга: {dataset.name}</p>
            <p>Цена: {dataset.price}</p>
            <p>Описание: {dataset.content}</p>
          </div>
        )
      )}
    </>
  )
}
