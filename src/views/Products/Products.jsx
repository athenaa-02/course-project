import Header from "../../components/Header";
import { useEffect, useState } from "react";
import { getProductsInfo } from "../../services/auth";
import RightContext2 from "../../components/RightContext2";

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
    </>
  );
}

export default Products;
