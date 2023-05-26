import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

import { useSelector, useDispatch } from 'react-redux'
import { onRequest } from '../actions/actionCreators'

export const ServiceList = () => {
  const { dataset, loading, error } = useSelector((state) => state.services)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(onRequest())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      {loading && <div>Загрузка списка услуг..</div>}
      {error ? (
        <div>
          <p>Ошибка загрузки</p>
          <button onClick={() => dispatch(onRequest())}>Повторить</button>
        </div>
      ) : (
        <nav>
          <ul className="nav nav-pills">
            {dataset instanceof Array &&
              dataset.map((service) => (
                <li className="nav-item" key={service.id}>
                  <Link to={`/${service.id}/details`}>{service.name}</Link>
                </li>
              ))}
          </ul>
        </nav>
      )}
    </>
  )
}
