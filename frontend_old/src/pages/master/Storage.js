import React,{useState} from "react";
import { Col, Row, Form, Table } from "react-bootstrap";
import { CardLayout } from "../../components/cards";
import PageLayout from "../../layouts/PageLayout";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faPlus,
  faEdit,
  faTrash,
  faEllipsis,
  faMinus,
} from "@fortawesome/free-solid-svg-icons";
import { Box } from "../../components/elements";
import MultiSelectNoLabel from "../../components/fields/MultiSelectNoLabel";
import { LabelField } from "../../components/fields";
export default function Storage() {
  const [open, Close] = useState(false);

  const handleDotBox = () => {
      Close(!open);
  };
  return (
    <div>
      <PageLayout>
        <Row>
          <Col md={12}>
            <CardLayout>Stoarge</CardLayout>
          </Col>
          <Col md={12}>
            <CardLayout>
              <Row>
                <Col md={12}>
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
                    <Col md={9}>
                      <Link to={"/storage-create"} style={{ float: "right" }}>
                        <button className="acc-create-btn rs-btn-create">
                          <FontAwesomeIcon icon={faPlus} /> Create{" "}
                        </button>
                      </Link>
                    </Col>
                    <Col md={12}>
                      <Box className="storage-table-wrap">
                        <Table>
                          <thead className="thead-dark">
                            <tr>
                              <td className="th-w30">Name</td>
                              <td className="th-w30">Active</td>
                              <td className="th-w30">Write-off sequence</td>
                              <td className="th-w10">-</td>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="td-w30">
                                <Link className="link" to={"/storage-details"}>
                                  {" "}
                                  Bar Storage 2
                                </Link>
                              </td>
                              <td className="td-w30">
                                <Form.Check
                                  className="switch"
                                  type="switch"
                                  id="custom-switch"
                                />
                              </td>
                              <td className="td-w30">
                                <Box className={"mul-field"}>
                                  <LabelField
                                    option={["1", "2", "3", "4", "5"]}
                                    style={{ height: "25px", width: "50px" }}
                                  />
                                </Box>
                              </td>
                              <td className="td-w10">
                              <Box className="dot-content">
                                                            <div onClick={handleDotBox}><FontAwesomeIcon icon={faEllipsis} /> </div>
                                                            {open ? (
                                                                <Box className="DotBox-main-wrapper">
                                                                    <Box className="DotBox-inner">
                                                                       <Link to={'/storage-edit'}> <Box className="DotBox-p-con">
                                                                            <FontAwesomeIcon icon={faEdit} /> Edit
                                                                        </Box>
                                                                        </Link>
                                                                        <Box className="DotBox-p-con">
                                                                            <FontAwesomeIcon icon={faTrash} /> Remove
                                                                        </Box>
                                                                    </Box>
                                                                </Box>
                                                            ) : (
                                                                ""
                                                            )}
                                                        </Box>
                              </td>
                            </tr>
                          </tbody>
                        </Table>
                      </Box>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </CardLayout>
          </Col>
        </Row>
      </PageLayout>
    </div>
  );
}
