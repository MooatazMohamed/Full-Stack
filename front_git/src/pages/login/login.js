import React, {useState } from "react";
import { Navigate, createSearchParams, useNavigate } from "react-router-dom";
import "./login.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { getAuthUser, removeAuthUser, setAuthUser } from "../../helper/Storage";
const Login = () => {
  const navigate=useNavigate();
  const [login,setLogin]=useState({
    email:'',
    password:'',
    loading:false,
    err:[]
  })

  const LoginFunction=(e)=>{
    e.preventDefault();
    setLogin({...login,loading:true,err:[]})

    axios.post("http://localhost:4000/auth/login",{
      email:login.email,
      password:login.password
    }).then((resp)=>{ 
      setLogin({...login,loading:false,err:[]});
      setAuthUser(resp.data);
      //window.alert("account found!");
      if(getAuthUser().role==0)navigate("/home");
      else navigate("/admin");
    }).catch((err)=>{
      setLogin({...login,loading:false,err:err.response.data.errors});
    });
  }

  return (
    <>
    {/* <h3 style={{display : "None" ,   marginLeft: "420px" ,marginBottom: "-80px", marginTop: "80px"}} id = "shortc"></h3> */}
    {
      login.err.map((error,index)=>(
        (window.alert(error.msg))
        // <h3 key={index} style={{marginLeft: "290px" ,color:"red",marginBottom: "-80px", marginTop: "80px"}} id = "shortc">{error.msg}</h3>
      ))
    }
    <div style={{marginTop : "100px"}} className="container" id="container"> 
      <div className="form-container log-in-container">
        <form action="#" className="login-form" onSubmit={LoginFunction}>
          <span>
          <h1 className="login">Login</h1>
          <div className="anouther-account">or use your account</div>
          </span>
          <input
            type="email"
            placeholder="Email"
            className="text-field"
            required
            value={login.email}
            onChange={(e)=>setLogin({...login,email:e.target.value,err:[]})}
          />
          <input
            type="password"
            placeholder="Password"
            className="pass-field"
            required
            value={login.password}
            onChange={(e)=>setLogin({...login,password:e.target.value,err:[]})}
          />
          {/* <Link to = "/reg" ><p style={{color : "blue",marginLeft :"10px"}}>Make an Account From here..?</p> </Link> */}
          <div className="login-signup-button">
            <button className="login-button" disabled={login.loading===true}>Log In</button>
            {/* <button className="login-button">Sign Up</button> */}
          </div>
        </form>
      </div>
    </div>
    </>
  );
};
export default Login;