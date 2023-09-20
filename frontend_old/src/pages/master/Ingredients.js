import React from "react";
import { Row, Col, Form } from "react-bootstrap";
import { CardLayout, FloatCard } from "../../components/cards";
import LabelField from "../../components/fields/LabelField";
import { Pagination, Breadcrumb } from "../../components";
import PageLayout from "../../layouts/PageLayout";
import data from "../../data/master/ingredients.json";

import IngredientsTable from "../../components/tables/IngredientsTable";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faSearch } from "@fortawesome/free-solid-svg-icons";
export default function Ingredients() {
  return (
    <PageLayout>
      <Row>
        <Col xl={12}>
          <CardLayout>
            <Breadcrumb title="Ingredient"></Breadcrumb>
          </CardLayout>
        </Col>

        <Col xl={12}>
          <CardLayout>
            <Row className="justify-content-between">
              <Col xs={12} sm={12} md={2} lg={2} xl={2}>
                <div style={{ position: "relative" }}>
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
                    }}
                  >
                    <button type="submit">
                      <FontAwesomeIcon icon={faSearch} />
                    </button>
                  </span>
                </div>
              </Col>
              <Col md={7}>
                <Row className="product-filter-pl">
                  {data?.ingredients.filter.slice(0, 4).map((item, index) => (
                    <Col
                      xs={12}
                      sm={6}
                      md={2}
                      lg={3}
                      xl={3}
                      key={index}
                      className="col-2-filters"
                      fieldSize="field-select  "
                    >
                      <LabelField
                        type={item.type}
                        option={item.option}
                        placeholder={item.placeholder}
                        labelDir="label-col"
                        fieldSize="field-select  w-sm h-md "
                      />
                    </Col>
                  ))}
                </Row>
              </Col>
              <Col
                xs={12}
                sm={12}
                md={2}
                lg={2}
                xl={2}
                className="ingredients-left-btns"
              >

              </Col>
              <Row>
                  {data?.ingredients.filter.slice(-1).map((item, index) => (
                    <Col md={10} sm={12} className="w-60">
                      <LabelField
                        type={item.type}
                        option={item.option}
                        placeholder={item.placeholder}
                        labelDir="label-col"
                        fieldSize="field-select w-200 h-md"
                      />
                    </Col>
                  ))}

                  <Col md={2} sm={12} className="ingre-btn-w">
                    <div>
                      {/* <button className="add-product-btn-pre">
                        + Bulk create
                      </button> */}
                      <button className="pm-create-btn w-100"><FontAwesomeIcon icon={faPlus}/> Create</button>
                    </div>
                  </Col>
                </Row>

              <Col xl={12}>
                <IngredientsTable
                  thead={data?.ingredients.thead}
                  tbody={data?.ingredients.tbody}
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
