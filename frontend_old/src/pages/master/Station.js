import React, { useState } from "react";
import { Col, Row, Form } from "react-bootstrap";
import { Table } from "react-bootstrap";
import PageLayout from "../../layouts/PageLayout";
import { CardLayout } from "../../components/cards";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Modal from "react-bootstrap/Modal";
import { Heading, Box, Text, Icon, Button } from "../../components/elements";

import {
  faEdit,
  faPlus,
  faRemove,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import data from "../../data/master/stations.json";

export default function AccountsCatTab() {
  const [alertModal, setAlertModal] = useState(false);
  const [items, setItems] = useState(data.stations.tbody);
  const [sortOrder, setSortOrder] = useState("asc");
  const [selectedItem, setSelectedItem] = useState(null);
  const [idToDelete, setIdToDelete] = useState();

  const handleEdit = (item) => {
    setSelectedItem(item);
    // add logic to open edit modal or perform other actions
  };

  const handleCloseModal = () => {
    setAlertModal(false);
  };

  const handleWindow = (item) => {
    if (selectedItem === item) {
      setSelectedItem(null);
    } else {
      setSelectedItem(item);
    }
  };

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };
  const handleDeleteClick = (itemId) => {
    setIdToDelete(itemId);
    setAlertModal(true);
  };

  function handleDelete(id) {
    setItems(items.filter((item) => item.id !== id));
    setAlertModal(false);
  }
  return (
    <div>
      <PageLayout>
        <Row>
          <Col md={12}>
            <CardLayout>
              <Box className="head-sec-rearrange">
                <Box className="head-sec-rearrange-left">
                  <h3>Stations</h3>
                </Box>
              </Box>
            </CardLayout>
          </Col>

          <Col md={12}>
            <CardLayout>
              <Row>
                <Col md={10}>
                  <Row>
                    <Col md={3}>
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
                            fontSize: "14px",
                          }}
                        >
                          <button type="submit">
                            <FontAwesomeIcon icon={faSearch} />
                          </button>
                        </span>
                      </div>
                    </Col>
                  </Row>
                </Col>
                <Col md={2}>
                  <Box className="station-right-btn">
                    <button>
                      <FontAwesomeIcon icon={faPlus} /> Create
                    </button>
                  </Box>
                </Col>
              </Row>
              <Col md={12}>
                <Box className="tabContent station-table-sc">
                  <Col md={12}>
                    <Row>
                      <Col md={12}>
                        <Table responsive>
                          <thead className="mc-table-head dark">
                            <tr>
                              <th style={{ maxWidth: "40%", width: "490px" }}>
                                Name{" "}
                                <button
                                  className="sorting-icon"
                                  onClick={toggleSortOrder}
                                >
                                  {sortOrder === "asc" ? "▲" : "▼"}
                                </button>
                              </th>
                              <th style={{ maxWidth: "10%", width: "80px" }}>
                                Count
                              </th>
                              <th style={{ maxWidth: "20%", width: "116px" }}>
                                Can be Printed
                                <button
                                  className="sorting-icon"
                                  onClick={toggleSortOrder}
                                >
                                  {sortOrder === "asc" ? "▲" : "▼"}
                                </button>
                              </th>
                              <th style={{ maxWidth: "20%", width: "116px" }}>
                                Station Reminder
                              </th>
                              <th style={{ maxWidth: "10%", width: "50px" }}>
                                ...
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {items.map((item, i) => (
                              <tr key={i}>
                                <td className="td-left">{item.heading}</td>
                                <td>{item.count}</td>
                                <td>{item.print}</td>
                                <td>{item.remember}</td>
                                <td className="text-end-td ">
                                  <button
                                    onClick={() => handleWindow(item)}
                                    className="accounts-Tab-dot-box Tab-dot-box"
                                  >
                                    {selectedItem === item && (
                                      <Box className="dot-box-details">
                                        <Box className="inner-dot-box-details">
                                          <Box
                                            className="inner-dot-box-item dot-box-item-border"
                                            onClick={() => handleEdit(item)}
                                          >
                                            <FontAwesomeIcon icon={faEdit} />
                                            Edit
                                          </Box>
                                          <Box className="inner-dot-box-item">
                                            <Button
                                              onClick={() =>
                                                handleDeleteClick(item.id)
                                              }
                                            >
                                              <FontAwesomeIcon icon={faTrash} />
                                              Remove
                                            </Button>
                                          </Box>
                                        </Box>
                                      </Box>
                                    )}
                                    ...
                                  </button>
                                </td>
                              </tr>
                            ))}

                            {/* <tr>
                              <td>Cold Bar</td>
                              <td style={{ textAlign: "center" }}>8</td>
                              <td style={{ textAlign: "center" }}>✔</td>
                              <td style={{ textAlign: "center" }}>✖</td>
                              <td className="text-end-td ">
                                <button
                                  onClick={handleWindow}
                                  className="accounts-Tab-dot-box Tab-dot-box"
                                >
                                  {isOpen && (
                                    <Box className="dot-box-details">
                                      <Box className="inner-dot-box-details">
                                        <Box className="inner-dot-box-item dot-box-item-border ">
                                          <FontAwesomeIcon
                                            icon={faPenToSquare}
                                          />{" "}
                                          &nbsp;Edit
                                        </Box>
                                        <Box className="inner-dot-box-item">
                                          <FontAwesomeIcon icon={faTrash} />{" "}
                                          &nbsp;Remove
                                        </Box>
                                      </Box>
                                    </Box>
                                  )}
                                  ...
                                </button>
                              </td>
                            </tr>
                            <tr>
                              <td>Hot Bar</td>
                              <td style={{ textAlign: "center" }}>5</td>
                              <td style={{ textAlign: "center" }}>✔</td>
                              <td style={{ textAlign: "center" }}>✖</td>
                              <td className="text-end-td ">
                                <button
                                  onClick={handleWindow}
                                  className="accounts-Tab-dot-box Tab-dot-box"
                                >
                                  {isOpen && (
                                    <Box className="dot-box-details">
                                      <Box className="inner-dot-box-details">
                                        <Box className="inner-dot-box-item dot-box-item-border ">
                                          <FontAwesomeIcon
                                            icon={faPenToSquare}
                                          />{" "}
                                          &nbsp;Edit
                                        </Box>
                                        <Box className="inner-dot-box-item">
                                          <FontAwesomeIcon icon={faTrash} />{" "}
                                          &nbsp;Remove
                                        </Box>
                                      </Box>
                                    </Box>
                                  )}
                                  ...
                                </button>
                              </td>
                            </tr> */}
                          </tbody>
                          <Modal
                            show={alertModal}
                            onHide={() => setAlertModal(false)}
                          >
                            <Box className="mc-alert-modal">
                              <Icon type="new_releases" />
                              <Heading as="h3">are your sure!</Heading>
                              <Text as="p">Want to delete this product?</Text>
                              <Modal.Footer>
                                <Button
                                  type="button"
                                  className="btn btn-secondary"
                                  onClick={handleCloseModal}
                                >
                                  nop, close
                                </Button>
                                <Button
                                  type="button"
                                  className="btn btn-danger"
                                  onClick={() => handleDelete(idToDelete)}

                                  // onClick={handleCloseModal}
                                >
                                  yes, delete
                                </Button>
                              </Modal.Footer>
                            </Box>
                          </Modal>
                        </Table>
                      </Col>
                    </Row>
                  </Col>
                </Box>
              </Col>
            </CardLayout>
          </Col>
        </Row>
      </PageLayout>
    </div>
  );
}
