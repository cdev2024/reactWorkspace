import React from "react";
import { useParams } from "react-router-dom";

const Product = () => {
  const { productId } = useParams();

  return (
    <div>
      <h2>{productId}번 상품의 상품 페이지입니다.</h2>
    </div>
  );
};

export default Product;
