import { useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom'
import { UserContext } from '../../contexts/AuthContext';
import { Button } from 'react-bootstrap';

const Menu = () => {

    const [user, setUser] = useContext(UserContext);

    const logout = () => {
        setUser(undefined);
        sessionStorage.removeItem('USER');
    }

    return (
        <>
            <Navbar bg="dark" data-bs-theme="dark">
                <Container>
                    <Navbar.Brand href="#home">My App</Navbar.Brand><br></br>
                    <Nav className="me-auto">
                        <Link to={'/'} className='nav-link'> Home</Link>
                        <Link to={'/voitures'} className='nav-link'> Voitures</Link>
                        {user && (
                            <Link to={'/addvoiture'} className='nav-link'> AddVoiture</Link>
                        )}
                        {user ?
                            <span style={{ color: 'white' }}>Bonjour <br></br> {user?.firstname} {user?.lastname}<Button className='btn btn-primary' id='logout' onClick={logout}>LogOut</Button></span> :
                            <Link to={'/auth/login'} className="nav-link">Se connecter</Link>
                        }


                    </Nav>
                </Container>
            </Navbar>
        </>
    );
}

export default Menu;