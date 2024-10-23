"use client"

import { TrendingUp } from "lucide-react"
import { Label, Pie, PieChart } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { useEffect, useState } from "react"
import { Inventory } from "../data/items"
import { API_URL } from "@/config"

export const description = "A donut chart with text"

// type ChartData = [
//   product: string,
//   stock: number,
//   fill: string
// ];

type ProductStock = {
  name: string,
  stock: number
  fill: string
}

type WarehouseProducts = {
  warehouseName: string,
  products: ProductStock[],
}

type WarehouseProductsMap = {
  [warehouseId: number]: WarehouseProducts
}

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  chrome: {
    label: "Chrome",
    color: "hsl(var(--chart-1))",
  },
  safari: {
    label: "Safari",
    color: "hsl(var(--chart-2))",
  },
  firefox: {
    label: "Firefox",
    color: "hsl(var(--chart-3))",
  },
  edge: {
    label: "Edge",
    color: "hsl(var(--chart-4))",
  },
  other: {
    label: "Other",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig

export function WarehousePieChart() {
  // const [inventory, setInventories] = useState<Inventory[]>([]);
  const [chartData, setChartData] = useState<WarehouseProductsMap>({});
  const generateRandomColor = () => {
    // Generate a random color in hex format
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  };
  
  useEffect(() => {
    const url = `${API_URL}/inventories`;
    const fetchInventories = async () => {
      try {
        const response = await fetch(url);
        if(!response.ok) {
          throw new Error(`Error Status: ${response.status}`);
        }

        const data: Inventory[] = await response.json();
        // setInventories(data);
        const warehouseMap: WarehouseProductsMap = {};

        data.forEach((item) => {
          const { warehouse, product, stock} = item;

          if(!warehouseMap[warehouse.id]) {
            warehouseMap[warehouse.id] = {
              warehouseName: warehouse.name,
              products:[],
            };
          }

          warehouseMap[warehouse.id].products.push({
            name: product.name,
            stock: stock,
            fill: generateRandomColor()
          });
        });

        setChartData(warehouseMap);
        // const mappedInventories = data.map(inventory => ({
        //   product: inventory.product.name,
        //   stock: inventory.stock,
        //   fill: generateRandomColor()
        // }));
        // setChartData(mappedInventories);
      } catch (err) {
        console.error(
          err instanceof Error ? err.message : "Unknown error."
        );
      }
    };
    fetchInventories();
  }, []);

  return (
    <div className="flex flex-row space-x-6">
      {Object.entries(chartData).map(([warehouseId, warehouseData]) => {
        const totalStock = warehouseData.products.reduce(
          (acc, product) => acc + product.stock,
          0
        );

        return (
          <Card className="flex flex-col" key={warehouseId}>
            <CardHeader className="items-center pb-0">
              <CardTitle>{warehouseData.warehouseName}</CardTitle>
              <CardDescription>October - November 2024</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 pb-0">
              <ChartContainer
                config={chartConfig}
                className="mx-auto aspect-square max-h-[250px]"
              >
                <PieChart>
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent hideLabel />}
                  />
                  <Pie
                    data={warehouseData.products} 
                    dataKey="stock"
                    nameKey="name"
                    innerRadius={60}
                    strokeWidth={5}
                    fill={generateRandomColor()}
                  >
                    <Label
                      content={({ viewBox }) => {
                        if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                          return (
                            <text
                              x={viewBox.cx}
                              y={viewBox.cy}
                              textAnchor="middle"
                              dominantBaseline="middle"
                            >
                              <tspan
                                x={viewBox.cx}
                                y={viewBox.cy}
                                className="fill-foreground text-3xl font-bold"
                              >
                                {totalStock.toLocaleString()}
                              </tspan>
                              <tspan
                                x={viewBox.cx}
                                y={(viewBox.cy || 0) + 24}
                                className="fill-muted-foreground"
                              >
                                Products
                              </tspan>
                            </text>
                          );
                        }
                        return null;
                      }}
                    />
                  </Pie>
                </PieChart>
              </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col gap-2 text-sm">
              <div className="flex items-center gap-2 font-medium leading-none">
                Trending up by 5.2% this month{" "}
                <TrendingUp className="h-4 w-4" />
              </div>
              <div className="leading-none text-muted-foreground">
                Showing total stock for the last 6 months
              </div>
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
}