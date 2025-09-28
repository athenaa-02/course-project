import Header from "../../components/Header";
import styles from "./Checkout.module.css";
// import useform
import RightContext2 from "../../components/RightContext2";

function Checkout() {


  return (
    <>
      <Header rightContext={<RightContext2 />}></Header>
      <main className={styles.checkout_main}>
        <h3 >Checkout</h3>

        <form className={styles.checkout_form}>
          <aside className={styles.form_aside}>
          <h4>Order details</h4>
          <div className={styles.main_form}>
            <div className={styles.name_surname}>
              <input type="text" placeholder="Name"/>
              <input type="text"  placeholder="Surname"/>
              </div>
              <input type="email" placeholder="Email" className={styles.email}/>
              <div className={styles.adress_code}>
              <input type="text" placeholder="Address" />
              <input type="number" placeholder="Zip code" />
              </div>
          </div>
          </aside>
          <aside className={styles.chosen_products}>
          <div></div>
          <button>Pay</button>
          </aside>
        </form>
      </main>
    </>
  );
}

export default Checkout;
