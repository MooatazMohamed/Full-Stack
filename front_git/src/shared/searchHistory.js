import React from "react";
import {useSearchParams } from "react-router-dom";
import Admin from "../pages/admin/adminControll/admin";
import Login from "../pages/login/login";
import Reader from "../pages/reader/reader";
import axios from "axios";
import Table from 'react-bootstrap/Table';
import { Link } from "react-router-dom";
import { getAuthUser } from "../helper/Storage";
import { useState,useEffect } from "react";
import Alert from 'react-bootstrap/Alert';
const SearchHistory = () => {
  
  const [users,setUsers] = useState({
    loading: true,
    results : [],
    err:null,
    reload:0,
  });

  useEffect(() =>{
    setUsers({...users , loading:true})
    axios.get("http://localhost:4000/searchHistory/"+getAuthUser().email+"/"+getAuthUser().role)
    .then((resp) =>{
      setUsers({...users , results:resp.data , loading:false , err:null})
      if(getAuthUser()==-1)setUsers({...users , loading:false ,  err:"you are not authenticated to this route"})
    })
    .catch((err) =>{
      setUsers({...users , loading:false ,  err:"you are not authenticated to this route"})

    })
  }, [users.reload] );
  return(
    <>
      {
        users.loading===false && users.err==null &&(
          <Table striped bordered hover variant="dark">
            <thead>
              <tr>
                <th>date</th>
                <th>userName</th>
                <th>search</th>
              </tr>
            </thead>
            <tbody>

              {
                users.results.map((user) => (
                  <tr >
                    <td>{user.date}</td>
                    <td>{user.userEmail}</td>
                    <td>{user.bookName}</td>
                  </tr>
                ))
              }
            </tbody>
          </Table>
        )
      }
      {
        users.loading === false && users.err != null && (
          <Alert variant="danger" className="p-2">
            <h2 style={{ textAlign: "center" }}>This path is not Found
              <br />
              {users.err}
              <div>
                <button style={{ borderColor: '#842029', borderRadius: '6px', padding: '5px' ,backgroundColor:'#f8d7da'}} ><a href="/" style={{ textDecoration: 'none', color: '#842029' }}>login</a></button>
              </div>
            </h2>
          </Alert>

        )}    
    </>
)    
};
export default SearchHistory;