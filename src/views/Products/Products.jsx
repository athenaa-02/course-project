import Header from "../../components/Header";
import LogoutButton from "../../components/LogoutButton";
import { useEffect, useState } from "react";
import { getProductsInfo } from "../../services/auth";

function Products() {
  const headerPart = (
    <div>
      <div>cart</div>
      <div>avatar</div>
     <div>
<LogoutButton></LogoutButton>
     </div>
    </div>
  );

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
      <Header rightContext={headerPart}></Header>
    </>
  );
}

export default Products;
