import { Outlet } from 'react-router'
import './App.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { useAppInitialization } from './hooks/useAppInitialization'

function App() {
  // Initialize app data (products and cart)
  useAppInitialization();

  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  )
}

export default App
