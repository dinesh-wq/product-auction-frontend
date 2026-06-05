import './index.css'
import {Link, useNavigate} from 'react-router-dom'
import { useState, useEffect } from 'react'

const SignupPage = () => {
    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [conformPassword, setConformPassword] = useState('')
    const [conformPasswordError, setConformPasswordError] = useState('')
    const [error, setError] = useState('')

    useEffect(() => {
        const token = localStorage.getItem('jwt_token')
        if (token !== null) {
            return navigate('/')
        }
    })

    const validateConformPassword = event => {
        const value = event.target.value
        setConformPassword(value)
        if (password !== value){
            setConformPasswordError('Password and Conform Password must be same')
        }
        else {
            setConformPasswordError('')
        }
    }

    const validateSignup = async (event) => {
        try {
            event.preventDefault()
            if (password !== conformPassword) {
                setConformPasswordError('Password and Conform Password must be same')
            }
            else {
                const response = await fetch('https://product-auction-backend-production.up.railway.app/signup', {
                    method: 'POST', 
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({name, email, password})
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
        }
        catch (e) {
            setError(e.message)
        }
    }

    return (
        <div className="signup-page-background-container">
            <form className="signup-page-main-container" onSubmit={validateSignup}>
                <p className="signup-page-error-message">{error}</p>
                <h1 className="signup-page-main-heading">SIGNUP</h1>
                <label htmlFor="loginName">Name</label>
                <input type="text" id="loginName" placeholder="Name" onChange={event => setName(event.target.value)} required />
                <br />
                <label htmlFor="signupEmail">Email</label>
                <input type="email" id="signupEmail" placeholder="Email" onChange={event => setEmail(event.target.value)} required />
                <br />
                <label htmlFor="signupPassword">Password</label>
                <input type="password" id="signupPassword" placeholder='Password' onChange={event => setPassword(event.target.value)} required />
                <br />
                <label htmlFor="signupConformPassword">Conform Password</label>
                <input type="password" id="signupConformPassword" placeholder='ConformPassword' onChange={validateConformPassword} required />
                <p className="signup-page-error-message">{conformPasswordError}</p>
                <br />
                <button type="submit">Login</button>
                <br />
                <Link to="/login">Already have Account Login</Link>
            </form>
        </div>
    )
}

export default SignupPage