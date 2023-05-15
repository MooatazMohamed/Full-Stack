import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";
import axios from "axios";
import pdfBook from "../../../assets/images/pdf3.png";
import {getAuthUser} from "../../../helper/Storage";
const ManageBooks = () => {
  const auth = getAuthUser();
  const [books, setBooks] = useState({
    loading: true,
    results: [],
    err: null,
    reload: 0,
  });
  
  const deleteBook = (name) =>{
    axios
    .delete("http://localhost:4000/library/"+name,{
      headers:{
        token : auth.token,
      }
    })
    .then((res) => {
      setBooks({...books,reload : books.reload+1})
    })
    .catch((err) => {
    });

  }
  
  useEffect(() => {
    setBooks({ ...books, loading: true });
    axios
      .get("http://localhost:4000/library",{
        headers:{
            token:getAuthUser().token
        }
      })
      .then((res) => {
        setBooks({ ...books, results: res.data, loading: false, err: null });
      })
      .catch((err) => {
        setBooks({
          ...books,
          loading: false,
          err: "There is somthing Went Wrong",
        });
      });
  }, [books.reload]);

  return (
    <div className="manage-books p-5">
      <div className="header d-flex justify-content-between mb-3">
        <h3 className="text-center">Manage Books</h3>
        <Link to="addBook" className="btn btn-success">
          <h6>ADD NEW BOOK </h6>
        </Link>
      </div>
      <br></br>
      <Table striped bordered hover style={{backgroundColor:"#faf4ef"}}>
        <thead>
          <tr>
            <th>Name</th>
            <th>image</th>
            <th>book</th>
            <th>Auther</th>
            <th>Description</th>
            <th>Field</th>
            <th>PublicationDate</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {books.results.map((book) => (
            <tr key={book.name}>
              <td>{book.name}</td>
              <td><img src={book.imageUrl} style={{width:"100px"}} /></td>
              <td>
               <a href={book.pdfFileUrl} target="_blank">
                <img
                  src={pdfBook}
                  alt="Book Image"
                  style={{ width: "50px", height: "50px", borderRadius: "5px" }}
                />
                </a>
              </td>
              <td>{book.auther}</td>
              <td>{book.description}</td>
              <td>{book.field}</td>
              <td>{book.publicationDate}</td>
              <td>
                <Link className="btn btn-sm btn-danger px-3" style={{width:"80px"}}>SHOW</Link>
                <Link to={"./updateBook/"+book.name}className="btn btn-sm btn-info px-3" style={{width:"80px"}}
                    
                >UPDATE</Link>
                <Link className="btn btn-sm btn-dark px-3" style={{width:"80px"}} onClick={(e) => deleteBook(book.name)}>DELETE</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};
export default ManageBooks;
