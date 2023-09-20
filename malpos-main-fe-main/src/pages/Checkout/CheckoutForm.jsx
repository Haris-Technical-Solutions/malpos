import { Row, Col, Button, Form } from "react-bootstrap";
import { useReactToPrint } from "react-to-print";

import React, { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import Numpad from "./Numpad";

import { Fieldset, Text } from "../../components/elements";
import api from "../../api/baseUrl";
import { CardLayout } from "../../components/cards";
import ThermalInvoice from "../ThermalInvoice/ThermalInvoice";
import CloseWithOutPayment from "./CloseWithOutPayment";

const CheckoutForm = ({ location, navigate }) => {
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [selectedProductsQty, setSelectedProductsQty] = useState([]);
  const [paymentMethods, setPaymentMethods] = useState([
    { method: "Cash", amount: "" },
  ]);
  const [orderType, setOrderType] = useState("");
  const [discount, setDiscount] = useState("");
  const [amountToPay, setAmountToPay] = useState(0);
  const [totalTax, setTotalTax] = useState(0);
  const [initialSubtotal, setInitialSubtotal] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [printReceipt, setPrintReceipt] = useState(false);
  const [noPaymentClicked, setNoPaymentClicked] = useState(false);
  const [unit, setUnit] = useState("");
  const [bankAccounts, setBankAccounts] = useState([]);
  const [totalWithoutDiscount, setTotalWithoutDiscount] = useState(0);

  const [rowId, setRowId] = useState(null);
  const [orderId, setOrderId] = useState(null);
  const didRun = useRef(false);

  const isMethodSelected = (method) => {
    return paymentMethods.some((payment) => payment.method === method);
  };

  const totalAmountWithTax = parseInt(initialSubtotal + totalTax);

  const completeBill = async () => {
    // Create the paidAmount array
    const paidAmount = paymentMethods.map((payment) => ({
      tender_type: (payment.method || "").toString(),
      payment_amount: (payment.amount || "").toString(),
    }));
    console.log(paidAmount);
    const orderData = {
      order_type: orderType.toString() || "",
      // payment_type: paymentMethod,
      // discount: (`${discount}${unit}` || "").toString(),
      order_amount: (initialSubtotal + totalTax || "").toString(),
      status: "Paid",
      paidAmount,
      products: selectedProducts.map((product) => ({
        md_product_id: (product.md_product_id || "").toString(),
        qty: (product.qty || "").toString(),
        price: (product.product_price || "").toString(),
      })),
    };

    if (discount !== null && discount > 0) {
      orderData.discount = (`${discount}${unit}` || "").toString();
    } else {
      orderData.discount = "0.00";
    }

    if (rowId !== null) {
      try {
        // Send the order data to the API

        const response = await api.post(`/checkout_order/${rowId}`, orderData);
        toast.success("Order has been successfully placed!");
        navigate("/orders-line");
      } catch (error) {
        toast.error("Something went wrong with your order.");
      }
    } else {
      try {
        // Send the order data to the API
        const response = await api.post(
          `/checkout_order/${orderId}`,
          orderData
        );
        toast.success("Order has been successfully placed!");
        navigate("/orders-line");
      } catch (error) {
        toast.error("Something went wrong with your order.");
      }
    }

    if (printReceipt) {
      handlePrint();
    }
  };

  // Prepare for printing
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const addPaymentMethod = (method) => {
    if (isMethodSelected(method)) {
      toast.error("This payment method has already been selected.");
      return;
    }

    setPaymentMethods((prevPaymentMethods) => {
      if (prevPaymentMethods[0].method === "") {
        // If it's the first time adding a method
        return [
          prevPaymentMethods[0], // Keep the existing method at index 0
          ...prevPaymentMethods.slice(1).map((payment) => ({ ...payment })), // Copy the rest of the payment methods
          { method, amount: "" }, // Add the new payment method
        ];
      } else {
        // Otherwise, add a new method
        return [...prevPaymentMethods, { method, amount: "" }];
      }
    });
  };

  const updatePaymentMethod = (index, field, value) => {
    setPaymentMethods((prevMethods) => {
      const newMethods = [...prevMethods];
      newMethods[index][field] = value;
      return newMethods;
    });
  };

  const getOrderInfo = async () => {
    if (location.state.id != null) {
      const id = parseInt(location.state.id);
      setRowId(id);
      try {
        const response = await api.get(`/edit_order/${id}`);
        setAmountToPay(response.data.order_amount);
        setInitialSubtotal(response.data.order_amount);
        setOrderType(response.data.order_type);
      } catch (error) {
        toast.error("Something went wrong with your order.");
      }
      try {
        const id = parseInt(location.state.id);
        const response = await api.get(`/check_order_receipt/${id}`);
        const { td_sale_order_item } = response.data[0];

        setSelectedProducts(td_sale_order_item.map((item) => item.md_product));
        setSelectedProductsQty(td_sale_order_item.map((item) => item.qty));
      } catch (error) {
        toast.error("Something went wrong with your order.");
      }
    } else {
      setSelectedProducts(location.state?.selectedProducts);
      setSelectedProductsQty(location.state?.selectedProductsQty || []);
      setAmountToPay(location.state?.subtotal);
      setInitialSubtotal(location.state?.subtotal);
      setOrderType(location.state?.orderType);
      setTotalTax(location.state?.totalTax);
      setDiscount(location.state?.discount);
      setUnit(location.state?.unit);
      setInitialSubtotal(location.state?.totalWithoutDiscount);
      setOrderId(location.state?.orderId);
    }
  };

  const totalWithDiscount = totalAmountWithTax - discount;
  const isPaymentSufficient = () => {
    // Calculate total payment amount
    const totalPaymentAmount = paymentMethods.reduce(
      (sum, payment) => sum + Number(payment.amount),
      0
    );

    // Check if total payment amount equals to the amount to pay
    return totalPaymentAmount === totalWithDiscount;
  };
  useEffect(() => {
    if (!didRun.current) {
      getOrderInfo();
      didRun.current = true;
    }

    const paymentMethodsArray = paymentMethods.map((payment) => payment.method);

    // Check if the array includes 'cash' and at least one other method
    if (
      paymentMethodsArray.includes("cash") &&
      paymentMethodsArray.length === 1
    ) {
      setPaymentMethod("cash");
    } else if (paymentMethodsArray.includes("cash")) {
      setPaymentMethod("card & cash");
    } else {
      setPaymentMethod("card");
    }
  }, [paymentMethod, paymentMethods]);

  const removePaymentMethod = (index) => {
    setPaymentMethods((prevMethods) => {
      const newMethods = [...prevMethods];
      newMethods.splice(index, 1);
      return newMethods;
    });
  };

  const getBankAccounts = async () => {
    const res = await api.get(`/bank_account`);
    setBankAccounts(res.data.data);
  };

  useEffect(() => {
    getBankAccounts();
  }, []);

  return (
    <>
      {" "}
      <Row>
        <Col sm={4} md={3} lg={4}>
          <Numpad cashAmount={paymentMethods[0].amount} />
        </Col>
        {noPaymentClicked ? (
          <CloseWithOutPayment
            initialSubtotal={totalAmountWithTax}
            // noPaymentClicked={noPaymentClicked}
            setNoPaymentClicked={setNoPaymentClicked}
            orderType={orderType}
            discount={discount}
            selectedProducts={selectedProducts}
            orderId={orderId}
          />
        ) : (
          <Col md={9} lg={8}>
            <CardLayout>
              <Row className="text-center">
                <Col md={6}>
                  <h2>Amount To Pay:</h2>
                </Col>
                <Col md={6}>
                  <Text
                    as="h4"
                    className="bold fs-2"
                    style={{ color: "#F07632" }}
                  >
                    {totalWithDiscount} ریال
                  </Text>
                </Col>
              </Row>
            </CardLayout>
            <CardLayout>
              <Row>
                <Row className="justify-content-center gx-0">
                  {paymentMethods.map((payment, index) => (
                    <>
                      <Row className="gy-0 mt-2">
                        <Col md={10}>
                          <Fieldset className="mc-fieldset">
                            <legend>{payment.method || "Cash"}</legend>{" "}
                            <input
                              placeholder="Enter Amount"
                              className="w-100 h-sm"
                              value={payment.amount}
                              onChange={(e) =>
                                updatePaymentMethod(
                                  index,
                                  "amount",
                                  e.target.value
                                )
                              }
                            />
                          </Fieldset>
                        </Col>
                        {index !== 0 && (
                          <Col md={2}>
                            <FontAwesomeIcon
                              icon={faTimes}
                              onClick={() => removePaymentMethod(index)}
                              style={{ cursor: "pointer", color: "red" }}
                            />
                          </Col>
                        )}
                      </Row>
                    </>
                  ))}
                </Row>
              </Row>

              <Row className="text-center">
                <Row className="gx-2">
                  <Col xs={12} sm={12} md={3} lg={3}>
                    <Button
                      className="btn btn-success btn-lg cus-checkout-btn"
                      onClick={() => addPaymentMethod("Cash")}
                    >
                      Cash
                    </Button>
                  </Col>
                  {bankAccounts.map((bank) => (
                    <Col xs={12} sm={12} md={3} lg={3}>
                      <Button
                        className="btn btn-success btn-lg cus-checkout-btn"
                        onClick={() => addPaymentMethod(bank.tender_type)}
                      >
                        {bank.tender_type}
                      </Button>
                    </Col>
                  ))}
                </Row>
              </Row>

              <Row className="justify-content-between py-2">
                <Col md={10}>
                  <p className="fs-8">Print Receipt</p>
                </Col>
                <Col md={2}>
                  <Form>
                    <Form.Check
                      type="switch"
                      id="custom-switch"
                      checked={printReceipt}
                      onChange={() => setPrintReceipt(!printReceipt)}
                    />
                  </Form>
                </Col>
              </Row>

              <Row className="justify-content-between pt-4">
                <Col md={10}>
                  <p
                    className="fs-8"
                    style={{ color: "red", cursor: "pointer" }}
                    onClick={() => setNoPaymentClicked(!noPaymentClicked)}
                  >
                    Close without payment
                  </p>
                </Col>
                <Col md={2}>
                  <button
                    disabled={!isPaymentSufficient()}
                    className="btn btn-success"
                    onClick={completeBill}
                    style={{
                      backgroundColor: isPaymentSufficient()
                        ? "#f07632"
                        : "grey",
                    }}
                  >
                    Pay Now
                  </button>
                </Col>
              </Row>
            </CardLayout>
          </Col>
        )}
      </Row>
      <div style={{ display: "none" }}>
        <ThermalInvoice
          ref={componentRef}
          selectedProducts={selectedProducts}
          selectedProductsQty={selectedProductsQty}
          initialSubtotal={initialSubtotal}
          discount={discount}
          unit={unit}
          amountToPay={totalWithoutDiscount}
          totalTax={totalTax}
        />
      </div>
    </>
  );
};

export default CheckoutForm;
