import React from 'react'
import { Col, Row ,Form} from 'react-bootstrap'
import { CardLayout } from '../../components/cards'
import { Box } from '../../components/elements'
import { LabelField } from '../../components/fields'
import PageLayout from '../../layouts/PageLayout'

export default function StorageEdit() {
  return (
    <div>
        <PageLayout>
            <Row>
                <Col md={12}>
                    <CardLayout>
                    Stoarge Edit
                    </CardLayout>
                </Col>
                <Col md={12}>
                    <CardLayout>
                        <Row>
                            <Col md={6}>
                                <LabelField type='text' placeholder={'Name'}/>
                               <Box className={'storageEdit-switch'}>
                               <Form.Check className='switch'
                                 type="switch"
                                id="custom-switch"
                                label="Status"/>
                               </Box>
                            </Col>
                        </Row>
                    </CardLayout>
                </Col>
            </Row>
        </PageLayout>
    </div>
  )
}
