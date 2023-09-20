import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { CardLayout } from "../../components/cards";
import { Box, Text } from "../../components/elements";
import PageLayout from "../../layouts/PageLayout";
import OrderLineTable1 from "./OrderLineTable1";
import CusTabButtons from "../../components/elements/CusTabButtons";
import OrderLineTable2 from "./OrderLineTable2";
import Sidebar from "../../layouts/Sidebar";
import LayoutWithoutSidebar from "../../layouts/LayoutWithoutSidebar";
import LayoutMain from "../../layouts/LayoutMain";

export default function OrdersLine() {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleItemClick = (index) => {
    setActiveIndex(index);
  };

  const buttonList = [
    { text: "First Floor", index: 0, id: "" },
    { text: "Second Floor", index: 1, id: "1" },
  ];
  return (
    <div>
      <LayoutMain>
        <Row>
          <Col md={12}>
            <CardLayout className={"f-13 cusTabsbuttons"}>
              {buttonList.map((buttonText) => (
                <CusTabButtons
                  key={buttonText.index}
                  buttonText={buttonText}
                  activeIndex={activeIndex}
                  handleItemClick={handleItemClick}
                />
              ))}
            </CardLayout>
          </Col>
          {activeIndex === 0 && <OrderLineTable1 />}
          {activeIndex === 1 && <OrderLineTable2 />}
        </Row>
      </LayoutMain>
    </div>
  );
}
