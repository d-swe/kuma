import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { SideBar } from './components/sidebar/SideBar'
import WarehouseView from './components/warehouse/WarehouseView'
import ProductView from './components/product/ProductView';
import Dashboard from './components/dashboard/DashboardView';
import OrderView from './components/order/OrderView';
import InventoryView from './components/inventory/InventoryView';
import './App.css'

function App() {
  return (
    <Router>
      <div className='app'>
      <SideBar/>
      <Routes>
        {/* <Route path="/" element={} /> */}
        <Route path="/" element={<Dashboard />} />
        <Route path="/warehouse" element={<WarehouseView />} />
        <Route path="/product" element={<ProductView />} />
        <Route path="/order" element={<OrderView />} />
        <Route path="/inventory/:warehouseId" element={<InventoryView />} />
      </Routes>
      </div>
   </Router>
  );
}

export default App
