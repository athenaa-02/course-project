import styles from "./Cart.module.css";
import { use, useEffect, useState } from "react";
import cartEmpty from "../../assets/empty_cart.png";
import { getCart, deleteCartItem, addToCart } from "../../services/cartService";
import { useNavigate } from "react-router-dom";

function Cart({ isOpen, setIsOpen }) {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) fetchCartItems();
  }, [isOpen]);

  const fetchCartItems = async () => {
    try {
      const items = await getCart();
      setCartItems(items);
    } catch (error) {
      console.log("Error fetching cart:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteCartItem(id);
      setCartItems((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      console.log(err);
    }
  };
  const handleStartShopping = () => {
    setIsOpen(false);
    navigate("/products");
  };

  console.log("cart items:", cartItems);
  if (!isOpen) return null;

  return (
    <>
      <div className={styles.overlay} onClick={() => setIsOpen(false)}></div>

      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.cart_header}>
          <h3>Shopping cart {`(${cartItems.length})`}</h3>
          <button onClick={() => setIsOpen(false)}>x</button>
        </div>
        <div className={styles.cart_items}>
          {cartItems.length === 0 ? (
            <>
              <div className={styles.empty_cart}>
                <img src={cartEmpty} alt="" />
                <p className={styles.note}>Ooops!</p>
                <p className={styles.nothing_in_cart}>
                  You’ve got nothing in your cart just yet...
                </p>
                <button onClick={handleStartShopping}>Start shopping</button>
              </div>
            </>
          ) : (
            cartItems.map((item) => (
                
              <div key={item.id} className={styles.cart_item}>
                <img src={item.cover_image} alt={item.name} />
                <div className={styles.item_details}>
                  <div className={styles.name_price}>
                    <h4>{item.name}</h4>
                    <p>$ {item.price}</p>
                  </div>
                  <p> {item.color}</p>
                  <p> {item.size}</p>
                                <div className={styles.quantity_controls}>
                  <p>{item.quantity}</p>
                  <button
                    className={styles.delete_button}
                    onClick={() => handleDelete(item.id)}
                  >
                    Remove
                  </button>
                </div>
                </div>
  
              </div>
            ))
          )}
        </div>
        <div className={styles.cart_footer}>
          <button className={styles.checkout_button}>Go to checkout</button>
        </div>
      </div>
    </>
  );
}

export default Cart;
