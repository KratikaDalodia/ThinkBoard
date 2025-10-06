import React from 'react'
import { Route, Routes } from 'react-router'
import HomePage from './pages/HomePage'
import CreatePage from './pages/CreatePage'
import DetailPage from './pages/DetailPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import ProtectedRoute from './components/ProtectedRoutes'

const App = () => {
  return (
    <div className='relative h-screen' data-theme ="forest">
      <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_60%,#ff86c7_180%)]" />
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/create' element={<ProtectedRoute><CreatePage/></ProtectedRoute> }/>
        <Route path='/note/:id' element={<ProtectedRoute><DetailPage/></ProtectedRoute>}/>
      </Routes>
    </div>
  )
}

export default App
