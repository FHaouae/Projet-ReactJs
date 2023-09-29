import React, { useContext, useState } from 'react';
import { UserContext } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router';


const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userLog, setUserLog] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const [user, setUser] = useContext(UserContext);
    const navigate = useNavigate()


    const handleChangeEmail = (e) => {
        setEmail(e.target.value);
    };

    const handleChangePassword = (e) => {
        setPassword(e.target.value);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        const isEmailValid = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(email);
        const isPasswordValid = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/.test(password);

        if (isEmailValid) {
            let u = { lastname: 'Farhat', firstname: 'Hawae', mail: userLog.email };
            setUser(u);
            sessionStorage.setItem('USER', JSON.stringify(u));
            navigate('/')
        } else {
            setError('Adresse e-mail ou mot de passe invalide');
        }
    }


    return (
        <div className="container">
            <h1 className="mt-5">Connexion</h1>
            <form onSubmit={handleSubmit} className="mt-4">
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Adresse e-mail :</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={handleChangeEmail}
                        className="form-control"
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Mot de passe :</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        onChange={handleChangePassword}
                        className="form-control"
                        required
                    />
                </div>
                {error && <div className="alert alert-danger">{error}</div>}
                <button type="submit" className="btn btn-primary">Se connecter</button>
            </form>
        </div>
    );
};
export default Login;

