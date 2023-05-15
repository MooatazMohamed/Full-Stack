import React, {useState } from "react";
import "./registration.css";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
const Registration = () => {
  const navigate = useNavigate();
  const [email,setEmail] = useState('');
  const [password,setPass] = useState('');
  const [phone,setPhone] = useState('');
  const validateEmail = (mail) => {
    return String(mail)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };
  const Register = (e) =>{
    e.preventDefault();
    if(!validateEmail(email) && phone.length !== 11){
      document.getElementById("shortc").innerHTML="Please Enter a Valid Email And Phone";
      document.getElementById("shortc").style.display = "block";
      document.getElementById("shortc").style.color = "red";
    }
    else if(!validateEmail(email)){
      document.getElementById("shortc").innerHTML="Please Enter a Valid Email";
      document.getElementById("shortc").style.display = "block";
      document.getElementById("shortc").style.color = "red";
    }
    else if(phone.length !== 11){
      document.getElementById("shortc").innerHTML="Please Enter a Valid Phone";
      document.getElementById("shortc").style.display = "block";
      document.getElementById("shortc").style.color = "red";
    }
    else {
      Axios.post("http://localhost:4000/Auth/register",{
        email : email,
        password : password,
        phone : phone,
      }).then((res) => {
        navigate({
          pathname:'/login',})
        }).catch((err) => {
          document.getElementById("shortc").innerHTML="This Email is Already Exist";
          document.getElementById("shortc").style.display = "block";
          document.getElementById("shortc").style.color = "red";
        })
    }
  }

  return (
    <>        
    <h3 style={{display : "None" ,  marginLeft: "500px" ,marginBottom: "-80px", marginTop: "80px"}} id = "shortc"></h3>
    <div style={{marginTop : "100px"}} className="container" id="container">
      <div className="form-container log-in-container">
        <form action="#" className="login-form" onSubmit={Register}>
          <h1 className="login">Registration</h1>
          <span className="anouther-account">make your account from here</span>
          <br></br>
          <input type="email" placeholder="Email" className="text-field" required onChange={(event) => setEmail(event.target.value)} />
          <input type="password" placeholder="Password" className="pass-field" required onChange={(event) => setPass(event.target.value)} />
          <input type="phone" placeholder="Phone" className="phone-field" required onChange={(event) => setPhone(event.target.value)}/>
          <button className="login-button">Registration</button>
        </form>
      </div>
    </div>
    </>
  );
};
export default Registration;