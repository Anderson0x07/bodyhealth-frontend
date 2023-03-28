import React, { useState } from 'react'
import * as Redirect from 'react-router-dom';
import { procesarPeticionPost } from '../util/HandleApi';

function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [token, setToken] = useState(null);

    const handleEmailChange = event => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = event => {
        setPassword(event.target.value);
    };

    const handleSubmit = event => {
        event.preventDefault();

        const login = async () => {
            try {
                const response = await procesarPeticionPost("login", {
                    email: email,
                    password: password
                }, null);
                
                console.log(response);
                const token = response.data.token;
                
                localStorage.setItem('token', token);

                setToken(token);

            } catch (error) {
                console.log(error)
            }
        };

        login();

    };

    /*if (token) {
        return <Redirect.redirect to="/" />;
    }*/

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Nombre de usuario:
                <input type="text" value={email} onChange={handleEmailChange} />
            </label>
            <label>
                Contraseña:
                <input type="password" value={password} onChange={handlePasswordChange} />
            </label>
            <button type="submit">Iniciar sesión</button>
        </form>
    );
}

export default LoginForm