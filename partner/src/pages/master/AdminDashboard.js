import React from "react";
import { Col, Row, Table } from "react-bootstrap";
import { CardLayout } from "../../components/cards";
import PageLayout from "../../layouts/PageLayout";
import LineChart from "../../components/charts/LineChart";
import { Box } from "../../components/elements";
import MyLineChart from "../../components/charts/MyLineChart";
import ClientRequest from "../../components/ClientRequest";
import data from "../../data/clientsRequestData.json";
import internalData from "../../data/internalTasksData.json"
import InternalTaskList from "../../components/internalTaskList/InternalTaskList";

export default function AdminDashboard() {
  //   const data = [
  //     { name: "Jan", value: 400 },
  //     { name: "Feb", value: 300 },
  //     { name: "Mar", value: 500 },
  //     { name: "Apr", value: 200 },
  //     { name: "May", value: 600 },
  //     { name: "Jun", value: 450 },
  //   ];
  return (
    <div>
      <PageLayout>
        <Row>
          <Col md={12}>
            <Row>
              <Col md={12}>
                <CardLayout>
                  {console.log(data)}
                  <ClientRequest
                    title="Client Requests"
                    dotsMenu={data?.deals.dotsMenu}
                    table={data?.deals.table}
                  />
                </CardLayout>
              </Col>
              <Col md={12}>
                <CardLayout>
                  <InternalTaskList
                    title={internalData?.clients.title}
                    dotsMenu={internalData?.clients.dotsMenu}
                    table={internalData?.clients.table}
                  />
                </CardLayout>
              </Col>
              {/* <Col md={4} >
                               <CardLayout>
                               <Box className='expricing-box'>
                                    <h6 className='m-sub'>Monthly Subcribtion Payment</h6>
                                </Box>
                                <hr/>
                                <Box className={'f-12'}>
                               <MyLineChart data={data} dataKey="value" lineColor="#8884d8" />
                               </Box>
                              </CardLayout>
                              <CardLayout>
                              <h6 className='brand-stat'>Bands Statatics (2)</h6>
                                <Box className={'brand-stat-2'}>
                                    <Box>
                                        <span>Average</span> 1393.2
                                    </Box>
                                    <Box>
                                        <span>Total</span> 1393.254334645
                                    </Box>
                                </Box>
                              </CardLayout>
                              <CardLayout>
                              <h6 className='brand-stat'>Price</h6>
                              <Box className={'f-12'}>
                              70m<br/>
                              445346645.500
                              </Box>       
                              </CardLayout>
                              <CardLayout>
                              <h6 className='brand-stat'>Count</h6>
                              <Box className={'f-12'}>
                              1<br/>
                              1145346645.500
                              </Box>  
                                
                              </CardLayout>
                            </Col>
                            <Col md={4}>
                                <CardLayout>
                                <Box className='expricing-box'>
                                    <h6 className='expricing'>Expricing</h6>
                                </Box>
                                <hr/>
                                <Box className={'expricing-details'}>
                                <Box className={'expricing-details-items'}>
                                    #Brand
                                </Box>
                                <Box className={'expricing-details-items'}>
                                    Expired
                                </Box>
                                <Box className={'expricing-details-items'}>
                                    Monthly
                                </Box>
                                <Box className={'expricing-details-items'}>
                                    Total
                                </Box>
                                </Box>
                                </CardLayout>
                            </Col>
                            <Col md={4}>
                            <CardLayout>
                                <Box className='expricing-box'>
                                    <h6 className='expired'>Expired</h6>
                                </Box>
                                <hr/>
                                <Box className={'expricing-details'}>
                                <Box className={'expricing-details-items'}>
                                    #Brand
                                </Box>
                                <Box className={'expricing-details-items'}>
                                    Expired
                                </Box>
                                <Box className={'expricing-details-items'}>
                                    Monthly
                                </Box>
                                <Box className={'expricing-details-items'}>
                                    Total
                                </Box>
                                </Box>
                                </CardLayout>
                            </Col> */}
            </Row>
          </Col>
        </Row>
      </PageLayout>
    </div>
  );
}
