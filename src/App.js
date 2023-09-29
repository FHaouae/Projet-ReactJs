import './App.css';
import { BrowserRouter } from 'react-router-dom';
import Menu from './components/layout/Menu';
import Footer from './components/layout/Footer';
import MainRoutes from './routes/MainRoutes';
import { UserContext } from './contexts/AuthContext';
import { useState } from 'react';

function App() {
  const [user, setUser] = useState(JSON.parse(sessionStorage.getItem('USER')));
  return (
    <div className='App'>
      <UserContext.Provider value={[user, setUser]}>
        <BrowserRouter>
          <Menu></Menu>
          <MainRoutes></MainRoutes>
          <Footer></Footer>
        </BrowserRouter>
      </UserContext.Provider>
    </div>
  );
}

export default App;
