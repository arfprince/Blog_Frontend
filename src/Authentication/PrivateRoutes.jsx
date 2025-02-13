

import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
export default function PrivateRoute({ children }) {
  const  isLoggedIn = useSelector((state)=> state.auth.isLoggedIn) 
  if (isLoggedIn === null) {
    return <div>Loading...</div>;
  }

  return isLoggedIn ? children : <Navigate to="/login" replace />;
}
