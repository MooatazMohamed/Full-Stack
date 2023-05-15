import React, { useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router';
import { useLocation ,  useParams } from 'react-router';

//import { toast } from 'react-toastify';

const AddChapter=()=>{

    const[chapter,setChapter] = useState({
        title:"",
        description:"",
       
    });

    const navigate = useNavigate()
    const location = useLocation()
    
    //const bookName = location.pathname.split("/")[2]
    let {bookName}=useParams();
    const handleChange = (e) =>{
        setChapter(prev=>({...prev,[e.target.name]:e.target.value}))
    };
    console.log(bookName);
    const handleClick = async (e) =>{
        e.preventDefault()
        
        try{
           await axios.post("http://localhost:4000/chapter/"+ bookName , chapter)
           navigate("/getChapter/"+bookName)

        }catch(err){
            //console.log(err)
            window.alert('title exist');
        }
    }

    return(
    <Form>
        
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label >title</Form.Label>
          <Form.Control onChange={handleChange} name="title"  type="text" placeholder="Enter title" required/>
        </Form.Group>
  
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>description</Form.Label>
          <Form.Control onChange={handleChange} name="description" type="email" placeholder="Enter description" required />
        </Form.Group>
        
        <Button variant="primary" onClick={handleClick} type="submit">
          Submit
        </Button>
      </Form>)
}


export default AddChapter;