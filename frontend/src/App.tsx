import './App.css'
import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import SuppliersPage from './pages/SuppliersPage'
import AssetsPage from './pages/assets/AssetsPage'
import AssetDetailsPage from './pages/assets/AssetDetailsPage'
import CreateAssetPage from './pages/assets/CreateAssetPage'

function App() {
  return (
    <Routes>
      {/* Home Route */}
      <Route path="/" element={<HomePage />} />
      <Route path="/suppliers" element={<SuppliersPage />} />

      {/* Asset Routes */}
      <Route path="/assets">
        <Route index element={<AssetsPage />} />
        <Route path="new" element={<CreateAssetPage />} />
        <Route path=":id" element={<AssetDetailsPage />} />
      </Route>

    </Routes>
  )
}

export default App
