import { PiStorefront, PiTote } from 'react-icons/pi';
import Card from '../card/Card'
import './DashboardView.css'
import { useEffect, useState } from 'react';
import GetRequest from '../webAPI/GetRequest';

function DashboardView() {
    const [warehouseCount, setWarehouseCount] = useState(0);
    const [inventoryCount, setInventoryCount] = useState(0);
    const [productCount, setProductCount] = useState(0);
    const [orderCount, setOrderCount] = useState(0);
    const [orderTotal, setOrderTotal] = useState(0);

    useEffect(() => {
        GetRequest({ url: 'http://localhost:8080/warehouses/count', onSuccess: setWarehouseCount})
        GetRequest({ url: 'http://localhost:8080/inventories/count', onSuccess: setInventoryCount})

        GetRequest({ url: 'http://localhost:8080/products/count', onSuccess: setProductCount})

        GetRequest({ url: 'http://localhost:8080/orders/count', onSuccess: setOrderCount})
        GetRequest({ url: 'http://localhost:8080/orders/total-amount', onSuccess: setOrderTotal})
    })

    const formattedTotal = '$' + orderTotal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    
    return(
        <>
          <div className="card-container"> 
            <Card title='Warehouse' 
                icon={<PiStorefront/>} 
                count1={warehouseCount}
                description1='WAREHOUSES' 
                count2={inventoryCount}
                description2='INVENTORIES' />
            <Card title='Product' 
                icon={<PiTote />} 
                count1={productCount}
                description1='PRODUCTS' 
                count2='4' 
                description2='INVENTORY' />
            <Card title='Order' 
                icon={<PiStorefront/>} 
                count1={orderCount}
                description1='ORDERS' 
                count2={formattedTotal}
                description2='TOTAL AMOUNT' />
          </div>
        </>
        );
    }
export default DashboardView