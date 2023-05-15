import React , {useState , useEffect} from "react";
import axios from "axios";
import Table from 'react-bootstrap/Table';
import { Link } from "react-router-dom";
import "./ManageReader.css";

const ManageReader = () =>{
    const [users,setUsers] = useState({
        loading: true,
        results : [],
        err:null,
        reload:0,
      });

      useEffect(() =>{
        setUsers({...users , loading:true})
        axios.get("http://localhost:4000/user")
        .then((resp) =>{
          
          setUsers({...users , results:resp.data , loading:false , err:null})

        })
        .catch((err) =>{
          setUsers({...users , loading:false ,  err:"error happen don't try again and go away"})

        })
      }, [users.reload] );
      
    const deleteUser=(email)=>{
        axios.delete("http://localhost:4000/user/"+email)
        .then((resp) =>{
          
          setUsers({...users , reload:users.reload +1})

        })
        .catch((err) =>{
          //setUsers({...users , loading:false ,  err:"error happen don't try again and go away"})

        })
    }

    //   const [search,setSearch] = useState("")

    //   const searchBooks = (e) =>{
    //     e.preventDefault();
    //     setBooks({...books , reload: books.reload+1})
    //   }

    return(
        <div className="table">
          <Link className="link" to="./addReader"><button type="button" class="btn btn-success">Add</button></Link>
          <br></br>
           <Table striped bordered hover variant="dark">
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Phone</th>
          
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {
            users.results.map((user)=>(
                <tr key={user.email}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>+20 {user.phone}</td>
                    
                    <td>
                        <button type="button" class="btn">
                        <Link to={"./UpdateReader/" + user.email} type="button" class="btn btn-success" >
                              Update
                           </Link>
                        </button>
                        <button type="button" class="btn btn-danger" onClick={(e)=>{deleteUser(user.email)}}>Delete</button>
                    </td>
                </tr>        
            ))
        }
      </tbody>
    </Table>
      </div>
    )    
}

export default ManageReader ;