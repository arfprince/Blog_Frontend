import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Provider } from 'react-redux'
import store from './redux/store.js'
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en.json";
TimeAgo.addDefaultLocale(en);
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Login from './pages/Login.jsx'
import Register from "./pages/Register.jsx";
import Layout from './layout.jsx'
import Profile from './pages/Profile.jsx'
import Favourites from './pages/Favourites.jsx'
import LastTenLikes from './pages/LastTenLikes.jsx'
import PrivateRoute from "./Authentication/PrivateRoutes.jsx";
import Home from './pages/Home.jsx'
import CreateNewBlog from "./components/userElements/profile/CreateNewBlog.jsx";
import DetailedBlog from "./components/DetailedBlog.jsx";
const routes = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/favorites"
        element={
          <PrivateRoute>
            <Favourites />
          </PrivateRoute>
        }
      />

      <Route
        path="/:id"
        element={
          <PrivateRoute>
            <DetailedBlog />
          </PrivateRoute>
        }
      />

      <Route
        path="/profile"
        element={
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        }
      />
      <Route
        path="/newBlog"
        element={
          <PrivateRoute>
            <CreateNewBlog />
          </PrivateRoute>
        }
      />
      <Route
        path="/last_ten_likes"
        element={
          <PrivateRoute>
            <LastTenLikes />
          </PrivateRoute>
        }
      />
    </Route>
  )
);
//step 10 - Wrap with provider and props the store data for all to app
createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={routes} />
  </Provider>,
)