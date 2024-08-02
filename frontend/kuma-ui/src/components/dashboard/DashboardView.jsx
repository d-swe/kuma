import { PiStorefront, PiTote } from 'react-icons/pi';
import Card from '../card/Card'
import './DashboardView.css'
import { useEffect, useState } from 'react';
import GetRequest from '../webAPI/GetRequest';

function DashboardView() {
    const [warehouseCount, setWarehouseCount] = useState(0);
    const [totalValue, setTotalValue] = useState(0);
    const [productCount, setProductCount] = useState(0);
    const [totalCount, setTotalCount] = useState(0);
    const [orderCount, setOrderCount] = useState(0);
    const [orderTotal, setOrderTotal] = useState(0);

    useEffect(() => {
        GetRequest({ url: 'http://localhost:8080/warehouses/count', onSuccess: setWarehouseCount})
        GetRequest({ url: 'http://localhost:8080/products/total-value', onSuccess: setTotalValue})

        GetRequest({ url: 'http://localhost:8080/products/count', onSuccess: setProductCount})
        GetRequest({ url: 'http://localhost:8080/products/total-count', onSuccess: setTotalCount})

        GetRequest({ url: 'http://localhost:8080/orders/count', onSuccess: setOrderCount})
        GetRequest({ url: 'http://localhost:8080/orders/total-amount', onSuccess: setOrderTotal})
    })

    const formattedTotal = '$' + orderTotal;
    const newTotalValue = '$' + (totalValue / 1000.0) + 'k'
    
    return(
        <>
          <div className="card-container"> 
            <Card title='Warehouse' 
                icon={<PiStorefront/>} 
                count1={warehouseCount}
                description1='WAREHOUSES' 
                count2={newTotalValue}
                description2='TOTAL VALUE' />
            <Card title='Product' 
                icon={<PiTote />} 
                count1={productCount}
                description1='PRODUCTS' 
                count2={totalCount}
                description2='TOTAL STOCK' />
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