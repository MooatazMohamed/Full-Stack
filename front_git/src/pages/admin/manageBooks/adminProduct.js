// import React, { useState } from "react";
// import "./style/availableBooks.css";
// import { createSearchParams, Link, useNavigate } from "react-router-dom";

// const AdminProduct = (props) => {
//   const navigate = useNavigate();
//   const navigateData = (e) =>{
//     e.preventDefault();
//     navigate({
//       pathname:'/updateBook',
//       search : createSearchParams({
//         Auther : props.auther,
//         Name : props.name,
//         Desc : props.desc,
//         Field : props.field,
//         PublicationDate : props.publicationDate,
//       }).toString(),
//     });
//   };
//   return (
//     <div className="product-card">
//       <div className="card-info">
//         <br></br>
//         <h2 className="auther">{props.auther}</h2>
//         <br></br>
//         <div>
//           <div>
//           <h1 className="title">{props.name}</h1>
//           <p className="publicationDate">{props.publicationDate}</p>
//           </div>
//           <h5 className="field">({props.field})</h5>
//         </div>
//         <br></br>
//         <h3 className="description">{props.desc}</h3>
//         <div className="admin">
//           <button className="showChapters">
//             <Link to={"/showChapters"}>Show Chapters</Link>
//           </button>
//           <button className="remove">
//             <Link>Remove</Link>
//           </button>
//           <button className="edit">
//             <Link to={"/updateBook"} onClick={navigateData}>Edit</Link>
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminProduct;