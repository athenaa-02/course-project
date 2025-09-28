import Header from "../../components/Header";
import styles from "./Checkout.module.css";
import {useForm} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup'
import * as yup from 'yup'
import instance from "../../services/axios";

import RightContext2 from "../../components/RightContext2";

//validation
const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  surname: yup.string().required("Surname is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  address: yup.string().required("Address is required"),
  zipCode: yup
    .number()
    .typeError("Zip code must be a number")
    .required("Zip code is required"),
});

function Checkout() {
const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) =>{
    try{
      const response = await instance.post('/cart/checkout', data)
      console.log('success', response.data)
    }
    catch(error){
      console.log('Error sending form:', error)
    }
  }

  return (
    <>
      <Header rightContext={<RightContext2 />}></Header>
      <main className={styles.checkout_main}>
        <h3 >Checkout</h3>

        <form className={styles.checkout_form} onSubmit={handleSubmit(onSubmit)}>
          <aside className={styles.form_aside}>
          <h4>Order details</h4>
          <div className={styles.main_form}>
            <div className={styles.name_surname}>
               <input
                  type="text"
                  placeholder="Name"
                  {...register("name")}
                  className={errors.name ? styles.inputError : ""}
                />
                {errors.name && <p className={styles.errorText}>{errors.name.message}</p>}

                <input
                  type="text"
                  placeholder="Surname"
                  {...register("surname")}
                  className={errors.surname ? styles.inputError : ""}
                />
                {errors.surname && <p className={styles.errorText}>{errors.surname.message}</p>}
              </div>
               <input
                type="email"
                placeholder="Email"
                {...register("email")}
                className={errors.email ? styles.inputError : styles.email}
              />
              {errors.email && <p className={styles.errorText}>{errors.email.message}</p>}

              <div className={styles.adress_code}>
               <input
                  type="text"
                  placeholder="Address"
                  {...register("address")}
                  className={errors.address ? styles.inputError : ""}
                />
                {errors.address && <p className={styles.errorText}>{errors.address.message}</p>}

                <input
                  type="number"
                  placeholder="Zip code"
                  {...register("zipCode")}
                  className={errors.zipCode ? styles.inputError : ""}
                />
                {errors.zipCode && <p className={styles.errorText}>{errors.zipCode.message}</p>}
              </div>
          </div>
          </aside>
          <aside className={styles.chosen_products}>
          <div></div>
          <button type="submit">Pay</button>
          </aside>
        </form>
      </main>
    </>
  );
}

export default Checkout;
