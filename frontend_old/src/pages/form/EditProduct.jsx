import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import { CardLayout } from "../../components/cards";
import { LabelField } from "../../components/fields";
import MultiSelectField from "../../components/fields/MultiSelectField";
import PageLayout from "../../layouts/PageLayout";
import axiosInstance from "../../api/baseUrl";

export default function EditProductComponent() {
  const { id } = useParams();
  const [clients, setClients] = useState([]);
  const [brands, setBrands] = useState([]);
  const [branches, setBranches] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    cd_client_id: "",
    cd_brand_id: "",
    cd_branch_id: "",
    md_product_category_id: "",

    is_active: 1,
    product_category_name: "",
    product_category_code: "",
    product_category_description: "",
    product_category_image: null,
    created_by: "1",
    updated_by: "1",
  });

  //   const formatData = (data, idKey) =>
  //     data.map((item) => ({ label: item.name, value: item[idKey] }));

  const formatData = (data, idKey) => {
    if (Array.isArray(data)) {
      return data.map((item) => ({ label: item.name, value: item[idKey] }));
    } else {
      console.log("Data is not an array: ", data);
      return [];
    }
  };

  const fetchClients = async () => {
    try {
      const res = await axiosInstance.get("/cdclient");
      const formattedData = formatData(res.data, "cd_client_id");
      setClients(formattedData);
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

  const fetchCategories = async () => {
    try {
      const res = await axiosInstance.get("/product_category");
      const formattedData = formatData(
        res.data.product_category,
        "md_product_category_id"
      );
      setCategories(formattedData);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClientChange = (selectedIds) => {
    setForm((prevForm) => ({
      ...prevForm,
      cd_client_id: selectedIds,
    }));
  };

  const handleBrandChange = (selectedIds) => {
    setForm((prevForm) => ({
      ...prevForm,
      cd_brand_id: selectedIds,
    }));
  };

  const handleBranchChange = (selectedIds) => {
    setForm((prevForm) => ({
      ...prevForm,
      cd_branch_id: selectedIds,
    }));
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

    if (name === "product_category_image") {
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
      await axiosInstance.post(`/product_category_update/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Category updated successfully", {
        autoClose: false,
      });
    } catch (error) {
      console.log(error, "Error updating product category");
    }
  };

  const fetchProduct = async () => {
    try {
      const response = await axiosInstance.get(`/product_edit/${id}`);
      console.log("Edit", response);
      const productData = response.data;

      setForm((prevForm) => ({
        ...prevForm,
        cd_client_id: productData.cd_client_id,
        cd_brand_id: productData.cd_brand_id,
        cd_branch_id: productData.cd_branch_id,
        md_product_category_id: productData.md_product_category_id,

        product_name: productData.product_name,
        product_code: productData.product_code,
        // product_category_description: categoryData.product_category_description,
      }));
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchClients();
    fetchBrands();
    fetchBranches();
    fetchCategories();
    fetchProduct();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <PageLayout>
        <Row>
          <Col md={12}>
            <CardLayout>
              <h3>Edit Product</h3>
            </CardLayout>
          </Col>
          <Col md={12}>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
              <CardLayout>
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
                      label="Category name"
                      name="product_category_name"
                      type="text"
                      placeholder="Enter category name"
                      value={form.product_category_name}
                      onChange={handleChange}
                    />
                  </Col>
                  <Col md={6}>
                    <LabelField
                      label="Category Code"
                      name="product_category_code"
                      type="Number"
                      placeholder="Enter category code"
                      value={form.product_category_code}
                      onChange={handleChange}
                    />
                  </Col>
                  <Col md={6}>
                    <LabelField
                      label="Category Description"
                      name="product_category_description"
                      type="textarea"
                      placeholder="Enter category desc"
                      value={form.product_category_description}
                      onChange={handleChange}
                    />
                  </Col>
                  <Col md={6}>
                    <label htmlFor="image">Upload Image</label>
                    <input
                      type="file"
                      id="image"
                      name="product_category_image"
                      onChange={handleChange}
                    />
                  </Col>
                  <Col md={12}>
                    <button type="submit" className="cus-btn">
                      Update
                    </button>
                    <Link to="/product-category">
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
