import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  Navigate
} from "react-router-dom"
import { useLocation } from "react-router-dom";
import Home from "./pages/home"
import Login from "./pages/login"
import Register from "./pages/register"
import Profile from "./pages/profile"
import Logout from "./pages/logout"
import { StateProvider } from './context/StateContext';
import reducer, { initialState } from "./context/StateReducers";
import Navbar from './Common/Navbar';
import VerifyAcount from './pages/verifyAccount';
import CreateGig from './pages/seller/createService';
import Service from './pages/services';
import ServiceDetail from './pages/services/serviceDetail';
import MyService from './pages/seller/myServices';
import Order from './pages/order';
import Search from './pages/search';
import { Footer } from './Common/Footer';
import Chat from './pages/chat';


function AppRoutes() {
  const Layout = () => {
    const rout = useLocation()
    return (
      <StateProvider initialState={initialState} reducer={reducer}>
        <div className={`relative flex flex-col h-full 
        ${rout.pathname === "/chat" ? "bg-white" : "bg-gray-100"}
         `
         }>
          <Navbar />
          <div
            className={`${rout.pathname !== "/" ? "mt-32" : ""
              } mb-auto w-full mx-auto`}
          >
            <Outlet key={5454} />
            <hr></hr>
          </div>
          {/* <Footer key={6563} /> */}
          <Footer />
        </div>
      </StateProvider>
    )
  }
  const PrivateRoute = ({ element }) => {
    const isAuthenticated = !!localStorage.getItem('token');
    return isAuthenticated ? element : <Navigate to="/login" />;
  };
  const PublicRoute = ({ element }) => {
    const isAuthenticated = !!localStorage.getItem('token');
    return isAuthenticated ? <Navigate to="/" /> : element;
  };
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout></Layout>,
      children: [
        {
          path: "/",
          element: <Home />
        },
        {
          path: "/services",
          element: <Service />
        },
        {
          path: "/login",
          element: <PublicRoute element={<Login />} />
        },
        {
          path: "/register",
          element: <PublicRoute element={<Register />} />
        },
        {
          path: "/verify-account",
          element: <VerifyAcount />
        },
        {
          path: "/profile",
          element: <PrivateRoute element={<Profile />} />
        },
        {
          path: "/seller/services/create",
          element: <PrivateRoute element={<CreateGig mode="add" />} />
        },
        {
          path: "/seller/services/edit/:id",
          element: <PrivateRoute element={<CreateGig mode="edit" />} />
        },
        {
          path: "/service/:id",
          element: <ServiceDetail />
        },
        {
          path: "/myservices",
          element: <PrivateRoute element={<MyService />} />
        },
        {
          path: "/orders",
          element: <PrivateRoute element={<Order />} />
        },
        {
          path: "/logout",
          element: <PrivateRoute element={<Logout />} />
        },
        {
          path: "/search",
          element: <Search />
        },
        {
          path: "/chat",
          element: <PrivateRoute element={<Chat />} />
        }
      ]
    },
  ]);
  return (
    [
      <RouterProvider key={1} router={router} />
    ]
  )
}

export default AppRoutes;
