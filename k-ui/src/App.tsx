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

function App() {
	return (
    <>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="flex flex-row bg-backlayer h-lvh pt-4">
        <BrowserRouter>
          <div className="flex w-[200px] h-max">
            <SideBar />
          </div>
          <div className="flex-1 flex items-top border bg-background rounded-2xl p-10 ml-10">
            <Routes>
              <Route path="/warehouse" element={<WarehouseTable />} />
              <Route path="/product" element={<ProductTable />} />
              <Route path="/inventory" element={<InventoryTable />} />
              <Route path="/order" element={<OrderTable />} />
              <Route path="/customer" element={<CustomerTable />} />
              <Route path="/category" element={<CategoryTable />} />
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