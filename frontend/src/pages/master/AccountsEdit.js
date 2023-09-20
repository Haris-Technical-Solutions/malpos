import React from 'react'
import { Col,Row } from 'react-bootstrap'
import { CardLayout } from '../../components/cards'
import PageLayout from '../../layouts/PageLayout'
import { LabelField } from '../../components/fields'
export default function AccountsEdit() {
  return (
    <div>
        <PageLayout>
            <Row>
                <Col md={12}>
                    <CardLayout>
                        Accounts / Edit
                    </CardLayout>
                </Col>
                <Col md={12}>
                    <CardLayout>
                        <Row>
                            <Col md={4}>
                                <Row>
                                    <Col md={12}>
                                    <LabelField
                label="Name"
                type="text"
                placeholder="Name"
                fieldSize="w-100 h-md"
              />
                            </Col>
                            <Col md={12}>
                            <LabelField
                label="Type"
                type="text"
                placeholder="Type"
                fieldSize="w-100 h-md"
              />
                            </Col>
                            <Col md={12}>
                            <LabelField
                label="Amount"
                type="number"
                placeholder="0"
                fieldSize="w-100 h-md"
                disabled
              />
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
