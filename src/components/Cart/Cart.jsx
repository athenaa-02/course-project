import styles from './Cart.module.css'
import { useEffect, useState } from 'react';

import { getCart, deleteCartItem, addToCart } from '../../services/cartService';

function Cart({isOpen, setIsOpen}) {
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

  if (!isOpen) return null;

  return (
   <>
         <div className={styles.overlay} onClick={() => setIsOpen(false)}></div>

      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
   </>
  )
}

export default Cart