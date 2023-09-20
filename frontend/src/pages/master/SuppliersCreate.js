import React from 'react'
import { Col, Row } from 'react-bootstrap'
import { Label } from '../../components/elements'
import { CardLayout } from '../../components/cards'
import { LabelField } from '../../components/fields'
import PageLayout from '../../layouts/PageLayout'
import { Box } from '../../components/elements'
export default function SuppliersCreate() {
    return (
        <div>
            <PageLayout>
                <Row>
                    <Col md={12}>
                        <CardLayout>
                            Suppliers Create
                        </CardLayout>
                    </Col>
                    <Col md={12}>
                        <CardLayout>
                            <Row>
                                <Col md={4}>
                                    <Row>
                                        <Col md={12}>
                                            <Box className='cus-mt-5' >
                                                <LabelField type={'text'} placeholder='Name' label={'Name'} />
                                            </Box>
                                            <Box className='cus-mt-5'>
                                                <LabelField type={'number'} placeholder='Phone' label={'Phone'} />
                                            </Box>
                                            <Box className='cus-mt-5'>
                                                <LabelField type={'text'} placeholder='Tin' label={'Tin'} />
                                            </Box>
                                            <Box className='cus-mt-5'>
                                                <Label
                                                    for="Description"
                                                    style={{ color: "#403e57", fontSize: "14px" }}
                                                >
                                                    Description
                                                </Label>
                                                <textarea
                                                    style={{ fontSize: "12px" }}
                                                    id="description"
                                                    className="form-control"
                                                    rows={5}
                                                ></textarea>
                                            </Box>
                                        </Col>

                                    </Row>
                                </Col>
                            </Row>
                        </CardLayout>
                    </Col>
                </Row>
            </PageLayout>
        </div>
    )
}
