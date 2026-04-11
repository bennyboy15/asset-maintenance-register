import './App.css'
import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import SuppliersPage from './pages/SuppliersPage'

function App() {

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/suppliers" element={<SuppliersPage />} />
    </Routes>
  )
}

export default App
