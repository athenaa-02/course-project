import Header from "../../components/Header";
import { useEffect, useState } from "react";
import RightContext2 from "../../components/RightContext2";
import filterLogo from "../../assets/filterLogo.png";
import downArrow from "../../assets/downArrow.png";
import styles from "./Products.module.css";
import instance from "../../services/axios";
import FilterChips from "../../components/FilterChips";
import PaginatedItems from "../../components/pagination.jsx";

function Products() {
  const [focused, setFocused] = useState({ from: false, to: false });
  const [products, setProducts] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const [showSort, setShowSort] = useState(false);
  const [values, setValues] = useState({ from: "", to: "" });
  const [sortType, setSortType] = useState(null);
  const [generalData, setGeneralData] = useState({});

  const [activeFilter, setActiveFilter] = useState(false);
  const [activeSort, setActiveSort] = useState(false);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchProducts = async () => {
    try {
      const params = new URLSearchParams();

      if (sortType === "newest") params.append("sort", "created_at");
      if (sortType === "priceLowToHigh") params.append("sort", "price");
      if (sortType === "priceHighToLow") params.append("sort", "-price");

      params.append("filter[price_from]", values.from || "0");
      params.append("filter[price_to]", values.to || Number.MAX_SAFE_INTEGER);

      params.append("page", page);

      const url = `/products?${params.toString()}`;

      const response = await instance.get(url);
      setProducts(response.data.data);
      setGeneralData(response.data);
      setTotalPages(response.data.meta.last_page);
      console.log("products fetched:", response.data);
    } catch (error) {
      console.log("error fetching products:", error);
    }
  };

  const clearFilters = (type) => {
    if (type === "filter") {
      setValues({ from: "", to: "" });
      setActiveFilter(null);
    }
    if (type === "sort") {
      setSortType(null);
      setActiveSort(null);
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

  useEffect(() => {
    fetchProducts();
  }, []);
  useEffect(() => {
    fetchProducts();
  }, [sortType, page]);

  return (
    <>
      <Header rightContext={<RightContext2 />}></Header>
      <div className={styles.products_header}>
        <h3>Products</h3>
        <div className={styles.products_header_right}>
          <span>
            showing{" "}
            <span>{`${generalData.meta.current_page}-${generalData.meta.last_page}`}</span>{" "}
            of <span>{generalData.meta.total}</span> results
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
                    setShowFilter(false);

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
                  setShowSort(false);
                }}
              >
                New products first
              </button>
              <button
                onClick={() => {
                  setSortType("priceLowToHigh");
                  setActiveSort("Price, low to high");
                  setShowSort(false);
                }}
              >
                Price, low to high
              </button>
              <button
                onClick={() => {
                  setSortType("priceHighToLow");
                  setActiveSort("Price, high to low");
                  setShowSort(false);
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
        activeSort={activeSort}
        clearFilters={clearFilters}
      ></FilterChips>

      {/* products */}
      <main className={styles.products_main}>
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product.id} className={styles.product_card}>
              <img src={product.cover_image} />
              <h4>{product.name}</h4>
              <p>$ {product.price}</p>
            </div>
          ))
        ) : (
          <p>No products found</p>
        )}
        <PaginatedItems currentPage={setPage} totalPages={totalPages} />
      </main>
    </>
  );
}

export default Products;
