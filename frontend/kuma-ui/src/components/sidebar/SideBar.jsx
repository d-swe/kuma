import React from 'react'
import { useNavigate } from 'react-router-dom';
import { PiStorefront, PiSquaresFour, PiListNumbers, PiTote} from "react-icons/pi";
import './SideBar.css'

export const SideBar = () => {

  const navigate = useNavigate();
  return (
    <>
    <div className="sidebar">
      <div className="head-box">
        <span className='head-title'>KUMA INVENTORY MANAGER</span>
      </div>
        <div className='menu-tab' onClick={() => navigate('/')}>
          <div className='menu-icon'><PiSquaresFour className='icon'/></div>
          <div className='menu-title'>
            <span>Dashboard</span>
          </div>
        </div>
        <div className='menu-tab' onClick={() => navigate('/warehouse')}>
          <div className='menu-icon'><PiStorefront className='icon'/></div>
          <div className='menu-title'>
            <span>Warehouse</span>
          </div>
        </div>
        <div className='menu-tab' onClick={() => navigate('/')}>
          <div className='menu-icon'><PiListNumbers className='icon'/></div>
          <div className='menu-title'>
            <span>Inventory</span>
          </div>
        </div>
        <div className='menu-tab' onClick={() => navigate('/')}>
          <div className='menu-icon'><PiTote className='icon'/></div>
          <div className='menu-title'>
            <span>Product</span>
          </div>
        </div>
      <div className="head-box">
        <span className='account-title'>ACCOUNT</span>
      </div>
    </div>
    </>
  )
}
