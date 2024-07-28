import React from 'react'
import { PiStorefront, PiMagnifyingGlass, PiGear} from "react-icons/pi";
import './SideBar.css'

export const SideBar = ({onIconClick}) => {
  return (
    <>
    <div className="sidebar">
      <div className='menu-box'>
        <a href="#"><PiStorefront className="icon" onClick={onIconClick}/>
        <div className='menu-label'>
          Warehouse
        </div>
        </a>
      </div>

      <div className='menu-box'>
        <a href="#"><PiMagnifyingGlass className="icon" onClick={onIconClick}/>
        <div className='menu-label'>
          Search
        </div>
        </a>
      </div>

      <div className='menu-box'>
        <a href="#"><PiGear className="icon" onClick={onIconClick}/>
        <div className='menu-label'>
          Settings
        </div>
        </a>
      </div>
    </div>
    </>
  )
}
