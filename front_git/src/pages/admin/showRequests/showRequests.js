import React, { useEffect, useState } from 'react';
//import {readersData} from '../../../core/data/readersData'
//import Empty from "../../product/components/empty";
//import Rq from './requests';
import './ShowRequests.css'
import axios from "axios";
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';
import { setAuthUser, getAuthUser, removeAuthUser } from "../../../helper/Storage";
//import { Form } from "react-router-dom";

const ShowRequests = () => {

  const [requests, setRequests] = useState({
    loading: true,
    results: [],
    err: null,
    reload: 0,
  });

  useEffect(() => {
    setRequests({ ...requests, loading: true })
    axios.get("http://localhost:4000/admin")
      .then(resp => {

        setRequests({ ...requests, results: resp.data, loading: false, err: null })
        //requests.results.map((result)=>{console.log})

      })
      .catch(err => {
        setRequests({ ...requests, loading: false, err: "error happen don't try again and go away" })

      })
  }, [requests.reload]);

  const declineRequest = (userEmail, bookName) => {

    //console.log('props.readerName');
    axios.delete(`http://localhost:4000/admin/${userEmail}/${bookName}`)
      .then(resp => {
        //console.log(resp);
      })
      .catch(err => {
        //console.log(err);
      })
  }
  const acceptRequest = (userEmail, bookName) => {

    //console.log('props.readerName');
    axios.put(`http://localhost:4000/admin/${userEmail}/${bookName}`)
      .then(resp => {
        //console.log(resp);
      })
      .catch(err => {
        //console.log(err);
      })
  }
  return (
    <div className="request-list">
      {
        requests.loading === true && (
          <div className="text-center">
            <Spinner animation="border" variant="primary" />
          </div>
        )
      }
      {
        requests.results.map((result) => (
          <div className="card">
            <div className="cont">
              <div className="readers-data">
                <div className="reader-name">
                  <p>Name: {result.userEmail}</p>
                </div>
                <div className="book-name">
                  <p>Book: {result.bookName}</p>
                </div>
                <div className="choice">
                  <button className="acc" onClick={() => acceptRequest(result.userEmail, result.bookName)} >Accept</button>
                  <button className="dec" onClick={() => declineRequest(result.userEmail, result.bookName)}>Decline</button>
                </div>
              </div>

            </div>
          </div>
        ))
      }
    </div>
  )
}
export default ShowRequests;