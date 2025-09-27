import Header from "../../components/Header";
import { useEffect, useState } from "react";
import RightContext2 from "../../components/RightContext2";
import filterLogo from "../../assets/filterLogo.png";
import downArrow from "../../assets/downArrow.png";
import styles from "./Products.module.css";
import instance from "../../services/axios";
import FilterChips from "../../components/FilterChips";

function Products() {
  const [focused, setFocused] = useState({ from: false, to: false });
  const [products, setProducts] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const [showSort, setShowSort] = useState(false);
  const [values, setValues] = useState({ from: "", to: "" });
  const [sortType, setSortType] = useState(null);

  const [activeFilter, setActiveFilter] = useState(false);
  const [activeSort, setActiveSort] = useState(false);

  const clearFilters = (type) => {
    if (type === "filter") {
      setValues({ from: "", to: "" });
    }
    if (type === "sort") {
      setSortType(null);
    }
    fetchProducts();
  };

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

  const fetchProducts = async () => {
    try {
      // let url = "/products?";
      const params = new URLSearchParams();

      if (sortType === "newest") params.append("sort", "created_at");
      if (sortType === "priceLowToHigh") params.append("sort", "price");
      if (sortType === "priceHighToLow") params.append("sort", "-price");

      if (values.from) {
        params.append("filter[price_from]", values.from);
      } else {
        params.append("filter[price_from]", "0");
      }
      if (values.to) {
        params.append("filter[price_to]", values.to);
      } else {
        params.append("filter[price_to]", Number.MAX_SAFE_INTEGER);
      }

      const url = `/products?${params.toString()}`;

      console.log("fetching products with url:", url);

      const response = await instance.get(url);
      setProducts(response.data.data);
      console.log("products fetched:", products);
    } catch (error) {
      console.log("error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
      <Header rightContext={<RightContext2 />}></Header>
      <div className={styles.products_header}>
        <h3>Products</h3>
        <div className={styles.products_header_right}>
          <span>
            showing <span>1-10</span> of <span>100</span> results
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
              <button
                className={styles.apply}
                onClick={() => {
                  if (values.from || values.to) {
                    setActiveFilter(
                      ` price: ${values.from || 0}-${values.to || "∞"}`
                    );
                    fetchProducts();
                  }
                }}
              >
                Apply
              </button>
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
              <button
                onClick={() => {
                  setSortType("newest");
                  setActiveSort("New products first");
                  fetchProducts();
                }}
              >
                New products first
              </button>
              <button
                onClick={() => {
                  setSortType("priceLowToHigh");
                  setActiveSort("Price, low to high");
                  fetchProducts();
                }}
              >
                Price, low to high
              </button>
              <button
                onClick={() => {
                  setSortType("priceHighToLow");
                  setActiveSort("Price, high to low");
                  fetchProducts();
                }}
              >
                Price, high to low
              </button>
            </div>
          </div>
        </div>
      </div>

      <FilterChips
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
        activeSort={activeSort}
        setActiveSort={setActiveSort}
        clearFilters={clearFilters}
      ></FilterChips>
    </>
  );
}

export default Products;
