import Header from "../../components/Header";
import styles from "./Checkout.module.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import instance from "../../services/axios";
import {useState, useEffect} from "react"
import SuccessModal from '../../components/SuccessModal'
import RightContext2 from "../../components/RightContext2";
import {getCart, updateCartItem, deleteCartItem} from '../../services/cartService'

//validation
const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  surname: yup.string().required("Surname is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  address: yup.string().required("Address is required"),
  zip_code: yup
    .string()
    .matches(/^\d+$/, "Zip code must be a number")
    .required("Zip code is required"),
});

function Checkout() {
const [backendErrors, setBackendErrors] = useState({});
const [cartItems, setCartItems] = useState([]);

 const subTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const [showSuccess, setShowSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });
  const token = localStorage.getItem("token");

  const onSubmit = async (data) => {
    try {
      setBackendErrors({})
      const response = await instance.post("/cart/checkout", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("success", response.data);
      reset();
      setShowSuccess(true)
    } catch (error) {
      if(error.response?.data?.errors){
        const formatted = {}
        Object.entries(error.response.data.errors).forEach(([key, value]) =>{
          formatted[key] = value.join(", ")
        })
        setBackendErrors(formatted)
      }else{
        console.log('error is : ')
      }

      console.log("Error sending form:", error);
    }
  };

  
    useEffect(() => {
       fetchCartItems();
    }, []);
  
    const fetchCartItems = async () => {
      try {
        const items = await getCart();
        setCartItems(items);
      } catch (error) {
        console.log("Error fetching cart:", error);
      }
    };
  
    const handleDelete = async (id, color, size) => {
      try {
        await deleteCartItem(id);
        setCartItems((prev) =>
      prev.filter(
        (item) =>
          !(item.id === id && item.color === color && item.size === size)
      )
    );
      } catch (err) {
        console.log(err);
      }
    };

    const handleUpdateQuantity = async (id,color, size, newQuantity) => {
    try {
      await updateCartItem(id, newQuantity); 
       setCartItems((prev) =>
      prev.map((item) =>
        item.id === id && item.color === color && item.size === size
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  return (
    <>
      <Header rightContext={<RightContext2 />}></Header>
      <main className={styles.checkout_main}>
        <h3>Checkout</h3>

        <form
          className={styles.checkout_form}
          onSubmit={handleSubmit(onSubmit)}
        >
          <aside className={styles.form_aside}>
            <h4>Order details</h4>
            <div className={styles.main_form}>
              <div className={styles.name_surname}>
                <div className={styles.error_wrapper}>
                  <input
                    type="text"
                    placeholder="Name"
                    {...register("name")}
                    className={errors.name || backendErrors.name ? styles.inputError : ""}
                  />

                  <span className={styles.errorText}>{errors.name?.message || backendErrors.name}</span>
                </div>
                <div className={styles.error_wrapper}>
                  <input
                    type="text"
                    placeholder="Surname"
                    {...register("surname")}
                    className={errors.surname || backendErrors.surname ? styles.inputError : ""}
                  />

                  <span className={styles.errorText}>{errors.surname?.message || backendErrors.surname}</span>
                </div>
              </div>
              <div className={styles.email_wrapper}>
                <input
                  type="email"
                  placeholder="Email"
                  {...register("email")}
                  className={errors.email || backendErrors.email ? styles.inputError : ''}
                />
                <span className={styles.errorText}>{errors.email?.message || backendErrors.email}</span>
              </div>

              <div className={styles.adress_code}>
                <div className={styles.error_wrapper}>
                  <input
                    type="text"
                    placeholder="Address"
                    {...register("address")}
                    className={errors.address || backendErrors.address ? styles.inputError : ""}
                  />

                  <span className={styles.errorText}>{errors.address?.message || backendErrors.address}</span>
                </div>
                <div className={styles.error_wrapper}>
                  <input
                    type="text"
                    placeholder="Zip code"
                    {...register("zip_code")}
                    className={errors.zip_code || backendErrors.zip_code ? styles.inputError : ""}
                  />

                  <span className={styles.errorText}>{errors.zip_code?.message || backendErrors.zip_code}</span>
                </div>
              </div>
            </div>
          </aside>
          <aside className={styles.chosen_products}>
            <div>
       
              
                      <div className={styles.cart_items}>
                        
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
                                          handleUpdateQuantity(item.id, item.color, item.size, item.quantity - 1)
                                        }
                                      >
                                        –
                                      </button>
                                      <span>{item.quantity}</span>
                                      <button
                                        onClick={() =>
                                          handleUpdateQuantity(item.id, item.color, item.size, item.quantity + 1)
                                        }
                                      >
                                        +
                                      </button>
                                      </div>
                                      <button
                                        className={styles.delete_button}
                                        onClick={() => handleDelete(item.id, item.color, item.size)}
                                      >
                                        Remove
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                            <div className={styles.cart_footer}>
                              <div className={styles.wrapper}>
                                <span>Items subtotal</span>
                                <span>$ {subTotal}</span>
                              </div>
                              <div className={styles.wrapper}>
                                <span>Delivery</span>
                                <span>$ 5</span>
                              </div>
                              <div className={styles.wrapper}>
                                <p>Total</p>
                                <p>$ {subTotal + 5}</p>
                              </div>
                              
                            </div>
                          </>
                        
                      </div>
                    </div>
                
            <button type="submit" className={styles.pay} >Pay</button>
            
          </aside>
        </form>
      </main>
    </>
  );
}

export default Checkout;
