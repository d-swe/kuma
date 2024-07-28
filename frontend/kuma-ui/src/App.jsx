import { useState } from 'react'
import { SideBar } from './components/sidebar/SideBar'
import CardContainer from './components/card/CardContainer';
import SearchBar from './components/search/SearchBar';
import './App.css'

function App() {
  const [selectedMenu, setSelectedMenu] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');

  const handleIconClick = (event) => {
    event.preventDefault();
    const target = event.currentTarget.getAttribute('href').substring(1);
    setSelectedMenu(target);
  };

  return (
   <div className="app">
      <SideBar onIconClick={handleIconClick}/>
      <main className="main-content">
        {selectedMenu === 'home' && (
        <>
        <CardContainer />
        </>
        )}
        {/* {selectedMenu === 'services' && <div>Services Content</div>}
        {selectedMenu === 'clients' && <div>Clients Content</div>}
        {selectedMenu === 'contact' && <div>Contact Content</div>} */}
      </main>
    </div>
  )
}

export default App
