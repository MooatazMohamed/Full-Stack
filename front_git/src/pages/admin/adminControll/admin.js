import React, { useEffect, useState } from "react";
import "./admin.css";
import image1 from "../../../assets/images/addBook.jpg";
import image2 from "../../../assets/images/showReaders.png";
import image3 from "../../../assets/images/showRequests.jpg";
import { createSearchParams, Link, useNavigate } from "react-router-dom";
import { getAuthUser,setAuthUser,removeAuthUser } from "../../../helper/Storage";
import Alert from 'react-bootstrap/Alert';
const Admin = () => {
  const [userType,setUserType]=useState({type:false});
  useEffect(()=>{
    if(getAuthUser().role==1){
      setUserType({type:true})
    }
  },[])
  return (
    <>
      {
        userType.type===true && (
          <div className="product-list1">
            <div className="product-card1">
              <div className="card-img1">
                <img src={image1} alt="addBook" />
              </div>
              <div className="card-info1">
                <h4 className="title1">
                  You Can add a book from here Just click "Add Book" Button
                </h4>
                <Link to={"./manageBooks"}>
                  <button className="watch-but1">
                    Manage Books
                  </button>
                </Link>
              </div>
            </div>
            <div className="product-card1">
              <div className="card-img1">
                <img src={image2} alt="addBook" />
              </div>
              <div className="card-info1">
                <h4 className="title1">
                  You Can See the requests from here Just click " Show Readers
                  Requests" Button
                </h4>
                <Link to='./showReadersRequestsHistory'><button className="watch-but1">Show Readers Requests</button></Link>
              </div>
            </div>
            <div className="product-card1">
              <div className="card-img1">
                <img src={image3} alt="addBook" />
              </div>
              <div className="card-info1">
                <h4 className="title1">
                  You Can See the history of Readers from here Just click "Show
                  Readers History" Button
                </h4>
                <Link to='./showSearchHistory'><button className="watch-but1">Show Search History</button></Link>
              </div>
            </div>

            <div className="product-card1">
              <div className="card-img1">
                <img src={image1} alt="addBook" />
              </div>
              <div className="card-info1">
                <h4 className="title1">
                  You Can add a book from here Just click "Add Book" Button
                </h4>
                <Link to={"./manageReader"}>
                  <button className="watch-but1">
                    manage reader
                  </button>
                </Link>
              </div>
            </div>
          </div>
        )
      }
      {
          userType.type===false&&(
          <Alert variant="danger" className="p-2">
            <h2 style={{ textAlign: "center" }}>This path is not Found
              <br />
              {/* {books.err} */}
              <div>
                <button style={{ borderColor: '#842029', borderRadius: '6px', padding: '5px', backgroundColor: '#f8d7da' }} ><a href="/" style={{ textDecoration: 'none', color: '#842029' }}>login</a></button>
              </div>
            </h2>
          </Alert>
        )
      }
    </>
  );
};
export default Admin;