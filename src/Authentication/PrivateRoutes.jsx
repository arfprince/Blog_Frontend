import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";

export default function PrivateRoute({ children }) {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    if (isLoggedIn !== undefined) {
      setAuthChecked(true);
    }
  }, [isLoggedIn]);

  if (!authChecked) {
    return <div>Checking authentication...</div>; // Prevent redirection until auth is verified
  }

  return isLoggedIn ? children : <Navigate to="/login" replace />;
}
