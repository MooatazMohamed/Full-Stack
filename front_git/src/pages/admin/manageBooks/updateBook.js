import React,{useEffect, useRef,useState} from "react";
import { useNavigate,Link, useParams, useSearchParams } from "react-router-dom";
import "./AddBook.css";
import Form from 'react-bootstrap/Form';
import axios from "axios";
import { getAuthUser } from "../../../helper/Storage";
const UpdateBook = (props) => {
  
  const pdf=useRef(null);
  const image=useRef(null);
  const navigate=useNavigate();
  const [book, setBook] = useState({
    name:"",
    description:"",
    auther:"",
    field:"",
    publicationDate:"",
    //pdfImages:"",
  });
  let {name}=useParams();
  
  const updateBook=(e)=>{
    e.preventDefault()

    const formData = new FormData();
    console.log(book);
    formData.append("name", book.name);
    formData.append("description", book.description);
    formData.append("auther", book.auther);
    formData.append("field", book.field);
    formData.append("publicationDate",book.publicationDate);
    
    if(pdf.current.files[0]){
      formData.append("pdfImage",pdf.current.files[0]);
    }
    if(image.current.files[0]){
      formData.append("pdfImage",image.current.files[0]);
    }
    
    axios.put("http://localhost:4000/library/"+name,formData,{
      headers:{
        token:getAuthUser().token,
        "Content-Type": "multipart/form-data",
      },
    })
    .then((resp)=>{
      console.log(resp);
      navigate("/admin/manageBooks");
    })
    .catch((err)=>{
      console.log(err);
      window.alert("book already exists");
    })
  }
  return (
    <div className="containerContact4">
      <div className="right-side4">
        
        <div className="topic-text4">
          <h1>Update Book</h1>
        </div>

        <form action="#">
          <div className="input-box4">
            <input
              value={book.auther}
              type="text"
              placeholder="Enter book auther"
              onChange={(event) =>
                setBook({ ...book, auther: event.target.value })
              }
            />
          </div>

          <div className="input-box4">
            <input
              type="text"
              placeholder="Enter Book Name"
              value={book.name}
              onChange={(event) =>
                setBook({ ...book, name: event.target.value })
              }
              required
            />
          </div>

          <div className="input-box4">
            <input
              type="date"
              placeholder="Enter Book description"
              value={book.publicationDate}
              onChange={(event) =>
                setBook({ ...book, publicationDate: event.target.value })
              }
              required
            />
          </div>

          <div className="input-box4">
            <input
              type="text"
              placeholder="Enter Book Field"
              value={book.field}
              onChange={(event) =>
                setBook({ ...book, field: event.target.value })
              }
              required
            />
          </div>

          <textarea
            id="w3review"
            name="w3review"
            rows="4"
            cols="50"
            value={book.description}
            placeholder="Enter Book Publication Date"
            onChange={(event)=>setBook({...book,description:event.target.value})}
          />
          <br></br>
          <br></br>
          <Form.Group controlId="formFile" className="mb-3" style={{ width: '600px', marginLeft:"auto",marginRight:"auto" }}>
            {/* <p style={{marginLeft:"auto",marginRight:"auto"}} inline>Enter PDF</p> */}
            <Form.Label style={{color:"brown"}}>enter Book PDF</Form.Label>
            <Form.Control type="file" ref={pdf}  />
          </Form.Group>

          <Form.Group controlId="formFile" className="mb-3" style={{ width: '600px', marginLeft:"auto",marginRight:"auto"}}>
          <Form.Label style={{color:"brown"}}>enter Book Image</Form.Label>
            <Form.Control type="file" ref={image} />
          </Form.Group>
          <div className="button4">
            <button className="updateBook" onClick={(e)=>updateBook(e)}>
              Update
            </button>
          </div>
        </form>
        
      </div>
    </div>
  );
};
export default UpdateBook;