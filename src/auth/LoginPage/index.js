import './index.css'
import {Link, useNavigate} from 'react-router-dom'
import { useState } from 'react'

const LoginPage = () => {
    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const token = localStorage.getItem('jwt_token')
    if (token !== null) {
        return navigate('/')
    }

    const validateLogin = async (event) => {
        try {
            event.preventDefault()
            const response = await fetch('https://product-auction-backend-production.up.railway.app/login', {
                method: 'POST', 
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({email, password})
            })
            const data = await response.json()
            if (data.ok) {
                localStorage.setItem('jwt_token', data.jwt_token)
                navigate('/')
            }
            else {
                setError(data.message)
            }
        }
        catch (e) {
            setError(e.message)
        }
    }

    return (
        <div className="login-page-background-container">
            <form className="login-page-main-container" onSubmit={validateLogin}>
                <p className="login-page-error-message">{error}</p>
                <h1 className="login-page-main-heading">LOGIN</h1>
                <label htmlFor="loginEmail">Email</label>
                <input type="email" id="loginEmail" placeholder="Email" onChange={event => setEmail(event.target.value)} required />
                <br />
                <label htmlFor="loginPassword">Password</label>
                <input type="password" id="loginPassword" placeholder='Password' onChange={event => setPassword(event.target.value)} required />
                <br />
                <button type="submit">Login</button>
                <br />
                <Link to="/signup">Don't have Account signup</Link>
            </form>
        </div>
    )
}

export default LoginPage