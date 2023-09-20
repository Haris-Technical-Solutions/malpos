import React, { useState } from "react";
import { CardLayout } from "../../components/cards";
import PageLayout from "../../layouts/PageLayout";
import { Col, Row, Form, Button, FormLabel } from "react-bootstrap";
import { Box } from "../../components/elements";
import { LabelField } from "../../components/fields";
import data from "../../data/master/categoriesList.json";
import CategoryTable from "../../components/tables/CategoryTable";
import ModifierTable from "../../components/tables/ModifierTable";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faPlus } from "@fortawesome/free-solid-svg-icons";
import { Modal } from "react-bootstrap";
import IconSearchBar from "../../components/elements/IconSearchBar";
export default function ManageModifier() {
  const [showModal, setShowModal] = useState(false);
  const [minShow, setMinShow] = useState(false);
  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleMinShow = () => {
    setMinShow(true);
  };

  const handleMinHide = () => {
    setMinShow(false);
  };
  return (
    <div>
      <PageLayout>
        <Row>
          <Col md={12}>
            <CardLayout>
              <Row>
                <Col md={12}>
                  <h3>Manage modifier</h3>
                </Col>
              </Row>
            </CardLayout>
          </Col>
          <Col md={12}>
            <CardLayout>
              <Row>
                <Col md={9} lg={10}>
                  <Row>
                    <Col md={4} lg={3}>
                     <IconSearchBar placeholder={'Search'}/>
                    </Col>
                  </Row>
                </Col>
                <Col md={3} lg={2}>
                  <Row>
                    <Col md={12}>
                      {/* <Box className="pm-create-btn w-100">
                        <button onClick={handleShowModal}>
                          <FontAwesomeIcon
                            icon={faPlus}
                            style={{ marginRight: "5px" }}
                          />
                          Create
                        </button>
                      </Box> */}
                      <Col md={6} sm={12}>
             
                      {" "}
                      <button className="pm-create-btn w-100">
                        <FontAwesomeIcon icon={faPlus} /> Create
                      </button>
                    
                  </Col>
                      <Modal show={showModal} onHide={handleCloseModal} top>
                        <Modal.Header closeButton>
                          <Modal.Title
                            style={{ fontSize: "13px", marginBottom: "0px" }}
                          >
                            Create new set
                          </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                          <Box className="modifier-main-popup">
                            <LabelField
                              type="text"
                              placeholder=" Type name"
                              fieldSize="w-100 h-md f-cus-13"
                            />
                            <p style={{ marginTop: "10px" }}>
                              How many modifiers can be chosen at the same time:
                            </p>
                            <br />
                            <Form.Check
                              label="One"
                              type="radio"
                              name="group1"
                              id="option1"
                              onClick={handleMinHide}
                              defaultChecked
                            />

                            <span className="modifier-textf-p">
                              Choose one option from several. For example, pizza
                              diameter.
                            </span>

                            <Form.Check
                              label="Several"
                              type="radio"
                              name="group1"
                              id="option1"
                              onClick={handleMinShow}
                            />

                            <span className="modifier-textf-p">
                              Any number in a given range. For example,
                              additives to pizza.
                            </span>
                            {minShow ? (
                              <div>
                                <Col md={12}>
                                  <Row>
                                    <Col md={6}>
                                      <FormLabel className="f-cus-11">
                                        Set minimum
                                      </FormLabel>

                                      <LabelField
                                        type="number"
                                        placeholder="0"
                                        fieldSize="w-100 h-md f-cus-13"
                                      />
                                    </Col>
                                    <Col md={6}>
                                      <FormLabel className="f-cus-11">
                                        Set maximum
                                      </FormLabel>
                                      <LabelField
                                        placeholder="0"
                                        type="number"
                                        fieldSize="w-100 h-md f-cus-13"
                                      />
                                    </Col>
                                  </Row>
                                </Col>
                              </div>
                            ) : (
                              ""
                            )}
                          </Box>
                        </Modal.Body>
                        <Modal.Footer>
                          <Button onClick={handleCloseModal}>Create</Button>
                        </Modal.Footer>
                      </Modal>
                    </Col>
                  </Row>
                </Col>
              </Row>
              <Col md={12}>
                <Row>
                  <Col md={12}>
                    <Box className="table-menuCat">
                      <Col md={12}>
                        <ModifierTable
                          thead={data?.menuCategory.thead}
                          tbody={data?.menuCategory.tbody}
                        />
                      </Col>
                    </Box>
                  </Col>
                </Row>
              </Col>
            </CardLayout>
          </Col>
        </Row>
      </PageLayout>
    </div>
  );
}
