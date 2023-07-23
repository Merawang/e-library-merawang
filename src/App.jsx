// Components
import { Navbar, Footer } from '@/utils/componentsLoader';
import { Outlet } from 'react-router-dom';
import Divider from '@mui/material/Divider';

function App() {

  return (
    <>
      <div className="w-screen container mx-auto">
        <Navbar />
        <div className="main-section px-6 pt-32 pb-16">
          <Outlet />
        </div>
        <Divider variant="middle" />
        <Footer />
      </div>
    </>
  )
}

export default App
