import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Formulary from './components/Formulary'
import Welcome from './components/Welcome'

ReactDOM.createRoot(document.querySelector('#root')).render(
  <React.StrictMode>
    <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Formulary/>}></Route>
          <Route path='/home' element={<Welcome/>}></Route>
        </Routes>
    </BrowserRouter>
    </React.StrictMode>,
)
    