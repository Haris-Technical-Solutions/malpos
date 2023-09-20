import React, { useState } from "react";
import { Col, Row, Button, Modal } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { CardLayout } from "../../components/cards";
import { Box, Text, Form } from "../../components/elements";
import { faCheck, faDeleteLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LabelFieldT from "../../components/fields/LabelFieldT";

export default function OrderLineTable1() {
  const [inputValue, setInputValue] = useState("");
  const [tableNumber, setTableNumber] = useState(1)
  const [showModel, setShow] = useState(false);

  const navigate = useNavigate()

  const handleGuestSelectModal = () => {
    console.log("inputValue", inputValue)
    setShow(false);
    setInputValue("");
    navigate("/my-products", {
      state: {
        service: "In-Store",
        numberOfGuest: inputValue,
        tableNumber: tableNumber,

      }
    }
    )
  };

  const handleShow = (table) => { setTableNumber(table); setShow(true) };
  const handleClose = () => setShow(false)

  const handleClick = (value) => {
    setInputValue(inputValue + value);
  };
  const handleDelete = () => {
    setInputValue(inputValue.slice(0, -1));
  };

  return (
    <div>
      <Col md={12}>
        <CardLayout>
          <Box className={"order-line-tables-wrapper"}>
            <Box className={"order-line-tables"}>
              <Row>
                <Col md={3}>
                  <Box className={"child-one-box-container"}>
                    <Link
                      to={""}
                      onClick={() => handleShow(1)}
                      className={"child-one-box"}
                    >
                      <h6>Table 1</h6>
                      <br />
                      <Text as="span">4</Text>
                    </Link>

                    <Modal
                      className="guestSelect-model f-13"
                      show={showModel}
                      onHide={handleClose}
                    >
                      <Modal.Header closeButton>
                        <Modal.Title className="f-13">Guest Select</Modal.Title>
                      </Modal.Header>
                      <Form>
                        <Modal.Body>
                          <Col md={12}>
                            <LabelFieldT
                              type="text"
                              name="orderTable"
                              placeholder={inputValue}
                              // value={inputValue}
                              onChange={(e) => setInputValue(e.target.value)}
                            />
                          </Col>
                          {/* <Col md={12}>
                            <Box className={"cal-btns-wrapper d-flex-wrap"}>
                              <button className={"cal-btns"}
                                onClick={() => handleClick("1")}
                              >
                                1
                              </button>
                              <button className={"cal-btns"}
                                onClick={() => handleClick("2")}
                              >
                                2
                              </button>
                              <button className={"cal-btns"}
                                onClick={() => handleClick("3")}
                              >
                                3
                              </button>
                              <button className={"cal-btns"}
                                onClick={() => handleClick("4")}
                              >
                                4
                              </button>
                              <button className={"cal-btns"}
                                onClick={() => handleClick("5")}
                              >
                                5
                              </button>
                              <button className={"cal-btns"}
                                onClick={() => handleClick("6")}
                              >
                                6
                              </button>
                              <button className={"cal-btns"}
                                onClick={() => handleClick("7")}
                              >
                                7
                              </button>
                              <button className={"cal-btns"}
                                onClick={() => handleClick("8")}
                              >
                                8
                              </button>
                              <button className={"cal-btns"}
                                onClick={() => handleClick("9")}
                              >
                                9
                              </button>
                              <button className={"cal-btns"}
                                onClick={() => handleClick(".")}
                              >
                                .
                              </button>
                              <button className={"cal-btns"}
                                onClick={() => handleClick("0")}
                              >
                                0
                              </button>
                              <button className={"cal-btns"}
                                onClick={handleDelete}
                              >
                                <FontAwesomeIcon icon={faDeleteLeft} />
                              </button>
                            </Box>
                          </Col> */}
                        </Modal.Body>
                        <Modal.Footer>
                          <Button className="cus-btn" onClick={handleGuestSelectModal}>
                            <FontAwesomeIcon icon={faCheck} /> Save
                          </Button>
                        </Modal.Footer>
                      </Form>
                    </Modal>
                    <Link
                      to={""}
                      className={"child-one-box"}
                      onClick={() => handleShow(2)}
                    >
                      <Box>
                        <h6>Table 2</h6>
                        <br />
                        <Text as="span">4</Text>
                      </Box>
                    </Link>
                    <Link
                      to={""}
                      className={"child-one-box"}
                      onClick={() => handleShow(3)}
                    >
                      <h6>Table 3</h6>
                      <br />
                      <Text as="span">4</Text>
                    </Link>
                    <Link
                      to={""}
                      className={"child-one-box"}
                      onClick={() => handleShow(4)}
                    >
                      <h6>Table 4</h6>
                      <br />
                      <Text as="span">4</Text>
                    </Link>
                  </Box>
                </Col>
                <Col md={3}>
                  <Link
                    to={""}
                    className={"child-two-box-container"}
                    onClick={() => handleShow(10)}
                  >
                    <Box className={"child-two-box"}>
                      <h6>VIP</h6>
                      <br />
                      <Text as="span">4</Text>
                    </Box>
                  </Link>
                </Col>
                <Col md={3}>
                  <Box className={"child-thr-box-container"}>
                    <Link
                      to={""}
                      className={"child-thr-box"}
                      onClick={() => handleShow(5)}
                    >
                      <h6>Table 5</h6>
                      <br />
                      <Text as="span">4</Text>
                    </Link>
                    <Link
                      to={""}
                      className={"child-thr-box"}
                      onClick={() => handleShow(6)}
                    >
                      <h6>Table 6</h6>
                      <br />
                      <Text as="span">4</Text>
                    </Link>
                  </Box>
                </Col>
                <Col md={3}>
                  <Box className={"child-one-box-container"}>
                    <Link
                      to={""}
                      className={"child-one-box"}
                      onClick={() => handleShow(7)}
                    >
                      <h6>Table 7</h6>
                      <br />
                      <Text as="span">4</Text>
                    </Link>
                    <Link
                      to={""}
                      className={"child-one-box child-four-box"}
                      onClick={() => handleShow(8)}
                    >
                      <h6>Table 8</h6>
                      <br />
                      <Text as="span">22</Text>
                    </Link>
                    <Link
                      to={""}
                      className={"child-one-box"}
                      onClick={() => handleShow(9)}
                    >
                      <h6>Table 9</h6>
                      <br />
                      <Text as="span">15</Text>
                    </Link>
                  </Box>
                </Col>
              </Row>
            </Box>
          </Box>
        </CardLayout>
      </Col>
    </div>
  );
}
