import React from "react";
import ProductList from "../components/ProductList";
import CategoryMenu from "../components/CategoryMenu";

const Home = () => {
  return (
    <div>
      <div className="pb-6 h-full ">
        <CategoryMenu />
      </div>
      <div>
        <ProductList />
      </div>
    </div>
  );
};

export default Home;
