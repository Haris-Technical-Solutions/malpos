import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Col, Row, Table } from "react-bootstrap";
import { CardLayout } from "../../components/cards";
import PageLayout from "../../layouts/PageLayout";
// import { Pagination } from "react-bootstrap";
import { Pagination } from "../../components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRotateLeft,
  faPlus,
  faTrash,
  faEdit,
} from "@fortawesome/free-solid-svg-icons";
import MultiSelectField from "../../components/fields/MultiSelectField";
import { Link } from "react-router-dom";
import { Box, Text } from "../../components/elements";
import axiosInstance from "../../apis";

export default function Roles() {
  const [roles, setRoles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(5);

  const getRoles = async () => {
    try {
      const response = await axiosInstance.get("/admin_roles");
      console.log(response)
      setRoles(response.data);
    } catch (error) {
      console.log(error, "Error Retriving data");
    }
  };

  useEffect(() => {
    console.log("in");
    getRoles();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`/role_delete/${id}`);
      getRoles();
      const updatedRoles = roles.filter((role) => role.id !== id);
      setRoles(updatedRoles);
      toast.success("role deleted successfully", {
        autoClose: false,
        closeButton: true,
      });
    } catch (error) {
      console.log(error);
    }
  };
  const handleEdit = (id) => {
    localStorage.setItem("roleId", id);
  };

  // Pagination Logic
  const indexOfLastUser = currentPage * perPage;
  const indexOfFirstUser = indexOfLastUser - perPage;
  const currentRoles = roles.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  return (
    <div>
      <PageLayout>
        <Row>
          <Col md={12}>
            <CardLayout>
              <h3>Roles</h3>
            </CardLayout>
          </Col>
          <Col md={12}>
            <CardLayout>
              <Row>
                <Col md={12} className={"mt0-col-2"}>
                  <Box className={"Roles-btn-flex"}>
                    <Box className={"clients-btn-box"}>
                      <Text className="faArrowLeft-client" as="span">
                        <FontAwesomeIcon icon={faArrowRotateLeft} />
                      </Text>
                    </Box>
                    <Link to="/roles-create">
                      <button className="btn-create">
                        {" "}
                        <FontAwesomeIcon icon={faPlus} /> Create
                      </button>
                    </Link>
                    {/* <Box className={"w-300"}>
                      <MultiSelectField />
                    </Box> */}
                  </Box>
                </Col>
                {/* <Col md={2} className={"mt0-col-2"}>
                </Col> */}
                <Col md={12}>
                  <Box className={"Roles-table-wrappper"}>
                    <Table className="f-13" responsive>
                      <thead className="thead custom-table-header text-center">
                        <tr className="thead">
                          <th className="th-w5">Id</th>
                          <th className="th-5">name</th>
                          <th className="th-5">description</th>

                          <th className="th-w5">Role Type</th>
                          <th className="th-w5">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="text-center">
                        {currentRoles &&
                          currentRoles.map((role) => (
                            <tr key={role.cd_role_id}>
                              <td>{role.cd_role_id}</td>
                              
                              <td>{role.name}</td>
                              <td>{role.description}</td>

                              <td>{role.role_type}</td>
                              <td>
                                <Box
                                  className={
                                    "justify-content-center px-2 client-action-icons"
                                  }
                                >
                                  <Box
                                    style={{ cursor: "pointer" }}
                                    className={"px-3"}
                                  >
                                    <FontAwesomeIcon
                                      icon={faTrash}
                                      color="#ee3432"
                                      onClick={() => handleDelete(role.cd_role_id)}
                                    />
                                  </Box>
                                  <Box>
                                    <Link
                                      to={"/roles-create"}
                                      onClick={() => {
                                        handleEdit(role.cd_role_id);
                                      }}
                                    >
                                      {" "}
                                      <FontAwesomeIcon
                                        icon={faEdit}
                                        color="#f29b30"
                                      />
                                    </Link>
                                  </Box>
                                </Box>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </Table>
                    {Roles && (
                      <Pagination
                        perPage={perPage}
                        totalRoles={Roles?.length}
                        paginate={paginate}
                        currentPage={currentPage}
                      />
                    )}
                  </Box>
                </Col>
              </Row>
            </CardLayout>
          </Col>
        </Row>
      </PageLayout>
    </div>
  );
}
