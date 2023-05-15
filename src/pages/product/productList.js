import React from "react";
import ProductCard from "./components/productCard";
import "./style/productList.css"
import {Data} from '../../core/data/books'
import Empty from "./components/empty";
const ProductList = () => {
    const items = Data;

    const viewFromProductList = (id) => {
        console.log("We are from parent ", id);
    }

    const displayMovies = () => {
        return items.map((item) => {
            return <ProductCard 
            key={item.id} 
            id = {item.id}
            name={item.name} 
            desc={item.description} 
            img = {item.image}
            view = {viewFromProductList}
            />
        });
    }
    return(
        <div className="product-list">{
            items.length > 0 ?
            displayMovies()
            :
            <Empty />
        }
        </div>
    );
}
export default ProductList;