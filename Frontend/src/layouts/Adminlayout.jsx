import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

const AdminLayout = () => {
  const { user } = useSelector(state => state.auth)

  console.log(user)

  return user.role === 'admin' ? <Outlet /> : <Navigate to='/' />
}
export default AdminLayout