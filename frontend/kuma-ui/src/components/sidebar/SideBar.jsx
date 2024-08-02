import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PiStorefront, PiSquaresFour, PiListNumbers, PiTote } from "react-icons/pi";
import './SideBar.css';

export const SideBar = () => {
  const [activeTab, setActiveTab] = useState('/');
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    setActiveTab(path);
    navigate(path);
  };

  return (
    <>
      <div className="sidebar">
        <div className="head-box">
          <span className='head-title'>KUMA INVENTORY MANAGER</span>
        </div>
        <div className={`menu-tab ${activeTab === '/' ? 'active' : ''}`} onClick={() => handleNavigation('/')}>
          <div className='menu-icon'><PiSquaresFour className='icon' /></div>
          <div className='menu-title'>
            <span>Dashboard</span>
          </div>
        </div>
        <div className={`menu-tab ${activeTab === '/warehouse' ? 'active' : ''}`} onClick={() => handleNavigation('/warehouse')}>
          <div className='menu-icon'><PiStorefront className='icon' /></div>
          <div className='menu-title'>
            <span>Warehouse</span>
          </div>
        </div>
        <div className={`menu-tab ${activeTab === '/product' ? 'active' : ''}`} onClick={() => handleNavigation('/product')}>
          <div className='menu-icon'><PiTote className='icon' /></div>
          <div className='menu-title'>
            <span>Product</span>
          </div>
        </div>
        <div className={`menu-tab ${activeTab === '/order' ? 'active' : ''}`} onClick={() => handleNavigation('/order')}>
          <div className='menu-icon'><PiListNumbers className='icon' /></div>
          <div className='menu-title'>
            <span>Order</span>
          </div>
        </div>
      </div>
    </>
  );
}