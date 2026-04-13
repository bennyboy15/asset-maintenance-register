import './App.css'
import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import SuppliersPage from './pages/SuppliersPage'
import AssetsPage from './pages/AssetsPage'

function App() {

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/assets" element={<AssetsPage />} />
      <Route path="/suppliers" element={<SuppliersPage />} />
    </Routes>
  )
}

export default App
