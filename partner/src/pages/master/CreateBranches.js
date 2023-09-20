import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Col, Row } from "react-bootstrap";
import { CardLayout } from "../../components/cards";
import PageLayout from "../../layouts/PageLayout";
import { LabelField } from "../../components/fields";
import axiosInstance from "../../apis";
import SelectField from "../../components/fields/SelectField";

export default function CreateBranch() {
  const [isUpdate, setIsUpdate] = useState(false);
  const [brands, setBrands] = useState([]);

  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    cd_brand_id: "",
    is_active: true,
    created_by: "malpos",
    updated_by: "malpos",
  });

  const formatData = (data, idKey) =>
    data.map((item) => ({ label: item.name, value: item[idKey] }));

  const fetchBrands = async () => {
    try {
      const res = await axiosInstance.get("/cdbrand");
      const formattedData = formatData(res.data, "cd_brand_id");
      setBrands(formattedData);
    } catch (error) {
      console.log(error);
    }
  };

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

  const handleBrandChange = (e) => {
    setFormData((prevForm) => ({
      ...prevForm,
      cd_brand_id: parseInt(e.target.value),
    }));
  };

  const fetchBranchData = async () => {
    const branchId = localStorage.getItem("branchId");
    setEditId(branchId);
    if (branchId) {
      setIsUpdate(true);
      try {
        const response = await axiosInstance.get(`/cdbranch_edit/${branchId}`);
        const branchData = response.data;
        setFormData({
          name: branchData.name,
          is_active: branchData.is_active,
          created_by: branchData.created_by,
          updated_by: branchData.created_by,
          cd_brand_id: branchData.cd_brand_id,
        });
        localStorage.removeItem("branchId");
      } catch (error) {
        console.log(error, "Error retrieving branch data");
      }
    }
  };

  useEffect(() => {
    fetchBranchData();
    fetchBrands();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedFormData = {
        ...formData,
      };

      let response;

      if (isUpdate) {
        // Update request
        response = await axiosInstance.post(
          `/cdbranch_update/${editId}`,
          updatedFormData
        );
        setEditId(null);
        console.log(updatedFormData);
        toast.success("Branch edited successfully", {
          autoClose: false,
        });
      } else {
        // Create request
        response = await axiosInstance.post("/cdbranch_store", updatedFormData);
        toast.success("Branch created successfully", {
          autoClose: false,
        });
      }
    } catch (error) {
      console.error("Error creating/updating User", error);
    }
  };

  return (
    <div>
      <PageLayout>
        <form onSubmit={handleSubmit}>
          <Row>
            <Col md={12}>
              <CardLayout>
                <h3>Create Branch</h3>
              </CardLayout>
            </Col>
            <Col md={12}>
              <CardLayout>
                <Row>
                  <Col md={6}>
                    <Row>
                      <Col md={12}>
                        <LabelField
                          type="text"
                          placeholder="Name"
                          label="Name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                        />
                      </Col>
                      <Col md={12}>
                        <SelectField
                          label="Brand"
                          name="cd_brand_id"
                          options={brands}
                          value={formData.cd_brand_id}
                          onChange={handleBrandChange}
                        />
                      </Col>
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
                        <Link to="/branches">
                          <button
                            className="cus-btn-bor"
                            style={{
                              backgroundColor: "#F07632",
                              color: "white",
                              borderColor: "#F07632",
                            }}
                          >
                            Back
                          </button>
                        </Link>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </CardLayout>
            </Col>
          </Row>
        </form>
      </PageLayout>
    </div>
  );
}
