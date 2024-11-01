import {Outlet} from 'react-router-dom'
import Login from '../components/Login/Login'

// TODO Change to be context provider.
const PrivateRoutes = ({token, setToken}) => {
return (
    token === true ? <Outlet/> : <Login setToken={setToken} />
  )
}

export default PrivateRoutes