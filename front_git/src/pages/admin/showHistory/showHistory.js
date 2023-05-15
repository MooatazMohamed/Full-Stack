import React from 'react';
//import {readersData} from '../../../core/data/readersData'
//import Empty from "../../product/components/empty";
import History from './history';
import './history.css'
const ShowHistory = ()=>{
    const items = readersData
    const displayHistory = ()=>{
        return items.map((item) =>{
            return <History 
                id = {item.id}
                readername = {item.name}
                bookid = {item.bookID}
                bookname = {item.bookName}
                state = {item.state}
                />
    })
    }
    return (
    <div className="request-list">{
        items.length > 0 ?
        displayHistory()
        :
        <Empty />
    }
    </div>
    )    
}
export default ShowHistory
