import './index.css'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

const HomePage = () => {
    const navigate = useNavigate()

    useEffect(() => {
        const jwt_token = localStorage.getItem('jwt_token')
        if (jwt_token === null) {
            return navigate('/login')
        }
    })
    
    return (
        <div className="home-page-main-container">
            <h1>This is Home Page!</h1>
        </div>
    )
}

export default HomePage