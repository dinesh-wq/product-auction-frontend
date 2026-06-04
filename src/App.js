import './App.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import LoginPage from './auth/LoginPage'
import SignupPage from './auth/SignupPage'
import HomePage from './pages/HomePage'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<LoginPage />} />
        <Route path='/signup' element={<SignupPage />} />
        <Route path='/home' element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

