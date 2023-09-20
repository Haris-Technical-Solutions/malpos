import { Col, Row } from "react-bootstrap";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

import { CardLayout } from "../../components/cards";
import { LabelField } from "../../components/fields";
import MultiSelectField from "../../components/fields/MultiSelectField";
import SelectField from "../../components/fields/SelectField";
import PageLayout from "../../layouts/PageLayout";
import axiosInstance from "../../apis";

export default function RoleCreate() {
  const [isUpdate, setIsUpdate] = useState(false); // Flag to indicate update request

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    role_type: "admin",
    is_active: true,
  });
  const [editId, setEditId] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCheckChange = (e) => {
    setFormData({
      ...formData,
      is_active: e.target.checked,
    });
  };

  const fetchUserData = async () => {
    const roleId = localStorage.getItem("roleId");
    setEditId(roleId);
    if (roleId) {
      setIsUpdate(true); // Set the flag to indicate update

      try {
        const response = await axiosInstance.get(`/role_edit/${roleId}`);
        const userData = response.data;
        setFormData({
          name: userData.name || "",
          description: userData.description || "",
          role_type: userData.role_type || "",
          is_active: userData.is_active !== null ? userData.is_active : false,
        });
        localStorage.removeItem("roleId");
      } catch (error) {
        console.log(error, "Error retrieving user data");
      }
    }
  };

  const formatData = (data, idKey) =>
    data.map((item) => ({ value: item[idKey], label: item.name }));



  const handleRoleTypeChange = (e) => {
    console.log(e.target.value)
    setFormData((prevFormData) => ({
        ...prevFormData,
        role_type: e.target.value,
      }));
    
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleSubmit = async (e) => {
    const updatedFormData = {
        ...formData
    }
    e.preventDefault();
    try {
        let response;
        if (isUpdate) {
          // Update request
          response = await axiosInstance.post(
            `/role_update/${editId}`,
            formData
          );
          setEditId(null);
          toast.success("Role edited successfully", {
            autoClose: false,
          });
          resetForm();
        } else {
          // Create request
          response = await axiosInstance.post("/role_store", updatedFormData);
          console.log(response.data);
          toast.success("Role created successfully", {
            autoClose: false,
          });
          resetForm();
        }
      } catch (error) {
        console.error("Error creating/updating Role", error);
      }
  };

  const roleTypeOptions = [
    { value: "super_admin_role", label: "Super Admin Role" },
    { value: "client_role", label: "Client Role" },
  ];

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      role_type: "",
      is_active: true,
    });
  };

  return (
    <div>
      <PageLayout>
        <Row>
          <Col md={12}>
            <CardLayout>
              <h3>Create Role</h3>
            </CardLayout>
          </Col>
          <Col md={12}>
            <form onSubmit={handleSubmit}>
              <CardLayout>
                <Row>
                  <Col md={4}>
                    <LabelField
                      label="Role Name"
                      name="name"
                      type="text"
                      placeholder="Enter role name"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </Col>
                  <Col md={4}>
                    <LabelField
                      label="Description"
                      name="description"
                      type="text"
                      placeholder="Enter description"
                      value={formData.description}
                      onChange={handleChange}
                    />
                  </Col>
                  <Col md={4}>
                    <SelectField
                      label="Role Type"
                      name="role_type"
                      options={roleTypeOptions}
                      onChange={handleRoleTypeChange}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <div className="form-check form-switch">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="flexSwitchCheckDefault"
                        name="is_active"
                        onChange={handleCheckChange}
                        checked={formData.is_active}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="flexSwitchCheckDefault"
                      >
                        is Active?
                      </label>
                    </div>
                  </Col>
                  <Col md={12}>
                    <button className="cus-btn" type="submit">
                      Create
                    </button>
                    <Link to="/users">
                      <button
                        style={{
                          backgroundColor: "#F07632",
                          color: "white",
                          borderColor: "#F07632",
                        }}
                        className="cus-btn-bor"
                      >
                        Back
                      </button>
                    </Link>
                  </Col>
                </Row>
              </CardLayout>
            </form>
          </Col>
        </Row>
      </PageLayout>
    </div>
  );
}
