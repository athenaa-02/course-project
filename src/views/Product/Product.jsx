import Header from "../../components/Header";
import styles from "./Product.module.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import cartLogo from "../../assets/white_cart_logo.png";
import RightContext2 from "../../components/RightContext2";
import instance from "../../services/axios";
import { addToCart, updateCartItem, getCart} from "../../services/cartService"

function Product() {
const { id } = useParams();
const [product, setProduct] = useState(null);
const [mainImage, setMainImage] = useState(null);
const [selectedSize, setSelectedSize] = useState(null);
const [selectedColor, setSelectedColor] = useState(null)
const [quantity, setQuantity] = useState(1)


useEffect(() => {
  const fetchProduct = async () => {
    try {
      const response = await instance.get(`/products/${id}`);
      setProduct(response.data);
      setMainImage(response.data.cover_image);
    } catch (error) {
      console.log("Error fetching product:", error);
    }
  };

  fetchProduct();
}, [id]);


useEffect(() => {
  if (product) {
    if (product.available_colors?.length > 0 && product.images?.length > 0) {
      setSelectedColor(product.available_colors[0]);
      setMainImage(product.images[0]);
    } else {
      setMainImage(product.cover_image);
    }
  }
}, [product]);


const handleColorClick = (color, index) => {
  setSelectedColor(color);
  if (product.images[index]) {
    setMainImage(product.images[index]);
  }
}


const handleAddToCart = async () => {
  if (!selectedSize || !selectedColor) return alert("Select size and color");

  try {
    const cartItems = await getCart(); 

    const existingItem = cartItems.find(
      (item) =>
        item.product_id === product.id &&
        item.size === selectedSize &&
        item.color === selectedColor 

    );

    if (existingItem) {
      await updateCartItem(existingItem.id, existingItem.quantity + quantity);
      alert("Updated quantity in cart!");
    } else {
      await addToCart({
        productId: product.id,
        color: selectedColor,
        size: selectedSize,
        quantity,
      });
      
      alert("Added to cart!");
    }
  } catch (error) {
    console.log("Error adding to cart:", error);
  }
};

if(!product) return <p>Loading...</p>


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
  <span>Color: <span>{selectedColor}</span></span>
  <div className={styles.colors}>
{product.available_colors?.map((color, index) => (
    <button
      key={index}
      className={`${styles.color_picker} ${selectedColor === color ? styles.active : ""}`}
      style={{ backgroundColor: color }}
      onClick={() => handleColorClick(color, index)}
    />
  ))}
</div>
</div>

<div className={styles.size_wrapper}>
  <span>Size: <span>{selectedSize || "Select size"}</span></span>
  <div className={styles.sizes}>
    {product.available_sizes?.map((size, index) => (
      <button
        key={index}
        className={`${styles.size_picker} ${
          selectedSize === size ? styles.active : ""
        }`}
        onClick={() => setSelectedSize(size)}
      >
        {size}
      </button>
    ))}
  </div>

  <div className={styles.quantity_wrapper}>
    <span>Quantity</span>
<select value={quantity} onChange={(e) => setQuantity(Number(e.target.value))} >
 {Array.from({ length: product.quantity }, (_, i) => i + 1).map((num) => (
      <option key={num} value={num}>
        {num}
      </option>
    ))}
</select>
  </div>
  <button className={styles.add_btn} onClick={handleAddToCart}><img src={cartLogo} alt="" /> Add to cart</button>
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
)
}

export default Product;
