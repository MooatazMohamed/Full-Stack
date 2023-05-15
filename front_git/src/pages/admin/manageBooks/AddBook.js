import React, { useRef, useState } from "react";
import "./AddBook.css";
import axios from "axios";
import { getAuthUser ,removeAuthUser,setAuthUser} from "../../../helper/Storage";
import { Alert } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";
import { useNavigate } from "react-router-dom";
import Form from 'react-bootstrap/Form';
const AddBook = () => {
  const auth = getAuthUser();
  
  const pdf=useRef(null);
  const image=useRef(null);
  const [book, setBook] = useState({
    name:"",
    description:"",
    auther:"",
    field:"",
    publicationDate:"",
    //pdfImages:"",
  });
  
  const navigate = useNavigate();
  
  

  const Add = (e) => {
    e.preventDefault();
    setBook({ ...book, loading: true ,err : []});
    
    const formData = new FormData();
    console.log(pdf.current.files[0]);
    console.log(image.current.files[0]);

    
    formData.append("name", book.name);
    formData.append("description", book.description);
    formData.append("auther", book.auther);
    formData.append("field", book.field);
    formData.append("pdfImage",pdf.current.files[0]);
    formData.append("pdfImage",image.current.files[0]);
    formData.append("publicationDate",book.publicationDate);
    
    
    axios
      .post("http://localhost:4000/library", formData, {
        headers: {
          token: auth.token,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        setBook({
          name: "",
          description: "",
          auther: "",
          field: "",
          publicationDate: "",
        });
        pdf.current.value = null;
        image.current.value=null;
        navigate("/admin/manageBooks")
        
        console.log(res);
      })
      .catch((errors) => {
        setBook({
          ...book,
          loading: false,
          successMessage: null,
          err: errors.response.data.errors,
        });
        window.alert(errors.response.data.msg);
      });
  };
  return (
    <div className="containerContact4">
      <div className="right-side4">
        <div className="topic-text4">
          <h1>Add Book</h1>
        </div>
        <br></br>
        {/* {book.err.map((error, index) => (
            <Alert key={index} variant="danger" className="px-2 py-2 w-100 p-3">
              {error.msg}
            </Alert>
          ))} */}
        {/* {book.successMessage && (
          <Alert variant="success" className="px-2 py-2 w-100 p-3">
            {book.successMessage}
          </Alert>
        )} */}
        <form action="#" onSubmit={Add}>
          <div className="input-box4">
            <input
              value={book.auther}
              type="text"
              placeholder="Enter Auther Name"
              required
              onChange={(event) =>
                setBook({ ...book, auther: event.target.value })
              }
            />
          </div>
          <div className="input-box4">
            <input
              type="text"
              placeholder="Enter Book Name"
              required
              value={book.name}
              onChange={(event) =>
                setBook({ ...book, name: event.target.value })
              }
            />
          </div>
          
          <div className="input-box4">
            <input
              type="date"
              placeholder="Enter Book Publication Date"
              required
              value={book.publicationDate}
              onChange={(event) =>
                setBook({ ...book, publicationDate: event.target.value })
              }
            />
          </div>

          <div className="input-box4">
            <input
              type="text"
              placeholder="Enter Book Field"
              required
              value={book.field}
              onChange={(event) =>
                setBook({ ...book, field: event.target.value })
              }
            />
          </div>
          <br></br>
          <textarea
            style={{ height:"80px" }}
            id="w3review"
            name="w3review"
            rows="4"
            cols="50"
            placeholder="Enter Book Description"
            required
            value={book.description}
            onChange={(event) =>
              setBook({ ...book, description: event.target.value })
            }
          />
          <br></br>
          <br></br>
          <br></br>
          
          <br />
          
          <Form.Group controlId="formFile" className="mb-3" style={{ width: '600px', marginLeft:"auto",marginRight:"auto" }}>
            {/* <p style={{marginLeft:"auto",marginRight:"auto"}} inline>Enter PDF</p> */}
            <Form.Label style={{color:"brown"}}>enter Book PDF</Form.Label>
            <Form.Control type="file" ref={pdf} required />
          </Form.Group>

          <Form.Group controlId="formFile" className="mb-3" style={{ width: '600px', marginLeft:"auto",marginRight:"auto"}}>
          <Form.Label style={{color:"brown"}}>enter Book Image</Form.Label>
            <Form.Control type="file" ref={image} required />
          </Form.Group>
          <div className="button4">
            <button className="updateBook">Add</button>
          </div>

          {/* {book.loading == true && (
            <div style={{display : "flex"}}>
            <Spinner animation="border" size="sm" />
            <Spinner animation="grow" size="sm" />
            <Spinner animation="border" />
            <Spinner animation="grow" />
          </div>
          )} */}
        </form>
      </div>
    </div>
  );
};
export default AddBook;
