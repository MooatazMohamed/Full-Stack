// import React from "react";
// import "./style/availableBooks.css";
// import { Data } from "../../../core/data/books";
// import Empty from "../../product/components/empty";
// import AdminProduct from "../../admin/showAvailableBooks/adminProduct";
// import book from "../../../assets/images/book.png";
// import { Link } from "react-router-dom";

// const AdminView = () => {
//   const items = Data;
//   const displayMovies = () => {
//     return (
//     items.map((item) => {
//       return (
//         <AdminProduct
//           key={item.id}
//           id={item.id}
//           name={item.name}
//           desc={item.description}
//           auther={item.auther}
//           field={item.field}
//           publicationDate={item.publicationDate}
//         />
//       );
//       })
//     )
//   };
//   return (
//     <div className="product-list">
//      <Link to={"/addBook"}><div><img src ={book} alt ="add-book" className="add-book"/> </div> </Link>
//       {items.length > 0 ? displayMovies() : <Empty />}
//     </div>
//   );
// };
// export default AdminView;