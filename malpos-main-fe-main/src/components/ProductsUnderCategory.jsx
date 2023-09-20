import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import ImageCards from "../components/cards/ImageCards";

import api from "../api/baseUrl";

export default function ProductsUnderCategory({
  categoryId,
  onProductSelected,
}) {
  const [products, setProducts] = useState([]);

  const getCategoryProducts = async () => {
    const id = categoryId;
    try {
      const response = await api.get(`/product/${id}`);
      setProducts(response.data.product);
      console.log(response);
    } catch (error) {}
  };

  const getPrice = (id) => {
    const selectedNewProduct = products.find(
      (product) => product.md_product_id === id
    );
    onProductSelected(selectedNewProduct);
  };

  useEffect(() => {
    getCategoryProducts();
  }, []);

  return (
    <Row>
      <Col sm={12}>
        <Row className={"product-img-card justify-content-center"}>
          {products &&
            products.length > 0 &&
            products.map((product) => (
              <div
                className={"imgCard"}
                key={product.md_product_id}
                onClick={() => getPrice(product.md_product_id)}
              >
                <ImageCards
                  Imgsrc={product.product_image}
                  alt={product.product_name}
                  productTitle={product.product_name}
                />
              </div>
            ))}
        </Row>
      </Col>
    </Row>
  );
}
