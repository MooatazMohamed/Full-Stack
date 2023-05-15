// import React, { useEffect, useState } from "react";
// import "./style/productList.css";
// import { Link } from "react-router-dom";
// import book1 from "../../assets/images/book1.jfif";
// import book2 from "../../assets/images/book2.jfif";
// import book3 from "../../assets/images/book3.jfif";
// import axios from "axios";
// import Spinner from 'react-bootstrap/Spinner';
// import ProductCard from "./components/productCard";
// const ProductList = () => {
//   const [book,setBook]=useState({
//     loading:true,
//     results:[],
//     err:null,
//     reload:0
//   });
//   useEffect(()=>{
//     setBook({...book,loading:true});
//     axios.get("http://localhost:4000/library")
//     .then((resp)=>{
//       console.log(resp);
//       setBook({...book,results:resp.data,loading:false,err:null});
//     }).catch((err)=>{
//       setBook({...book,loading:false,err:"err in data"});
//     })
//   },[]);
//   return (
//     <div>
//     <div className="product-list">
//       <Spinner animation="border" variant="primary" />
//       {/* <div className="product-card">
//         <div className="card-img">
//           <img src={book1} alt="product-card" />
//         </div>
//         <div className="card-info">
//           <h4 className="title">Hebta</h4>
//           <p className="description">It has survived not only five centuries remaining essentially unchanged.</p>
//           <button className="watch-but"><Link to={'/login'}>View</Link></button>
//         </div>
//       </div> */}
//       <ProductCard auther={"test-auther"} name={"test-name"} publicationDate={"test-date"} field={"test-field"} desc={"test-field"}/>
//       <div className="product-card">
//         <div className="card-img">
//           <img src={book2} alt="product-card" />
//         </div>
//         <div className="card-info">
//           <h4 className="title">Hebta</h4>
//           <p className="description">It has survived not only five centuries remaining essentially unchanged.</p>
//           <button className="watch-but"><Link to={'/login'}>View</Link></button>
//         </div>
//       </div>
//       <div className="product-card">
//         <div className="card-img">
//           <img src={book3} alt="product-card" />
//         </div>
//         <div className="card-info">
//           <h4 className="title">Hebta</h4>
//           <p className="description">It has survived not only five centuries remaining essentially unchanged.</p>
//           <button className="watch-but"><Link to={'/login'}>View</Link></button>
//         </div>
//     </div>
//     </div>
//   </div>
//   );
// };
// export default ProductList;

import React from "react";
// import { Link } from "react-router-dom";

import ProductCard from "../product/components/productCard";
//PROPS READ ONLY

const ProductList = () =>{

    return(
        <div className="home-container px-5">
            <div className="row">

                <div className="col-3 card-movie-container">
                   <ProductCard /> 
                </div>

                <div className="col-3 card-movie-container">
                   <ProductCard /> 
                </div>

                <div className="col-3 card-movie-container">
                   <ProductCard /> 
                </div>
            </div>
 

        </div>

    )
}
export default ProductList ;