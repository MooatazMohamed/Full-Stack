import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useLocation, useNavigate, useParams } from 'react-router';
//import { toast } from 'react-toastify';

const UpdateChapter=()=>{

    const[chapter,setChapter] = useState({
        title:"",
        description:"",
       
    });

    const navigate = useNavigate()
    const location = useLocation()
    
    const bookName = location.pathname.split("/")[2]
    const chaptertile = location.pathname.split("/")[4]

    useEffect(()=>{
        axios.get("http://localhost:4000/chapter/"+ bookName + "/" + chaptertile )
        .then((resp)=>{
            console.log(resp.data);
            setChapter({title:resp.data.title,description:resp.data.description});
        })
        .catch((err)=>{
            //console.log(err);
            window.alert(err);
        })
    },[])

    const handleChange = (e) =>{
        setChapter(prev=>({...prev,[e.target.name]:e.target.value}))
    };
    console.log(bookName,chaptertile);
    const handleClick = async (e) =>{
        e.preventDefault()
        console.log(chapter);
        try{
           await axios.put("http://localhost:4000/chapter/"+ bookName + "/" + chaptertile , chapter)
           navigate("/getChapter/"+bookName)

        }catch(err){
            console.log(err)
        }
    }

    return(
    <Form>
        
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label >title</Form.Label>
          <Form.Control onChange={handleChange} name="title"  type="text" placeholder="Enter title" />
        </Form.Group>
  
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>description</Form.Label>
          <Form.Control onChange={handleChange} name="description" type="email" placeholder="Enter description" />
          
        </Form.Group>
        
        <Button variant="primary" onClick={handleClick} type="submit">
          Submit
        </Button>
      </Form>)
}

export default UpdateChapter;