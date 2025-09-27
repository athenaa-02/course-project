import Header from "../../components/Header";
import { useEffect, useState } from "react";
import { getProductsInfo } from "../../services/auth";
import RightContext2 from "../../components/RightContext2";
import filterLogo from "../../assets/filterLogo.png";
import downArrow from "../../assets/downArrow.png";
import styles from "./Products.module.css";

function Products() {
  const [focused, setFocused] = useState({ from: false, to: false });
  const [products, setProducts] = useState([]);
  const [values, setValues] = useState({ from: "", to: "" });
  const [showFilter, setShowFilter] = useState(false);
  const [showSort, setShowSort] = useState(false);

  const handleFocus = (name) => setFocused({ ...focused, [name]: true });
  const handleBlur = (name) => setFocused({ ...focused, [name]: false });

  const handleShowFilter = () => {
    setShowFilter((prev) => !prev);
    setShowSort(false);
  };
  const handleShowSort = () => {
    setShowSort((prev) => !prev);
    setShowFilter(false);
  };
  // useEffect(() => {
  //   const fetchProducts = async () => {
  //     try {
  //       const response = await getProductsInfo();
  //       setProducts(response.data);
  //     } catch (error) {
  //       console.log("error fetching products:", error);
  //     }
  //   };
  //   fetchProducts();
  // }, []);
  // console.log(products);

  return (
    <>
      <Header rightContext={<RightContext2 />}></Header>
      <div className={styles.products_header}>
        <h3>Products</h3>
        <div className={styles.products_header_right}>
          <span>
            showing <span>1-10</span> of <span>100</span>results
          </span>
          <figure></figure>
          <div className={styles.filter_menu} onClick={handleShowFilter}>
              <img src={filterLogo} />
              <span>Filter</span>
            <div
              className={`${styles.filter_by_price} ${
                showFilter ? "" : styles.hidden
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              <p>Select price</p>
              <div className={styles.wrapper}>
                <input
                  type="number"
                  value={values.from}
                  onChange={(e) => {
                    const val = e.target.value;
                    if (val.length > 1 && val.startsWith("0")) return;
                    setValues({ ...values, from: val });
                  }}
                  onKeyDown={(e) => {
                    if (["e", "E", "+"].includes(e.key)) {
                      e.preventDefault();
                    }
                  }}
                  placeholder={focused["from"] ? "" : "From"}
                  onFocus={() => handleFocus("from")}
                  onBlur={() => handleBlur("from")}
                />
                <span
                  className={`asterisk from_asterisk ${
                    focused.from || values.from ? "hidden" : ""
                  }`}
                >
                  *
                </span>
                <input
                  type="number"
                  value={values.to}
                  onChange={(e) => {
                    const val = e.target.value;
                    if (val.length > 1 && val.startsWith("0")) return;
                    setValues({ ...values, to: val });
                  }}
                  onKeyDown={(e) => {
                    if (["e", "E", "+"].includes(e.key)) {
                      e.preventDefault();
                    }
                  }}
                  placeholder={focused["to"] ? "" : "To"}
                  onFocus={() => handleFocus("to")}
                  onBlur={() => handleBlur("to")}
                />
                <span
                  className={`asterisk to_asterisk ${
                    focused.to || values.to ? "hidden" : ""
                  }`}
                >
                  *
                </span>
              </div>
              <button className={styles.apply}>Apply</button>
            </div>
          </div>
          <div className={styles.sort_menu} onClick={handleShowSort}>
            <span>Sort by</span>
            <img src={downArrow} alt="" />

            <div
              className={`${styles.sort_dropdown} ${
                showSort ? "" : styles.hidden_sort
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              <p>Sort by</p>
              <button>New products first</button>
              <button>Price, low to high</button>
              <button>Price, high to low</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Products;
