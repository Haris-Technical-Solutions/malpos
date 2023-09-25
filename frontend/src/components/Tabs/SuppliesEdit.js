import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import axiosInstance from '../../api/baseUrl'; // Replace with the actual path

export default function SuppliesEdit() {
  const { id } = useParams(); // Assuming you're using React Router to get the supply ID from the URL
  const history = useHistory();

  const [supplyData, setSupplyData] = useState({
    // Define the initial state for supply data
    id: '',
    md_supply_id: '',
    md_product_id: '',
    qty: 0,
    unit: '',
    cost: 0,
    discount_percent: 0,
    tax_percent: 0,
    total: 0,
    created_at: '',
    updated_at: '',
  });

  useEffect(() => {
    // Fetch supply data using axiosInstance when the component mounts
    axiosInstance.get(`/md_supplies/${id}`)
      .then(response => {
        setSupplyData(response.data);
      })
      .catch(error => {
        console.error('Error fetching supply data', error);
      });
  }, [id]); // Fetch data when the ID parameter changes

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSupplyData({
      ...supplyData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Send a PUT request to update the supply data
    axiosInstance.put(`/md_supplies/${id}`, supplyData)
      .then(response => {
        // Handle success, e.g., redirect to a success page or update state
        console.log('Supply data updated successfully', response.data);
        history.push('/success-page'); // Redirect to a success page
      })
      .catch(error => {
        // Handle errors, e.g., display an error message
        console.error('Error updating supply data', error);
      });
  };

  return (
    <div>
      <h1>Edit Supply</h1>
      <Form onSubmit={handleSubmit}>
        {/* Define form fields for editing supply data */}
        <Form.Group controlId="md_supply_id">
          <Form.Label>Supply ID</Form.Label>
          <Form.Control
            type="text"
            name="md_supply_id"
            value={supplyData.md_supply_id}
            onChange={handleChange}
          />
        </Form.Group>

        {/* Add more form fields for other supply data properties here */}

        <Button type="submit">Update Supply</Button>
      </Form>
    </div>
  );
}
