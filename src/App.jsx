// Components
import { Navbar } from '@/utils/componentsLoader';
import { Outlet } from 'react-router-dom';

function App() {

  return (
    <>
      <div className="w-screen container mx-auto">
        <Navbar />
        <div className="main-section px-6 pt-32 pb-16">
          <Outlet />
        </div>
      </div>
    </>
  )
}

export default App
