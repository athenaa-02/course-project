import Header from "../../components/Header";
import styles from "./Product.module.css";  
import RightContext2 from "../../components/RightContext2";



function Product() {


  return (
    <>
  <Header rightContext={<RightContext2 />}></Header>
    </>
  );
}

export default Product;
