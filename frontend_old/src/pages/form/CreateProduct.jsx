import { Col, Row } from "react-bootstrap";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import { CardLayout } from "../../components/cards";
import { LabelField } from "../../components/fields";
import MultiSelectField from "../../components/fields/MultiSelectField";
import PageLayout from "../../layouts/PageLayout";
import axiosInstance from "../../api/baseUrl";

export default function CreateProduct() {
  const [clients, setClients] = useState([]);
  const [brands, setBrands] = useState([]);
  const [branches, setBranches] = useState([]);
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({
    cd_client_id: "",
    cd_brand_id: "",
    cd_branch_id: "",
    is_active: 1,
    product_name: "",
    product_code: "",
    product_image: null,
    md_product_category_id: "",
    product_price: "",
    created_by: "1",
    updated_by: "1",
  });

  const formatData = (data, idKey, nameKey = "name") =>
    data.map((item) => ({ label: item[nameKey], value: item[idKey] }));

  const fetchClients = async () => {
    try {
      const res = await axiosInstance.get("/cdclient");
      const formattedData = formatData(res.data, "cd_client_id");
      setClients(formattedData);
    } catch (error) {
      console.log(error);
    }
  };

  // Update the fetchCategories function
  const fetchCategories = async () => {
    try {
      const res = await axiosInstance.get("/product_category");
      const formattedData = formatData(
        res.data.product_category,
        "md_product_category_id",
        "product_category_name"
      );

      setCategories(formattedData);
      console.log(formatData);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchBrands = async () => {
    try {
      const res = await axiosInstance.get("/cdbrand");
      const formattedData = formatData(res.data, "cd_brand_id");
      setBrands(formattedData);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchBranches = async () => {
    try {
      const res = await axiosInstance.get("/cdbranch");
      const formattedData = formatData(res.data, "cd_branch_id");
      setBranches(formattedData);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClientChange = (selectedIds) => {
    setForm((prevForm) => ({
      ...prevForm,
      cd_client_id: selectedIds,
    }));
    console.log(selectedIds);
  };

  const handleBrandChange = (selectedIds) => {
    setForm((prevForm) => ({
      ...prevForm,
      cd_brand_id: selectedIds,
    }));
    console.log(selectedIds);
  };

  const handleBranchChange = (selectedIds) => {
    setForm((prevForm) => ({
      ...prevForm,
      cd_branch_id: selectedIds,
    }));
    console.log(selectedIds);
  };

  const handleCategoryChange = (selectedIds) => {
    setForm((prevForm) => ({
      ...prevForm,
      md_product_category_id: selectedIds,
    }));
    console.log(selectedIds);
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "product_image") {
      setForm((prevForm) => ({
        ...prevForm,
        [name]: files[0],
      }));
    } else {
      setForm((prevForm) => ({
        ...prevForm,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.keys(form).forEach((key) => {
      formData.append(key, form[key]);
    });

    try {
      console.log(form);
      const response = await axiosInstance.post("/product_store", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Product created successfully", {
        autoClose: false,
      });
    } catch (error) {
      console.log(error, "Error creating product ");
    }
  };

  useEffect(() => {
    fetchClients();
    fetchBrands();
    fetchBranches();
    fetchCategories();
  }, []);

  return (
    <div>
      <PageLayout>
        <Row>
          <Col md={12}>
            <CardLayout>
              <h3>Add New Product</h3>
            </CardLayout>
          </Col>
          <Col md={12}>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
              <CardLayout>
                <Row>
                  <Col md={12}>
                    <Row>
                      <Col md={3}>
                        <MultiSelectField
                          label="Role"
                          name="cd_client_id"
                          type="select"
                          title="Client"
                          options={clients}
                          value={form.cd_client_id}
                          onChange={handleClientChange}
                        />
                      </Col>
                      <Col md={3}>
                        <MultiSelectField
                          label="Role"
                          name="cd_brand_id"
                          type="select"
                          title="Brand"
                          options={brands}
                          value={form.cd_brand_id}
                          onChange={handleBrandChange}
                        />
                      </Col>
                      <Col md={3}>
                        <MultiSelectField
                          label="Role"
                          name="cd_branch_id"
                          type="select"
                          title="Branch"
                          options={branches}
                          value={form.cd_branch_id}
                          onChange={handleBranchChange}
                        />
                      </Col>
                      <Col md={3}>
                        <MultiSelectField
                          label="Category"
                          name="md_product_category_id"
                          type="select"
                          title="Category"
                          options={categories}
                          value={form.md_product_category_id}
                          onChange={handleCategoryChange}
                        />
                      </Col>
                      <Col md={6}>
                        <LabelField
                          label="Product name"
                          name="product_name"
                          type="text"
                          value={form.product_name}
                          placeholder="Enter product name"
                          onChange={handleChange}
                        />
                      </Col>
                      <Col md={6}>
                        <LabelField
                          label="Product Code"
                          type="Number"
                          name="product_code"
                          placeholder="Enter product code"
                          value={form.product_code}
                          onChange={handleChange}
                        />
                      </Col>
                      <Col md={6}>
                        <LabelField
                          label="Product Price"
                          type="number"
                          name="product_price"
                          placeholder="Enter product Price"
                          value={form.product_price}
                          onChange={handleChange}
                        />
                      </Col>
                      <Col md={6}>
                        <label htmlFor="image">Upload Image</label>
                        <input
                          type="file"
                          id="image"
                          name="product_image"
                          onChange={handleChange}
                        />
                      </Col>
                      <Col md={12}>
                        <button className="cus-btn"> Create</button>
                        <Link to="/product-page">
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
