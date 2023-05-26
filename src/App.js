import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ServiceList } from './components/ServiceList'
import { ServiceDetail } from './components/ServiceDetail'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/:serviceId/details" element={<ServiceDetail />} />
        <Route path="/" element={<ServiceList />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
