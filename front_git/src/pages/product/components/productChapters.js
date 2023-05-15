import React from "react"
import '../style/chapters.css'
const ProductChapter = (props) =>{
    return(
        <div className="product-card3">
            <div className="card-info3">
                <h4 className="title3">Chapter {props.id}</h4>
                <p className="description3">{props.desc}</p>
            </div>
        </div>
    )
}
export default ProductChapter;