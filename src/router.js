import React, { Children } from "react";
import { createBrowserRouter } from "react-router-dom";
import ProductList from "./pages/product/productList";
import Login from "./pages/login/login";
import About from "./pages/about/about";
import Contact from "./pages/contact/contact";
import NotFound from './shared/notFound'
import App from "./App";
import ProductInfo from "./pages/product/components/productInfo";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <ProductList />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/productInfo/:id",
        element: <ProductInfo />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);
