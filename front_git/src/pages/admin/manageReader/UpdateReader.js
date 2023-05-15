import React, { useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useLocation, useNavigate, useParams } from 'react-router';
//import { toast } from 'react-toastify';



const UpdateReader=()=>{

  //  let {email} = useParams()

    const[user,setUser] = useState({
        name:"",
        email:"",
        phone:"",
    });

    const navigate = useNavigate()
    const location = useLocation()

    //const userEmail = location.pathname.split("/")[3]
    let {email}=useParams();
    const userEmail=email;
    //console.log(location.pathname);
    const handleChange = (e) =>{
        setUser(prev=>({...prev,[e.target.name]:e.target.value}))
    };
    const handleClick = async (e) =>{
        e.preventDefault()
        try{
           await axios.put("http://localhost:4000/user/"+ userEmail , user)
           navigate("/admin/manageReader")
        }catch(err){
            //console.log(err)
            window.alert("email alread exisis");
        }
    }

    return(
    <Form>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label >name</Form.Label>
          <Form.Control onChange={handleChange} name="name"  type="text" placeholder="Enter name" />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>email</Form.Label>
          <Form.Control onChange={handleChange} name="email" type="email" placeholder="Enter email" />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>phone</Form.Label>
          <Form.Control onChange={handleChange} name="phone" type="text" placeholder="Enter phone" />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Button variant="primary" onClick={handleClick} type="submit">
          Submit
        </Button>
      </Form>)
}

export default UpdateReader;