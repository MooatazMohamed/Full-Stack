import React from "react"
import '../style/productCard.css'
import ProductInfo from './productInfo'
import { Link } from "react-router-dom"
const Product = (props) =>{
    return(
        <div className="product-card">
            <div className="card-img">
                <img src={props.img} alt="product-card" />
            </div>
            <div className="card-info">
                <h4 className="title">{props.name}</h4>
                <p className="description">{props.desc}</p>
                <button className="watch-but">
                    <Link to={'/productInfo/'+props.id}>
                       View
                    </Link>
                </button>
            </div>
        </div>
    )
}
export default Product;