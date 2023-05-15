import React , {useState , useEffect} from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Table from 'react-bootstrap/Table';
import { useLocation, useNavigate, useParams } from 'react-router';
import Button from 'react-bootstrap/Button';
import { getAuthUser } from "../../../helper/Storage";

const GetChapter = () => {

  const [chapter , setChapter] = useState({
        loading: true,
        results : [],
        err:null,
        reload:0,
  })

  const location = useLocation()

  // const bookName = location.pathname.split("/")[2]
  // const chaptertile = location.pathname.split("/")[3]
  const {bookName}=useParams();

  useEffect(() => {
    setChapter({...chapter , loading:true})
    axios.get("http://localhost:4000/chapter/" + bookName)
    .then((resp) =>{
          
      setChapter({...chapter , results:resp.data , loading:false , err:null})

    })
    .catch((err) =>{
      setChapter({...chapter , loading:false ,  err:"error happen don't try again and go away"})

    })


  } , [chapter.reload] )

  const deleteChapter=(e,bookName , chapterTitle)=>{
    e.preventDefault();
    console.log("book name-->",bookName)
    console.log("book name-->",chapterTitle)
    axios.delete("http://localhost:4000/chapter/"+bookName+"/"+chapterTitle+" ")
    .then((resp) =>{
      setChapter({...chapter , reload:chapter.reload +1})
    })
    .catch((err) =>{
      //setUsers({...users , loading:false ,  err:"error happen don't try again and go away"})

    })
  }

  return (
    <div className="table">
      
    <Table striped bordered hover variant="dark">
      <thead>
        <tr>
          <th>Title</th>
          <th>Description</th>
          <th>bookName</th>
          {
            getAuthUser().role==1&&(
              <th>Action</th>
            )
          }
          {/* condition */}
        </tr>
      </thead>
      <tbody>
      {
            chapter.results.map((ch)=>(
              
                
              <tr key={ch.title}>
                <td>{ch.title}</td>
                <td>{ch.description}</td>
                <td>{ch.bookName}</td>
                {
                  getAuthUser().role==1&&(
                    <td>
                      <Link to={"./updateChapter" + "/" + ch.title} type="button" class="btn btn-success" style={{ marginRight: "5px" }} >
                        Update
                      </Link>
                      <button type="button" class="btn btn-danger" variant="danger" onClick={(e) => { deleteChapter(e, ch.bookName, ch.title) }} >Delete</button>
                    </td>
                  )
                }

              </tr>    
            
            ))
        }
      </tbody>
    </Table>
    {
        getAuthUser().role == 1 && (
          <button style={{ border: "0px" }}>
            <Link to={"./AddChapter/" + bookName} type="button" class="btn btn-success" >
              Add
            </Link>
          </button>
        )
    }
    </div>
  );
}

export default GetChapter;