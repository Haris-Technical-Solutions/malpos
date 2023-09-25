import React, { useState, useEffect } from "react";
import { Col, Row, Form, Button } from "react-bootstrap";
import { CardLayout } from "../../components/cards";
import { Box } from "../../components/elements";
import { LabelField } from "../../components/fields";
import PageLayout from "../../layouts/PageLayout";
import { Link, useLocation } from "react-router-dom";
import axiosInstance from "../../api/baseUrl";
import { toast } from "react-toastify";

export default function StorageEdit() {
  const location = useLocation();
  const [editStorageId, setEditStorageId] = useState();
  const [action, setAction] = useState();
  const [currentStorage, setCurrentStorage] = useState({ name: "", is_active: 0, cd_branch_id: 0, cd_brand_id: 0, cd_client_id: 0 });

  const fetchStorageById = async (id) => {
    try {
      const res = await axiosInstance.get(`/md_storage/${id}/edit`);
      setCurrentStorage(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (location.state?.id) {
      fetchStorageById(location.state?.id);
      setEditStorageId(location.state?.id);
      setAction(location.state?.action);
    }
  }, [location.state]);

  const handleSwitchChange = () => {
    setCurrentStorage((prevStorage) => ({
      ...prevStorage,
      is_active: prevStorage.is_active === 1 ? 0 : 1,
    }));
  };

  const handleUpdateStorage = () => {
    const updatedStorageData = {
      name: currentStorage.name,
      is_active: currentStorage.is_active,
      cd_branch_id: currentStorage.cd_branch_id,
      cd_brand_id: currentStorage.cd_brand_id,
      cd_client_id: currentStorage.cd_client_id,
    };

    const apiEndpoint = editStorageId ? `/md_storage/update/${editStorageId}` : "/md_storage";

    axiosInstance
      .post(apiEndpoint, updatedStorageData) // Always use POST
      .then((response) => {
        toast.success("Storage updated successfully", {
          position: "top-right",
          autoClose: 3000,
        });

        console.log("Storage updated successfully", response.data);
      })
      .catch((error) => {
        toast.error("Error updating storage", {
          position: "top-right",
          autoClose: 3000,
        });

        console.error("Error updating storage", error);
      });
  };

  return (
    <div>
      <PageLayout>
        <Row>
          <Col md={12}>
            <CardLayout>
              {action === "create" ? "Create Storage" : "Edit Storage"}
            </CardLayout>
          </Col>
          <Col md={12}>
            <CardLayout>
              <Row>
                <Col md={6}>
                  <LabelField
                    type="text"
                    value={currentStorage.name}
                    onChange={(e) =>
                      setCurrentStorage({
                        ...currentStorage,
                        name: e.target.value,
                      })
                    }
                    placeholder={"Name"}
                  />
                  <Box className={"storageEdit-switch"}>
                    <Form.Check
                      className="switch"
                      type="switch"
                      id="custom-switch"
                      label="Status"
                      checked={currentStorage.is_active === 1}
                      onChange={handleSwitchChange}
                    />
                  </Box>
                  {action === "create" ? (
                    <Button variant="primary" onClick={handleUpdateStorage}>
                      Create
                    </Button>
                  ) : (
                    <Button variant="primary" onClick={handleUpdateStorage}>
                      Update
                    </Button>
                  )}
                </Col>
              </Row>
            </CardLayout>
          </Col>
        </Row>
      </PageLayout>
    </div>
  );
}
