import { PiStorefront, PiTote } from 'react-icons/pi';
import Card from '../card/Card'
import './DashboardView.css'

function DashboardView() {

    return(
        <>
          <div className="card-container"> 
            <Card title='Warehouse' 
                icon={<PiStorefront/>} 
                count1='5' 
                description1='WAREHOUSES' 
                count2='4' 
                description2='INVENTORY' />
            <Card title='Product' 
                icon={<PiTote />} 
                count1='5' 
                description1='PRODUCTS' 
                count2='4' 
                description2='INVENTORY' />
            <Card title='Order' 
                icon={<PiStorefront/>} 
                count1='5' 
                description1='ORDERS' 
                count2='4' 
                description2='TOTAL' />
          </div>
        </>
        );
    }
export default DashboardView