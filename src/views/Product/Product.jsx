import Header from "../../components/Header";
import styles from "./Product.module.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import instance from "../../services/axios";
import cartLogo from "../../assets/white_cart_logo.png";
import RightContext2 from "../../components/RightContext2";
import { CloudMoonRain } from "lucide-react";


function Product() {
const { id } = useParams();
const [product, setProduct] = useState(null);
const [mainImage, setMainImage] = useState(null);
const [selectedColor, setSelectedColor] = useState(null);


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
<p className={styles.product_price}>$ {product.price}</p>

<div className={styles.color_wrapper}>
  <span>Color: <span>{product.avaliable_colors?.length>0 ? product.avaliable_colors[0] : 'Default'}</span></span>
  <div className={styles.colors}>
  {(product.available_colors && product.available_colors.length > 0
      ? product.available_colors
      : ["#ccc"] 
    ).map((color, index) => (
      <button
  key={index}
  className={`${styles.color_picker} ${selectedColor === color ? styles.active : ""}`}
  style={{ backgroundColor: color }}
  onClick={() => setSelectedColor(color)}
/>
    ))}
</div>
</div>

<div className={styles.size_wrapper}>
  <span>Size: <span>L</span></span>
  <div className={styles.sizes}>
    <button className={styles.size_picker}>XS</button>
    <button className={styles.size_picker}>S</button>
    <button className={styles.size_picker}>M</button>
    <button className={styles.size_picker}>L</button>
    <button className={styles.size_picker}>XL</button>

  </div>

  <div className={styles.quantity_wrapper}>
    <span>Quantity</span>
<select name="" id="" >
  <option value="1">1</option>
  <option value="2">2</option>
  <option value="3">3</option>
  <option value="4">4</option>
  <option value="5">5</option>
</select>
  </div>
  <button className={styles.add_btn}><img src={cartLogo} alt="" /> Add to cart</button>
</div>
<figure></figure>

<div className={styles.logo_wrapper}>
<p className={styles.details}>Details</p>
<img src={product.brand.image} alt="" />
</div>
<span>Brand <span>Tomm</span></span>
<p className={styles.product_description}>{product.description}</p>
</aside>
</main>
  </>
);
}

export default Product;
