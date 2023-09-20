import React, { useState, useEffect } from "react";
import { Row, Col, Form } from "react-bootstrap";
import { CardLayout, FloatCard } from "../../components/cards";
import ProductsTable from "../../components/tables/ProductsTable";
import LabelField from "../../components/fields/LabelField";
import CategoryOptions from "../../components/fields/CategoryOptions";
import GiftOptions from "../../components/fields/GiftOptions";
import ProductOptions from "../../components/fields/ProductOptions";
import { Pagination, Breadcrumb } from "../../components";
import Anchor from "../../components/elements/Anchor";
import PageLayout from "../../layouts/PageLayout";
import data from "../../data/master/productList.json";
import { Button, Input, Box, Label } from "../../components/elements";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faPlus } from "@fortawesome/free-solid-svg-icons";
import { Modal } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom";
import api from "../../api/baseUrl";
import "./productlist.css";

export default function ProductList() {
  const [show, setShow] = useState(false);
  const [searchByProduct, setSearchByProduct] = useState("");
  const [products, setProcducts] = useState();
  const [categories, setCategories] = useState();
  const [activeLink, setActiveLink] = useState(0);
  const [gift, setGift] = useState([
    { id: 1, value: "Yes" },
    { id: 0, value: "No" },
  ]);
  const [categoryFilter, setCategoryFilter] = useState();
  const [productFilter, setProductFilter] = useState();
  const [giftFilter, setGiftFilter] = useState();
  const [formData, setFormData] = useState({
    search_by_product: "true",
    search: "",
    product_code: "",
    md_product_category_id: "",
    gift: "",
  });

  useEffect(() => {
    fetchProducts();
  }, []);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSearchSubmit = async () => {
    try {
      const updatedFormData = {
        search_by_product: "true",
        search: searchByProduct,
        product_code: productFilter,
        md_product_category_id: categoryFilter,
        gift: giftFilter,
      };

      console.log(updatedFormData, "updatedFormData");

      let response;
      response = await api.post(`/product_search/`, updatedFormData);
      //   setEditId(null);
      //   console.log(updatedFormData);
      //   toast.success("Tax Category edited successfully", {
      //     autoClose: true,
      //   });
      // } else {
      //   // Create request
      //   response = await api.post("/tax_category_store", updatedFormData);
      //   toast.success("Tax Category created successfully", {
      //     autoClose: true,
      //   });
      // }
    } catch (error) {
      console.error("Error creating/updating Tax Category", error);
    }
  };

  let newObj = {};

  const updateCategoryFilter = (categoryid) => {
    console.log("updateCategoryFilter", categoryid);
    setCategoryFilter(categoryid);
  };

  const updateProductFilter = (product_code) => {
    debugger;
    // newObj = { ...newObj, ...searchFields };
    console.log("updateProductFilter", product_code);
    let filterData = formData;
    filterData[product_code] = product_code;
    setFormData(filterData);
    setProductFilter(product_code);
  };
  const updateGiftFilter = (giftid) => {
    console.log("updateGiftFilter", giftid);
    let filterData = formData;
    filterData[gift] = giftid;
    setFormData(filterData);
    setGiftFilter(giftid);
  };

  const handleNavLinkClick = (index) => {
    console.log(index);
    setActiveLink(index); // Update the active link when it's clicked
  };

  const fetchProducts = async () => {
    try {
      const res = await api.get("/product");
      const respsone = await api.get("/product_category");

      setProcducts(res.data.products.data);

      setCategories(respsone.data.product_category);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <PageLayout>
      <Row>
        <Col xl={12}>
          <CardLayout>
            <Breadcrumb title={data?.pageTitle}>
              {data?.breadcrumb.map((item, index) => (
                <li key={index} className="mc-breadcrumb-item">
                  {item.path ? (
                    <Anchor className="mc-breadcrumb-link" href={item.path}>
                      {item.text}
                    </Anchor>
                  ) : (
                    item.text
                  )}
                </li>
              ))}
            </Breadcrumb>
          </CardLayout>
        </Col>
        <Col xl={12}>
          <CardLayout>
            <Row>
              <Col
                xs={12}
                sm={12}
                md={3}
                lg={12}
                className="main-category d-flex"
              >
                {" "}
                <Nav>
                  {data?.float.map((item, index) => (
                    <Nav.Item key={index} className="me-2">
                      <Nav.Link
                        onClick={() => handleNavLinkClick(index)}
                        className={`custom-link ${
                          activeLink === index ? "active-link" : "inactive-link"
                        }`}
                      >
                        {item.title}
                        {item.title === "All" && ( // Conditionally render the count badge for the "All" tab
                          <span className="count-badge">123</span>
                        )}
                      </Nav.Link>
                    </Nav.Item>
                  ))}
                </Nav>
              </Col>
            </Row>
          </CardLayout>
        </Col>

        <Col xl={12}>
          <CardLayout>
            <Row>
              <Col xs={12} sm={12} md={3} lg={3}>
                <div style={{ position: "relative" }}>
                  <Form.Control
                    type="search"
                    placeholder="Search"
                    className="search-pl"
                    value={searchByProduct}
                    onChange={(e) => setSearchByProduct(e.target.value)}
                  />
                  <span
                    style={{
                      position: "absolute",
                      top: "50%",
                      right: "10px",
                      transform: "translateY(-50%)",
                    }}
                  >
                    <button onClick={() => handleSearchSubmit()}>
                      <FontAwesomeIcon icon={faSearch} />
                    </button>
                  </span>
                </div>
              </Col>
              <Col md={7}>
                <Row className="product-filter-pl">
                  <Col xs={12} sm={6} md={2} lg={2} className="col-2-filters">
                    <ProductOptions
                      option={products}
                      title={"Products"}
                      labelDir="label-col"
                      fieldSize="field-select  w-100 h-md"
                      callback={updateProductFilter}
                    />
                  </Col>
                  <Col xs={12} sm={6} md={2} lg={2} className="col-2-filters">
                    <CategoryOptions
                      option={categories}
                      title={"Category"}
                      labelDir="label-col"
                      fieldSize="field-select  w-100 h-md"
                      callback={updateCategoryFilter}
                    />
                  </Col>
                  <Col xs={12} sm={6} md={2} lg={2} className="col-2-filters">
                    <GiftOptions
                      option={gift}
                      title={"Gift"}
                      labelDir="label-col"
                      fieldSize="field-select  w-100 h-md"
                      callback={updateGiftFilter}
                    />
                  </Col>
                </Row>
              </Col>
              <Col sm={12} md={2} lg={2}>
                <Button className="add-product-btn-pl" onClick={handleShow}>
                  + Create
                </Button>
              </Col>
              <Modal
                show={show}
                onHide={handleClose}
                className="manage-m-dialog-box"
              >
                <Modal.Header closeButton>
                  <Modal.Title>
                    Select the type of product that you want to create
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Box>
                    <Row>
                      <Col md={12}>
                        <Row>
                          <Col md={2} className="col-2">
                            <Box className={"faDish-img"}>
                              <img src="/images/product/pizza.jpg" alt="img" />
                            </Box>
                          </Col>
                          <Col md={8}>
                            <h6>Dish</h6>
                            <p>Creating of Product Conating Ingredients</p>
                          </Col>
                          <Col md={2} className="col-2">
                            <Link to="/constructure-dish">
                              <FontAwesomeIcon
                                className="faPlus"
                                icon={faPlus}
                              />
                            </Link>
                          </Col>
                        </Row>
                      </Col>
                      <Col md={12}>
                        <Row>
                          <Col md={2} className="col-2">
                            <Box className={"faDish-img"}>
                              <img src="/images/product/drink.jpg" alt="img" />
                            </Box>
                          </Col>
                          <Col md={8}>
                            <h6>Goods</h6>

                            <p>Good Create Description</p>
                          </Col>
                          <Col md={2} className="col-2">
                            <Link to="/constructure-product">
                              <FontAwesomeIcon
                                className="faPlus"
                                icon={faPlus}
                              />
                            </Link>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </Box>
                </Modal.Body>
                <Modal.Footer></Modal.Footer>
              </Modal>
              <Col xl={12}>
                <ProductsTable
                // thead={data?.product.thead}
                // tbody={data?.product.tbody}
                />
                <Pagination />
              </Col>
            </Row>
          </CardLayout>
        </Col>
      </Row>
    </PageLayout>
  );
}
