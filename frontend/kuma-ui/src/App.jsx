import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { SideBar } from './components/sidebar/SideBar'
import WarehouseView from './components/warehouse/WarehouseView'
import ProductView from './components/product/ProductView';
import Dashboard from './components/dashboard/DashboardView';
import './App.css'

function App() {

  return (
    <Router>
      <div className='app'>
      <SideBar/>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/warehouse" element={<WarehouseView />} />
        <Route path="/inventory" element="" />
        <Route path="/product" element={<ProductView />} />
      </Routes>
      </div>
   </Router>
  );
}

export default App
