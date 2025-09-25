import Header from "../../components/Header";
import { useEffect, useState } from "react";
import { getProductsInfo } from "../../services/auth";
import RightContext2 from "../../components/RightContext2";
import filterLogo from "../../assets/filterLogo.png"
import downArrow from "../../assets/downArrow.png"
import styles from "./Products.module.css"

function Products() {

const [products, setProducts] = useState([])

useEffect(() =>{
const fetchProducts = async() =>{
  try{
const response = await getProductsInfo()
setProducts(response.data)
  }
  catch(error){
console.log('error fetching products:', error)
  }
}
fetchProducts()
},
[]
)
console.log(products)


  return (
    <>
      <Header rightContext={<RightContext2/>}></Header>
      <div className={styles.products_header}>
        <h3>Products</h3>
        <div className={styles.products_header_right}>
          <span>showing <span>1-10</span> of <span>100</span>results</span>
          <figure></figure>
          <div className={styles.filter_menu}>
            <img src={filterLogo}/>
            <span>Filter</span>
          </div>
          <div className={styles.sort_menu}>
            <span>Sort by</span>
            <img src={downArrow} alt="" />
          </div>
        </div>
      </div>
    </>
  );
}

export default Products;
