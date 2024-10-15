import { useState } from 'react'
import './index.css'
import { WarehouseTable } from "./components/table/WarehouseTable"
import { ProductTable } from './components/table/ProductTable'
import { InventoryTable } from './components/table/InventoryTable'
import { CustomerTable } from './components/table/CustomerTable'
import { OrderTable } from './components/table/OrderTable'

function App() {

  return (
    <main>
      <WarehouseTable/>
      <ProductTable />
      <InventoryTable />
      <CustomerTable />
      <OrderTable />
    </main>
  )
}

export default App
