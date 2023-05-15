import React from "react";
import { createBrowserRouter}from "react-router-dom";
import ProductList from "./pages/product/productList";
import Login from "./pages/login/login";
import About from "./pages/about/about";
import Contact from "./pages/contact/contact";
import NotFound from './shared/notFound'
import App from "./App";
import Admin from "./pages/admin/adminControll/admin";
import Reader from "./pages/reader/reader";
import Account from "./pages/account/Account";
import ProductChapterList from "./pages/product/productChaptersList";
//import AdminView from "./pages/admin/showAvailableBooks/adminView";
import UpdateBook from "./pages/admin/manageBooks/updateBook";
import AddBook from "./pages/admin/manageBooks/AddBook";
import ShowRequests from "./pages/admin/showRequests/showRequests";
import SearchHistory from "./shared/searchHistory";
import Registration from "./pages/registration/registration";
import ReaderManage from "./pages/admin/manageReader/ManageReader";
import AddReader from "./pages/admin/manageReader/AddReader";
import UpdateReader from "./pages/admin/manageReader/UpdateReader";
import ManageBooks from "./pages/admin/manageBooks/ManageBooks";
import ManageChapter from "./pages/admin/manageChapter/ManageChapter"
import AddChapter from "./pages/admin/manageChapter/AddChapter"
import UpdateChapter from "./pages/admin/manageChapter/UpdateChapter"
import GetChapter from "./pages/admin/manageChapter/ManageChapter";
export const router = createBrowserRouter([
  {
    path: "/reg",
    element: <Registration />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path:"/",
    element:<Login />
  },
  {
    path: "/",
    element: <App />,
    children: [
      {
        path:"/admin",element:<Admin />
      },
      {
        path:"/admin/manageBooks",element:<ManageBooks />
      },
			{
				path:"/admin/manageBooks/updateBook/:name",element:<UpdateBook />
			},
			{
				path:"/admin/manageBooks/addBook",element:<AddBook />
			},
      {
        path:"/admin/manageBooks/showBook/:bookName",element:<ManageChapter />
      },

      {
				path:"/admin/manageReader",element:<ReaderManage />
			},
			{
				path:"/admin/manageReader/updateReader/:email",element:<UpdateReader />
			},
			{
				path:"/admin/manageReader/addReader",element:<AddReader />
			},

      {
				path:"/admin/showReadersRequestsHistory",element:<ShowRequests />
			},
      {
        path:"/admin/showSearchHistory",element:<SearchHistory />
      },
      {
        path:"/reader",element:<Reader />
			},
      {
        path:"/reader/showSearchHistory",element:<SearchHistory />
      },
			{
        path:"/reader/showHistory",element:<Reader />
			},
      {
        path: "/home",
        element: <Reader />,
      },
      
      {
        path:"getChapter/:bookName",
        element:<ManageChapter />
      },
      {
        path:"getChapter/:bookName/AddChapter/:bookName",
        element:<AddChapter />
      },
      {
        path:"getChapter/:bookName/UpdateChapter/:title",
        element:<UpdateChapter />
      }
      
      ,{
        path:"account",
        element:<Account />
      }
      ,{
        path:"about",
        element:<About />
      }
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);