import './App.css'
import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import SuppliersPage from './pages/SuppliersPage'
import AssetsPage from './pages/assets/AssetsPage'
import AssetDetailsPage from './pages/assets/AssetDetailsPage'
import CreateAssetPage from './pages/assets/CreateAssetPage'
import Navbar from './components/Navbar'
import MyListPage from './pages/MyListPage'
import HistoryPage from './pages/HistoryPage'

function App() {
  return (
    <>
      <Navbar />
      <div className='p-4'>
        <Routes>
          <Route index element={<HomePage />} />

          {/* Asset Routes */}
          <Route path="/assets">
            <Route index element={<AssetsPage />} />
            <Route path="new" element={<CreateAssetPage />} />
            <Route path=":id" element={<AssetDetailsPage />} />
          </Route>

          <Route path="/my-list" element={<MyListPage />} />
          <Route path="/history" element={<HistoryPage />} />
        </Routes>
      </div>
    </>
  )
}

export default App
