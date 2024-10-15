import "./index.css";
import { WarehouseTable } from "./components/table/WarehouseTable";
import { ProductTable } from "./components/table/ProductTable";
import { InventoryTable } from "./components/table/InventoryTable";
import { CustomerTable } from "./components/table/CustomerTable";
import { OrderTable } from "./components/table/OrderTable";
import { CategoryTable } from "./components/table/CategoryTable";
import { SideBar } from "./components/SideBar"
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
	return (
    <div className="flex flex-row">
      <BrowserRouter>
        <div className="flex w-[200px] h-max">
          <SideBar />
        </div>
        <div className="flex-1 flex items-top">
          <Routes>
            <Route path="/warehouse" element={<WarehouseTable />} />
            <Route path="/product" element={<ProductTable />} />
            <Route path="/inventory" element={<InventoryTable />} />
            <Route path="/order" element={<OrderTable />} />
            <Route path="/customer" element={<CustomerTable />} />
            <Route path="/category" element={<CategoryTable />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
	);
}

export default App;