import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { login} from "./redux/authSlice";

export default function Layout() {
  const dispatch = useDispatch();

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
      } else {
        throw new Error(data.errors[0].message);
      }
    } catch (error) {
      console.log(error.message);
    }
  } 
  useEffect(() => {
    checkLoggedIn();
  }, []);

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
