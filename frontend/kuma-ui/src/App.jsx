import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { SideBar } from './components/sidebar/SideBar'
import WarehouseView from './components/warehouse/WarehouseView'
import WarehouseCard from './components/warehouse/WarehouseCard'
import './App.css'

function App() {

  return (
    <Router>
      <div className='app'>
      <SideBar/>
      <Routes>
        <Route path="/" element={<WarehouseCard/>} />
        <Route path="/warehouse" element={<WarehouseView />} />
        <Route path="/inventory" element="" />
        <Route path="/product" element="" />
      </Routes>
      </div>
   </Router>
  );
}

export default App
