import styles from "./Cart.module.css";
import { useEffect, useState } from "react";
import cartEmpty from "../../assets/empty_cart.png";
import { getCart, deleteCartItem, updateCartItem  } from "../../services/cartService";
import { useNavigate } from "react-router-dom";

function Cart({ isOpen, setIsOpen }) {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);

  const subTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

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

  const handleGoToCheckout = () =>{
    setIsOpen(false);
    navigate("/checkout");
  }
  const handleUpdateQuantity = async (id, newQuantity) => {
  try {
    await updateCartItem(id, newQuantity); 
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  } catch (error) {
    console.error("Error updating quantity:", error);
  }
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
            <div className={styles.empty_cart}>
              <img src={cartEmpty} alt="" />
              <p className={styles.note}>Ooops!</p>
              <p className={styles.nothing_in_cart}>
                You’ve got nothing in your cart just yet...
              </p>
              <button onClick={handleStartShopping}>Start shopping</button>
            </div>
          ) : (
            <>
              <div className={styles.items_list}>
                {cartItems.map((item) => (
                  <div
                    key={`${item.id}-${item.color}-${item.size}`}
                    className={styles.cart_item}
                  >
                    <img src={item.cover_image} alt={item.name} />
                    <div className={styles.item_details}>
                      <div className={styles.name_price}>
                        <h4>{item.name}</h4>
                        <p>$ {item.price}</p>
                      </div>
                      <p>{item.color}</p>
                      <p>{item.size}</p>
                      <div className={styles.quantity_controls}>
                        <div className={styles.quantity_box}>
                        <button
                          onClick={() =>
                            item.quantity > 1 &&
                            handleUpdateQuantity(item.id, item.quantity - 1)
                          }
                        >
                          –
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          onClick={() =>
                            handleUpdateQuantity(item.id, item.quantity + 1)
                          }
                        >
                          +
                        </button>
                        </div>
                        <button
                          className={styles.delete_button}
                          onClick={() => handleDelete(item.id)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className={styles.cart_footer}>
                <div>
                  <span>Items subtotal</span>
                  <span>$ {subTotal}</span>
                </div>
                <div>
                  <span>Delivery</span>
                  <span>$ 5</span>
                </div>
                <div>
                  <p>Total</p>
                  <p>$ {subTotal + 5}</p>
                </div>
                <button className={styles.checkout_button} onClick={handleGoToCheckout}>
                  Go to checkout
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Cart;
