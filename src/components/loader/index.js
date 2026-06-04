import {Rings} from 'react-loader-spinner'
import './index.css'

const loader = () => {
    return (
        <div className="loader-page-main-container">
            <Rings color="#000000" height={70} width={70} />
        </div>
    )
}

export default loader