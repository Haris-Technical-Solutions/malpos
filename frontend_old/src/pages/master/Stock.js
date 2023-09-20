import React, { useState } from "react";
import { Row, Col, Form } from "react-bootstrap";
import { CardLayout, FloatCard } from "../../components/cards";
import ProductsTable from "../../components/tables/ProductsTable";
import LabelField from "../../components/fields/LabelField";
import { Pagination, Breadcrumb } from "../../components";
import Anchor from "../../components/elements/Anchor";
import PageLayout from "../../layouts/PageLayout";
import data from "../../data/master/productList.json";
import { Button, Input, Box, Label } from "../../components/elements";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faAngleDown, faPlus } from "@fortawesome/free-solid-svg-icons";
import { Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Table } from "react-bootstrap";

export default function Stocks() {
  const [sortOrder, setSortOrder] = useState("asc");

  const [state, setState] = useState({
    showOption: false,
    productOpen: false,
    storageOpen: false,
    accountOpen: false,
    typeOpen: false,
    categoryOpen: false,
  });
  const handleStateChange = (key) => {
    setState((prevState) => {
      const newState = {};
      Object.keys(prevState).forEach((k) => {
        newState[k] = k === key ? !prevState[k] : false;
      });
      return newState;
    });
  };
  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };
  return (
    <PageLayout>
      <Row>
        <Col xl={12}>
          <CardLayout>
            <h5>Stocks 38</h5>
          </CardLayout>
        </Col>

        <Col md={12}>
          <CardLayout>
            <Box className="">
              <Box className="receipt-tab">
                <Col md={12}>
                  <Box className="filter-box">
                    <Box className="filter-box-item">
                      <div onClick={() => handleStateChange("productOpen")}>
                        <span className="filter-box-span">Product </span>
                        <span className="filter-box-span-caret">
                          <FontAwesomeIcon icon={faAngleDown} />{" "}
                        </span>
                      </div>
                      {state.productOpen ? (
                        <Box className="filter-box-select-opt">
                          <Box className="filter-box-select-opt-box">
                            <Box className="filter-box-search">
                              <div
                                style={{
                                  position: "relative",
                                  height: "34px",
                                }}
                              >
                                <Form.Control
                                  type="search"
                                  placeholder="Search"
                                  className="search-pl"
                                />
                                <span
                                  style={{
                                    position: "absolute",
                                    top: "50%",
                                    right: "10px",
                                    transform: "translateY(-50%)",
                                    fontSize: "11px",
                                  }}
                                >
                                  <button type="submit">
                                    <FontAwesomeIcon icon={faSearch} />
                                  </button>
                                </span>
                              </div>
                            </Box>
                            <Box className="filter-box-checkbox-main">
                              <Box className="filter-box-checkbox-div">
                                <Box className="filter-box-checkbox">
                                  <Form.Check
                                    type="checkbox"
                                    label="3rd Planet"
                                  />
                                </Box>
                              </Box>
                              <Box className="filter-box-checkbox-div">
                                <Box className="filter-box-checkbox">
                                  <Form.Check
                                    type="checkbox"
                                    label="Ethiopoa"
                                  />
                                </Box>
                              </Box>
                              <Box className="filter-box-checkbox-div">
                                <Box className="filter-box-checkbox">
                                  <Form.Check type="checkbox" label="Kenya" />
                                </Box>
                              </Box>
                              <Box className="filter-box-checkbox-div">
                                <Box className="filter-box-checkbox">
                                  <Form.Check
                                    type="checkbox"
                                    label="Familia Chacon"
                                  />
                                </Box>
                              </Box>
                              <Box className="filter-box-checkbox-div">
                                <Box className="filter-box-checkbox">
                                  <Form.Check type="checkbox" label="Kenya" />
                                </Box>
                              </Box>
                            </Box>
                          </Box>
                        </Box>
                      ) : (
                        ""
                      )}
                    </Box>
                  </Box>
                  <Box className="filter-box">
                    <Box className="filter-box-item">
                      <div onClick={() => handleStateChange("typeOpen")}>
                        <span className="filter-box-span">Type </span>
                        <span className="filter-box-span-caret">
                          <FontAwesomeIcon icon={faAngleDown} />{" "}
                        </span>
                      </div>
                      {state.typeOpen ? (
                        <Box className="filter-box-select-opt">
                          <Box className="filter-box-select-opt-box">
                            <Box className="filter-box-search">
                              <div
                                style={{
                                  position: "relative",
                                  height: "34px",
                                }}
                              >
                                <Form.Control
                                  type="search"
                                  placeholder="Search"
                                  className="search-pl"
                                />
                                <span
                                  style={{
                                    position: "absolute",
                                    top: "50%",
                                    right: "10px",
                                    transform: "translateY(-50%)",
                                    fontSize: "11px",
                                  }}
                                >
                                  <button type="submit">
                                    <FontAwesomeIcon icon={faSearch} />
                                  </button>
                                </span>
                              </div>
                            </Box>
                            <Box className="filter-box-checkbox-main">
                              <Box className="filter-box-checkbox-div">
                                <Box className="filter-box-checkbox">
                                  <Form.Check type="checkbox" label="Goods" />
                                </Box>
                              </Box>
                              <Box className="filter-box-checkbox-div">
                                <Box className="filter-box-checkbox">
                                  <Form.Check
                                    type="checkbox"
                                    label="Preparation"
                                  />
                                </Box>
                              </Box>
                              <Box className="filter-box-checkbox-div">
                                <Box className="filter-box-checkbox">
                                  <Form.Check type="checkbox" label="Dish" />
                                </Box>
                              </Box>
                            </Box>
                          </Box>
                        </Box>
                      ) : (
                        ""
                      )}
                    </Box>
                  </Box>
                  <Box className="filter-box">
                    <Box className="filter-box-item">
                      <div onClick={() => handleStateChange("categoryOpen")}>
                        <span className="filter-box-span">Category</span>
                        <span className="filter-box-span-caret">
                          <FontAwesomeIcon icon={faAngleDown} />{" "}
                        </span>
                      </div>
                      {state.categoryOpen ? (
                        <Box className="filter-box-select-opt filter-box-select-opt-status">
                          <Box className="filter-box-select-opt-box">
                            <Box className="filter-box-checkbox-main">
                              <Box className="filter-box-checkbox-div">
                                <Box className="filter-box-search">
                                  <div
                                    style={{
                                      position: "relative",
                                      height: "34px",
                                    }}
                                  >
                                    <Form.Control
                                      type="search"
                                      placeholder="Search"
                                      className="search-pl"
                                    />
                                    <span
                                      style={{
                                        position: "absolute",
                                        top: "50%",
                                        right: "10px",
                                        transform: "translateY(-50%)",
                                        fontSize: "11px",
                                      }}
                                    >
                                      <button type="submit">
                                        <FontAwesomeIcon icon={faSearch} />
                                      </button>
                                    </span>
                                  </div>
                                </Box>
                                <Box className="filter-box-checkbox">
                                  <Form.Check
                                    type="checkbox"
                                    label="Espresso"
                                  />
                                </Box>
                              </Box>
                              <Box className="filter-box-checkbox-div">
                                <Box className="filter-box-checkbox">
                                  <Form.Check
                                    type="checkbox"
                                    label="Organic Tea"
                                  />
                                </Box>
                              </Box>
                              <Box className="filter-box-checkbox-div">
                                <Box className="filter-box-checkbox">
                                  <Form.Check
                                    type="checkbox"
                                    label="Iced Drinks"
                                  />
                                </Box>
                              </Box>
                              <Box className="filter-box-checkbox-div">
                                <Box className="filter-box-checkbox">
                                  <Form.Check type="checkbox" label="Salad" />
                                </Box>
                              </Box>
                            </Box>
                          </Box>
                        </Box>
                      ) : (
                        ""
                      )}
                    </Box>
                  </Box>
                  {/*  */}

                  {/*  */}
                  {/*  */}
                  {/*  */}
                  <Box className="filter-box">
                    <Box className="filter-box-item">
                      <div onClick={() => handleStateChange("accountOpen")}>
                        <span className="filter-box-span">
                          Accounting Category
                        </span>
                        <span className="filter-box-span-caret">
                          <FontAwesomeIcon icon={faAngleDown} />{" "}
                        </span>
                      </div>
                      {state.accountOpen ? (
                        <Box className="filter-box-select-opt">
                          <Box className="filter-box-select-opt-box">
                            <Box className="filter-box-search">
                              <div
                                style={{
                                  position: "relative",
                                  height: "34px",
                                }}
                              >
                                <Form.Control
                                  type="search"
                                  placeholder="Search"
                                  className="search-pl"
                                />
                                <span
                                  style={{
                                    position: "absolute",
                                    top: "50%",
                                    right: "10px",
                                    transform: "translateY(-50%)",
                                    fontSize: "11px",
                                  }}
                                >
                                  <button type="submit">
                                    <FontAwesomeIcon icon={faSearch} />
                                  </button>
                                </span>
                              </div>
                            </Box>
                            <Box className="filter-box-checkbox-main">
                              <Box className="filter-box-checkbox-div">
                                <Box className="filter-box-checkbox">
                                  <Form.Check type="checkbox" label="Juices" />
                                </Box>
                              </Box>
                              <Box className="filter-box-checkbox-div">
                                <Box className="filter-box-checkbox">
                                  <Form.Check type="checkbox" label="Mul" />
                                </Box>
                              </Box>
                              <Box className="filter-box-checkbox-div">
                                <Box className="filter-box-checkbox">
                                  <Form.Check
                                    type="checkbox"
                                    label="2023 Sales"
                                  />
                                </Box>
                              </Box>
                              <Box className="filter-box-checkbox-div">
                                <Box className="filter-box-checkbox">
                                  <Form.Check
                                    type="checkbox"
                                    label="Without category"
                                  />
                                </Box>
                              </Box>
                            </Box>
                          </Box>
                        </Box>
                      ) : (
                        ""
                      )}
                    </Box>
                  </Box>
                  <Box className="filter-box">
                    <Box className="filter-box-item">
                      <div onClick={() => handleStateChange("storageOpen")}>
                        <span className="filter-box-span">Storage</span>
                        <span className="filter-box-span-caret">
                          <FontAwesomeIcon icon={faAngleDown} />{" "}
                        </span>
                      </div>
                      {state.storageOpen ? (
                        <Box className="filter-box-select-opt">
                          <Box className="filter-box-select-opt-box">
                            <Box className="filter-box-search">
                              <div
                                style={{
                                  position: "relative",
                                  height: "34px",
                                }}
                              >
                                <Form.Control
                                  type="search"
                                  placeholder="Search"
                                  className="search-pl"
                                />
                                <span
                                  style={{
                                    position: "absolute",
                                    top: "50%",
                                    right: "10px",
                                    transform: "translateY(-50%)",
                                    fontSize: "11px",
                                  }}
                                >
                                  <button type="submit">
                                    <FontAwesomeIcon icon={faSearch} />
                                  </button>
                                </span>
                              </div>
                            </Box>
                            <Box className="filter-box-checkbox-main">
                              <Box className="filter-box-checkbox-div">
                                <Box className="filter-box-checkbox">
                                  <Form.Check type="checkbox" label="Return" />
                                </Box>
                              </Box>
                              <Box className="filter-box-checkbox-div">
                                <Box className="filter-box-checkbox">
                                  <Form.Check
                                    type="checkbox"
                                    label="Bar Store"
                                  />
                                </Box>
                              </Box>
                              <Box className="filter-box-checkbox-div">
                                <Box className="filter-box-checkbox">
                                  <Form.Check
                                    type="checkbox"
                                    label="Back Store"
                                  />
                                </Box>
                              </Box>
                              <Box className="filter-box-checkbox-div">
                                <Box className="filter-box-checkbox">
                                  <Form.Check
                                    type="checkbox"
                                    label="Drinks Store"
                                  />
                                </Box>
                              </Box>
                            </Box>
                          </Box>
                        </Box>
                      ) : (
                        ""
                      )}
                    </Box>
                  </Box>
                  <Button className="add-product-btn-pl">
                    <FontAwesomeIcon icon={faPlus}/> Create Supply
                  </Button>
                </Col>
                {/* <Col md={2}> */}
                {/* </Col> */}
              </Box>
            </Box>
          </CardLayout>
        </Col>
        <Col md={12}>
          <CardLayout>
            <Row>
              <Col md={12}>
                <Box className="payment-sale-table-wrap">
                  <Table className="sale-m-table" responsive>
                    <thead className="mc-table-head dark">
                      <tr>
                        <th>
                          ID
                          <button
                            className="sorting-icon"
                            onClick={toggleSortOrder}
                          >
                            {sortOrder === "asc" ? "▲" : "▼"}
                          </button>
                        </th>
                        <th className="th-w220">
                          Name
                          <button
                            className="sorting-icon"
                            onClick={toggleSortOrder}
                          >
                            {sortOrder === "asc" ? "▲" : "▼"}
                          </button>
                        </th>
                        <th>
                          Qty
                          <button
                            className="sorting-icon"
                            onClick={toggleSortOrder}
                          >
                            {sortOrder === "asc" ? "▲" : "▼"}
                          </button>
                        </th>
                        <th>
                          Total Cost
                          <button
                            className="sorting-icon"
                            onClick={toggleSortOrder}
                          >
                            {sortOrder === "asc" ? "▲" : "▼"}
                          </button>
                        </th>
                        <th> Average</th>
                        <th>
                          {" "}
                          Type
                          <button
                            className="sorting-icon"
                            onClick={toggleSortOrder}
                          >
                            {sortOrder === "asc" ? "▲" : "▼"}
                          </button>
                        </th>
                        <th>
                          {" "}
                          Category
                          <button
                            className="sorting-icon"
                            onClick={toggleSortOrder}
                          >
                            {sortOrder === "asc" ? "▲" : "▼"}
                          </button>
                        </th>
                        <th> Storage</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="">1</td>
                        <td className="td-w220"><Link className="link" to={'/stocks-details'}>Egg</Link></td>
                        <td>200 pcs</td>
                        <td>16000 SAR</td>
                        <td>0.0080 SAR </td>
                        <td>Ingredient</td>
                        <td>POUTRY</td>
                        <td>Return</td>
                      </tr>
                    </tbody>
                  </Table>
                </Box>
                <Pagination />
              </Col>
            </Row>
          </CardLayout>
        </Col>
      </Row>
    </PageLayout>
  );
}
