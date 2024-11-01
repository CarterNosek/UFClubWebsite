import {Outlet} from 'react-router-dom'
import Login from '../Login/Login'

const PrivateRoutes = ({token, setToken}) => {
return (
    token === true ? <Outlet/> : <Login setToken={setToken} />
  )
}

export default PrivateRoutes