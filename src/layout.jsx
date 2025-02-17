import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "./redux/authSlice";

export default function Layout() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const checkLoggedIn = async () => {
    try {
      const response = await fetch("http://localhost:3333/blog/is-logged-user", {
        method: "GET",
        headers: {
          "Accept": "application/json",
        },
        credentials: "include"
      });

      const data = await response.json();
      if (response.ok) {
        dispatch(login(data));
      }
    } catch (error) {
      console.log("Not logged in");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkLoggedIn();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Prevent page from rendering before auth check
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow p-4">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
