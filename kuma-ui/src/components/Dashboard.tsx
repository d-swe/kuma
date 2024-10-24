import { WarehousePieChart } from "./chart/WarehousePieChart"

export function Dashboard() {
    return (
        <div className="flex flex-row h-[400px]">
            <WarehousePieChart />
        </div>
    );
}