import Header from "../../components/Header";
import LogoutButton from "../../components/LogoutButton";

function Product() {
  const headerPart = (
    <div>
      <div>cart</div>
      <div>avatar</div>

      <div>
        <LogoutButton></LogoutButton>
      </div>
    </div>
  );

  return (
    <>
      <Header rightContext={headerPart}></Header>
    </>
  );
}

export default Product;
