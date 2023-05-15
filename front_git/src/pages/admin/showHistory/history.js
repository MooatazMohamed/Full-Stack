import React from "react";
import './history.css'
const History = (props)=>{
    return(
            <div className="card">
                <div className="cont">
                    <span className="reader-name">
                        <span>Name: {props.readername}</span>
                    </span>
                    <span className="book-name">
                        <span>Book: {props.bookname}</span>
                    </span>
                    <span className="state">
                        <span>State: {props.state}</span>
                    </span>
                </div>
            </div>
    )
}

export default History;