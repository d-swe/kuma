import { WarehousePieChart } from "./chart/WarehousePieChart"
import { OrderLineChart } from "./chart/OrderLineChart";

export function Dashboard() {
    return (
        <div>
            <div className="flex flex-row h-[400px]">
                <WarehousePieChart />
            </div>
            <div className="pt-6">
                <OrderLineChart />
            </div>
        </div>
    );
}