import React from "react";
import axios from "axios";
const Rq = (props) => {
  const declineRequest=()=>{
    //console.log('props.readerName');
    axios.delete("http://localhost:4000/admin",{email:props.readerName,bookName:props.bookName})
    .then((resp)=>{
        console.log(resp);
    }).catch((error)=>{
        console.log(error);
    });
  }
  
};

export default Rq;