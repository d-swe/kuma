import "./index.css";
import { WarehouseTable } from "./components/table/WarehouseTable";
import { ProductTable } from "./components/table/ProductTable";
import { InventoryTable } from "./components/table/InventoryTable";
import { CustomerTable } from "./components/table/CustomerTable";
import { OrderTable } from "./components/table/OrderTable";
import { CategoryTable } from "./components/table/CategoryTable";
import { SideBar } from "./components/SideBar"
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "./components/ui/theme-provider";
import { ModeToggle } from "./components/ui/mode-toggle";
import { Dashboard } from "./components/Dashboard";

function App() {
	return (
    <>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="flex flex-row bg-backlayer h-lvh pt-4">
        <BrowserRouter>
          <div className="flex w-[200px] h-max">
            <SideBar />
          </div>
          <div className="flex-1 flex items-top border bg-background rounded-tl-2xl p-10 ml-10">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/warehouses" element={<WarehouseTable />} />
              <Route path="/products" element={<ProductTable />} />
              <Route path="/inventories" element={<InventoryTable />} />
              <Route path="/orders" element={<OrderTable />} />
              <Route path="/customers" element={<CustomerTable />} />
              <Route path="/categories" element={<CategoryTable />} />
            </Routes>
          </div>
          <div className="absolute top-0 right-0 pr-4 pt-8">
            <ModeToggle />
          </div>
        </BrowserRouter>
      </div>
    </ThemeProvider>
    </>
	);
}

export default App;