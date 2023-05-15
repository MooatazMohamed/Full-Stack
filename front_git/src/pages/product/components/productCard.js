// import React from "react";
// import "../style/productCard.css";
// import { useState, useRef } from "react";
// const Product = (props) => {
//   const [isAsk, setIsAsk] = useState(true);
//   const isFirstClick = useRef(true);

//   const hClick = () => {
//     if (isFirstClick.current) {
//       setIsAsk(false);
//       isFirstClick.current = false;
//     }
//   };
//   return (
//     <div className="product-card">
//       <div className="card-info">
//         <br></br>
//         <h2 className="auther">{props.auther}</h2>
//         <br></br>
//         <div>
//           <div>
//             <h1 className="title">{props.name}</h1>
//             <p className="publicationDate">{props.publicationDate}</p>
//           </div>
//           <h5 className="field">({props.field})</h5>
//         </div>
//         <br></br>
//         <h3 className="description">{props.desc}</h3>
//       </div>
//       <button className="neon1" onClick={hClick}>
//         {isAsk ? "Ask" : "Booked"}
//       </button>
//     </div>
//   );
// };
// export default Product;
import React, { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import "../style/productCard.css"
import { getAuthUser,removeAuthUser,setAuthUser } from "../../../helper/Storage";
import { Link } from "react-router-dom";
import axios from "axios";
const ProductCard = (props) =>{
    //console.log('->',props);
    const [pdfLink,setPdfLink]=useState({
      url:'',
      buttonState:'Request'
    });
    
    useEffect(()=>{
      if(getAuthUser().role==1){
        setPdfLink({url:props.pdfFileUrl,buttonState:'show'})
      }
      else if(getAuthUser().role==0){
        //console.log(props);
        
        axios.get(`http://localhost:4000/user/searchRequest/${getAuthUser().email}/${props.name}`)
        .then(resp=>{
          if(resp.data[0]){
            if(resp.data[0].bookState==1){
              setPdfLink({url:props.pdfFileUrl,buttonState:'show'})
            }
            else{
              setPdfLink({url:'',buttonState:'Requesting'});
            }
          }
        })
        .catch(err=>{
          console.log(err);
        })
      }
    },[])
    
    const changeButtonState=()=>{
      if(pdfLink.buttonState=='Request'){
        //request the book axios
        axios.post("http://localhost:4000/user/sendRequest",{
          email:getAuthUser().email,
          bookName:props.name,
        })
        .then(resp=>{
          console.log(resp);
        })
        .catch(err=>{
    
        })
        setPdfLink({url:'',buttonState:'Requesting'})
      }
    }
    return(
      <div>
          <br></br>
        <Card className="Card">
          <Link to={"/getChapter/" + props.name} type="button"  >
            <Card.Img className="card-image" variant="top" src={props.imageUrl} />
          </Link>
        
          
          <Card.Title> Name of book : {props.name}</Card.Title>
          <div className="card-text">
          <h6 className="description"> Descriptioon : {props.description} </h6>
          <h6 class="text-light bg-dark" > author : {props.auther} </h6>
          <h6 class="text-light bg-dark"> publication Date : {props.publicationDate} </h6>
          </div>
        <Link className="btn btn-dark w-100" to={pdfLink.url} onClick={()=>changeButtonState()}> {pdfLink.buttonState} </Link>
            
      </Card>
      <br></br>
      </div>
    )    
}

export default ProductCard ;