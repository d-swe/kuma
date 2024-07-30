import { SideBar } from './components/sidebar/SideBar'
import './App.css'
import Card from './components/card/Card'
import TableView from './components/table/TableView'
import WarehouseView from './components/warehouse/WarehouseView'

function App() {

  return (
    <WarehouseView />
  //  <div className="app">
  //     <SideBar/> 
  //     <main className="main-content">
  //       <CardContainer />
  //       {/* {selectedMenu === 'services' && <div>Services Content</div>}
  //       {selectedMenu === 'clients' && <div>Clients Content</div>}
  //       {selectedMenu === 'contact' && <div>Contact Content</div>} */}
  //     </main>
  //   </div>
  )
}

export default App
