import React from "react";
import ProductChapter from "../product/components/productChapters";
import "../product/style/productChaptersList.css"
import {ChaptersData} from '../../core/data/chapters'
const ProductChapterList = () => {
    const items = ChaptersData;

    const displayMovies = () => {
        return items.map((item) => {
            return <ProductChapter 
            key={item.id} 
            id = {item.id}
            desc={item.description} 
            />
        });
    }
    return(
        <div className="product-list3">{displayMovies()}</div>
    );
}
export default ProductChapterList;