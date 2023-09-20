import React, { useState, useEffect, useRef } from "react";
import PageLayout from "../../layouts/PageLayout";
import { CardLayout } from "../../components/cards";
import { useLocation, useNavigate } from "react-router-dom";
import { Row, Col, Button, Form } from "react-bootstrap";
import { Text } from "../../components/elements";
import api from "../../api/baseUrl";
import "./Checkout.css"; // Import the CSS file for styling
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CheckoutForm from "./CheckoutForm";

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [currentProduct, setCurrentProduct] = useState([]);
  const [orderType, setOrderType] = useState("");
  const [discount, setDiscount] = useState("");
  const [amountToPay, setAmountToPay] = useState(0);
  const [initialSubtotal, setInitialSubtotal] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [cardHolderName, setCardHolderName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cashAmount, setCashAmount] = useState("");
  const [cardAmount, setCardAmount] = useState("");
  const orderIdRef = useRef(null);
  const [orderId, setOrderId] = useState(null);

  // const completeBill = async () => {
  //   let payment_type;
  //   if (paymentMethod === "cash") {
  //     payment_type = "cash";
  //   } else if (paymentMethod === "card") {
  //     payment_type = "card";
  //   } else {
  //     payment_type = "cash & card";
  //   }
  //   const orderData = {
  //     order_type: orderType.toString() || "",
  //     payment_type: payment_type,
  //     discount: (discount || "").toString(),
  //     order_amount: (amountToPay || "").toString(),
  //     status: "Paid",
  //     card_holder_name: cardHolderName,
  //     card_no: cardNumber,
  //     // products: selectedProducts.map((product) => ({
  //     //   product_id: (product.md_product_id || "").toString(),
  //     //   qty: (product.qty || "").toString(),
  //     //   price: (product.price || "").toString(),
  //     // })),
  //   };

  //   // If card is selected, add the card number to the order data
  //   if (paymentMethod === "card" || paymentMethod === "cash & card") {
  //     orderData.card_number = cardNumber;
  //     orderData.card_amount = cardAmount;
  //   }
  //   // If cash & card is selected, add the cash amount to the order data
  //   if (paymentMethod === "cash & card") {
  //     orderData.cash_amount = cashAmount;
  //   }

  //   const orderId = location.state?.id;
  //   try {
  //     // Send the order data to the API
  //     const response = await api.post(`/checkout_order/${orderId}`, orderData);
  //     console.log("order", response);

  //     if (response.status === 200) {
  //       toast.success("Order has been successfully placed!");
  //       navigate("/orders-line"); // navigate to order-line page
  //     } else {
  //       console.error("Failed to submit order.");
  //     }
  //   } catch (error) {
  //     toast.error("Something went wrong with your order.");
  //   }
  // };

  // const getOrderInfo = async () => {
  //   const orderId = location.state?.id;

  //   try {
  //     const response = await api.get(`/edit_order/${orderId}`);
  //     setCurrentProduct(response.data);
  //     setAmountToPay(response.data.order_amount);
  //     setInitialSubtotal(response.data.order_amount);
  //     setOrderType(response.data.order_type);
  //     console.log(response.data.order_amount);
  //   } catch (error) {
  //     toast.error("Something went wrong with your order.");
  //   }
  // };

  // useEffect(() => {
  //   if (orderIdRef.current === null) {
  //     orderIdRef.current = location.id;
  //     getOrderInfo();
  //   }
  //   setAmountToPay(initialSubtotal - (discount || 0));
  //   // setSelectedProducts(location.state.selectedProducts);
  // }, [discount, initialSubtotal]);

  // const handleDiscountChange = (e) => {
  //   const discountValue = e.target.value;
  //   setDiscount(discountValue);
  // };

  useEffect(() => {
    if (location.state?.id !== null) {
      console.log(location.state?.id);
      setOrderId(location.state?.id);
    }
  }, []);
  return (
    <PageLayout>
      <CheckoutForm orderId={orderId} location={location} navigate={navigate} />
      {/* <Row>
        <CardLayout>
          <Row>
            <Col md={6}>
              <h2>Amount To Pay:</h2>
            </Col>
            <Col md={6}>
              <Text as="h4" className="bold" style={{ color: "#F07632" }}>
                {initialSubtotal} ریال
              </Text>
            </Col>
          </Row>
        </CardLayout>
        <CardLayout>
          <Row className="justify-content-center">
            <Col md={4}>
              <Form.Group>
                <Form.Label>Payment Method</Form.Label>
                <Form.Control
                  as="select"
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="mc-label-field-select"
                >
                  <option value="cash">Cash</option>
                  <option value="card">Card</option>
                  <option value="cash & card">Cash & Card</option>
                </Form.Control>
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group>
                <Form.Label>Discount ریال</Form.Label>
                <Form.Control
                  className="pop-out-input"
                  type="number"
                  min={0}
                  max={initialSubtotal}
                  placeholder="Enter Discount"
                  value={discount}
                  onChange={handleDiscountChange}
                />
              </Form.Group>
            </Col>
          </Row>
          {paymentMethod === "card" && (
            <Row className="justify-content-center">
              <Col md={4}>
                <Form.Group>
                  <Form.Label>Card Holder Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={cardHolderName}
                    onChange={(e) => setCardHolderName(e.target.value)}
                    className="mc-label-field-input"
                  />
                </Form.Group>
              </Col>

              <Col md={4}>
                <Form.Group>
                  <Form.Label>Card Number</Form.Label>
                  <Form.Control
                    type="text"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    className="mc-label-field-input"
                  />
                </Form.Group>
              </Col>
            </Row>
          )}

          {paymentMethod === "cash & card" && (
            <>
              <Row className="justify-content-center pt-2">
                <Col md={4}>
                  <Form.Group>
                    <Form.Label>Cash Amount</Form.Label>
                    <Form.Control
                      type="number"
                      value={cashAmount}
                      onChange={(e) => setCashAmount(e.target.value)}
                      className="mc-label-field-input"
                    />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group>
                    <Form.Label>Card Amount</Form.Label>
                    <Form.Control
                      type="number"
                      value={cardAmount}
                      onChange={(e) => setCardAmount(e.target.value)}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row className="justify-content-center">
                <Col md={4}>
                  <Form.Group>
                    <Form.Label>Card Holder Name</Form.Label>
                    <Form.Control
                      type="text"
                      value={cardHolderName}
                      onChange={(e) => setCardHolderName(e.target.value)}
                      className="mc-label-field-input"
                    />
                  </Form.Group>
                </Col>

                <Col md={4}>
                  <Form.Group>
                    <Form.Label>Card Number</Form.Label>
                    <Form.Control
                      type="text"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      className="mc-label-field-input"
                    />
                  </Form.Group>
                </Col>
              </Row>
            </>
          )}

          <Row className="justify-content-center">
            <Col md={4}>
              <Form.Label>After Discount ریال</Form.Label>
              <Form.Control
                className="pop-out-input"
                type="number"
                placeholder="Enter Discount"
                value={amountToPay}
                readOnly
              />
            </Col>
          </Row>

          <Row className="justify-content-center py-3">
            <Col md={2}>
              <Button
                style={{ backgroundColor: "green" }}
                onClick={completeBill}
                className="w-100"
              >
                Pay Now
              </Button>
            </Col>
            <Col md={2}>
              <Button
                style={{ backgroundColor: "green" }}
                onClick={completeBill}
                className="w-100"
              >
                Save as Draft
              </Button>
            </Col>
          </Row>
        </CardLayout>
      </Row> */}
    </PageLayout>
  );
};

export default Checkout;
