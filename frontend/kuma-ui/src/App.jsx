import { SideBar } from './components/sidebar/SideBar'
import CardContainer from './components/warehouse/WarehouseMain';
import './App.css'

function App() {

  return (
   <div className="app">
      <SideBar/> 
      <main className="main-content">
        <CardContainer />
        {/* {selectedMenu === 'services' && <div>Services Content</div>}
        {selectedMenu === 'clients' && <div>Clients Content</div>}
        {selectedMenu === 'contact' && <div>Contact Content</div>} */}
      </main>
    </div>
  )
}

export default App
