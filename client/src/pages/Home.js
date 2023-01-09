import React from "react";
import ProductList from "../components/ProductList";
import CategoryMenu from "../components/CategoryMenu";

const Home = () => {
  return (
    <div>
      <div className="p-2 pt-4 h-full ">
        <CategoryMenu />
      </div>
      <div>
        <ProductList className="h-full w-fit" />
      </div>
    </div>
  );
};

export default Home;
