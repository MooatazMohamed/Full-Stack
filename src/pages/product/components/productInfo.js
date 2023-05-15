import React from "react";
import { useParams, useSearchParams } from "react-router-dom";
const ProductInfo = () =>{
    let {id} = useParams();
    let [params] = useSearchParams();
    console.log(params.get('size'));
    console.log(id);
    return(
        <div>
            <h1>
                ProductInfo
            </h1>
        </div>
    )
}
export default ProductInfo;