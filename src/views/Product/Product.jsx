import Header from "../../components/Header";
import styles from "./Product.module.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import instance from "../../services/axios";
import RightContext2 from "../../components/RightContext2";


function Product() {
const { id } = useParams();
const [product, setProduct] = useState(null);
const [mainImage, setMainImage] = useState(null);


useEffect(() => {
  const fetchProduct = async () => {
    try {
      const response = await instance.get(`/products/${id}`);
      setProduct(response.data);
      setMainImage(response.data.cover_image);
      console.log("Product fetched:", response.data);
    } catch (error) {
      console.log("Error fetching product:", error);
    }
  };

  fetchProduct();
}, [id]);

if(!product) return <p>Loading...</p>;


return (
  <>
    <Header rightContext={<RightContext2 />}></Header>
    <div className={styles.listing}>Listing / Product</div>
<main className={styles.product_main}>
 


  <aside className={styles.images}>
    <div className={styles.side_images_wrapper}>
    {product.images?.map((img, index) => (
      <img
        key={index}
        src={img}
        alt={`side-${index}`}
        className={`${styles.thumbnail} ${mainImage === img ? "active" : ""}`}
        onClick={() => setMainImage(img)}
      />
    ))}
    </div>

      <div className={styles.main_image}>
    <img src={mainImage} alt={product.name}/>
  </div>
  
</aside>
<aside className={styles.product_details}>
<h2>{product.name}</h2>
<p>$ {product.price}</p>

<div>
<p>Details</p>
<img src={product.brand.image} alt="" />
</div>
</aside>
</main>
  </>
);
}

export default Product;
