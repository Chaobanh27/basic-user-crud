import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import SignUp from './pages/Auth/SignUp.jsx'
import Home from './pages/Home/Home.jsx'
import Login from './pages/Auth/Login.jsx'
import UserIndex from './pages/Users/index.jsx'
import './index.css'
import AddUser from './pages/Users/CreateUser.jsx'
import EditUser from './pages/Users/EditUser.jsx'
import UserDetail from './pages/Users/UserDetail.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <App>
        <Routes>
          <Route index path="/" element={<Home/>} />
          <Route path='/auth/signup' element={<SignUp/>} />
          <Route path='/auth/login' element={<Login/>} />
          <Route path='/user/index' element={<UserIndex/>} />
          <Route path='/user/create' element={<AddUser/>} />
          <Route path='/user/edit/:id' element={<EditUser/>} />
          <Route path='/user/detail/:id' element={<UserDetail/>} />
        </Routes>
      </App>
    </Router>
  </React.StrictMode>
)
