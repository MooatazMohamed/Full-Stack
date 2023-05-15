// import React from "react";
// import ProductCard from "../product/components/productCard";
// import "./reader.css";
// import { Data } from "../../core/data/books";
// import Empty from "../product/components/empty";
// import { useState } from "react";
// const Reader = () => {
//   const items = Data;
//   const [searchTerm, setSearchTerm] = useState("");
//   const filteredCards = Data.filter((card) =>
//     card.name.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const displayMovies = () => {
//     return filteredCards.map((item) => {
//       return (
//         <ProductCard
//           key={item.id}
//           id={item.id}
//           name={item.name}
//           auther={item.auther}
//           desc={item.description}
//           field={item.field}
//           publicationDate={item.publicationDate}
//         />
//       );
//     });
//   };
//   return (
//     <div>
//       <div className="box7">
//         <form name="search">
//           <input
//             type="text"
//             className="input7"
//             name="txt"
//             value={searchTerm}
//             placeholder="Search Here...."
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//         </form>
//       </div>
//       <div className="product-list">
//         {items.length > 0 ? displayMovies() : <Empty />}
//       </div>
//     </div>
//   );
// };
// export default Reader;
import React , {useState , useEffect} from "react";
import ProductCard from "../product/components/productCard";
import axios from "axios";
import Spinner from 'react-bootstrap/Spinner';
  import Alert from 'react-bootstrap/Alert';
import { setAuthUser,getAuthUser,removeAuthUser } from "../../helper/Storage";
//import { Form } from "react-router-dom";
import Form from "react-bootstrap/Form"
import { Navigate,useNavigate } from "react-router-dom";
// import { Link } from "react-router-dom";

//import ProductCard from "./productCard";
//PROPS READ ONLY



  const Reader = () => {
        const navigate=useNavigate();
        const [books,setBooks] = useState({
          loading: true,
          results : [],
          err:null,
          reload:0,
        });

        useEffect(() =>{
          setBooks({...books , loading:true})
          axios.get("http://localhost:4000/library",{
            headers:{
              token:getAuthUser().token
            },
            params:{
              search: search,
            }
          })
          .then(resp =>{
            
            setBooks({...books , results:resp.data , loading:false , err:null})

          })
          .catch(err =>{
            setBooks({...books , loading:false ,  err:"you are not authenticated to this route"})

          })
        }, [books.reload] );

        const [search,setSearch] = useState("")

        const searchBooks = (e) =>{
          e.preventDefault();
          let userEmail=getAuthUser().email;
          
          axios.post("http://localhost:4000/searchHistory/"+search,{email:userEmail})
          .then((resp)=>{
            
          }).catch((error)=>{
            
          });
          
          setBooks({...books , reload: books.reload+1})
        }

    return(
      <div className="home-container px-5">
          { /* Spiner */}
          {
            books.loading === true && (
              <div className="text-center">
                <Spinner animation="border" variant="primary" />
            </div>
            )
          }
          { /* List */}
          {
            books.loading === false && books.err == null && (
              <>
              <br></br>
              { /* Filter */}
                    <Form onSubmit={searchBooks}>
                      <Form.Group className="mb-3 d-flex">
                        <Form.Control 
                        type="text"
                        
                        placeholder="Search Book"
                        className="rounded-0" 
                        value={search}
                        onChange={(e) =>setSearch(e.target.value) }
                        />
                        <button className="btn btn-dark rounded-0">Search</button>
                      </Form.Group>
                    </Form>


                      <div className="row">

                        {/* {console.log(books)} */}
                          {
                              books.results.map((book) =>(
                                <div className="col-3 card-movie-container"  key={book.name}>
                                  
                                <ProductCard
                                name={book.name}
                                description = {book.description}
                                auther = {book.auther}
                                publicationDate = {book.publicationDate}
                                pdfFileUrl = {book.pdfFileUrl}
                                imageUrl = {book.imageUrl}
                                /> 
                            </div>
                              ))
                          }
                          
                      </div>
                      </>
            )
          }  
          { /* Error */}
          {
              books.loading === false && books.err != null && (
                <Alert variant="danger" className="p-2">
                  <h2 style={{textAlign:"center"}}>This path is not Found
                    <br/>
                    {books.err}
                  <div>
                    <button style={{borderColor:'#842029',borderRadius:'6px',padding:'5px',backgroundColor:'#f8d7da'}} ><a href="/" style={{textDecoration:'none',color:'#842029'}}>login</a></button>
                    </div>
                  </h2>
                </Alert>
                
          )}     
      </div>
        
    )    
}
export default Reader ;