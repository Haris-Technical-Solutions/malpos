import React from 'react'
import { Col, Row } from 'react-bootstrap'
import { LabelField } from '../../components/fields'
import { CardLayout } from '../../components/cards'
import PageLayout from '../../layouts/PageLayout'

export default function PackagesCreate() {
    const options = [
        { value: 'option1', label: 'Option 1' },
        { value: 'option2', label: 'Option 2' },
        { value: 'option3', label: 'Option 3' },
      ];
  return (
    <div>
        <PageLayout>
            <Row>
                <Col md={12}>
                    <CardLayout>
                        Packages /Create
                    </CardLayout>
                </Col>
                <Col md={12}>
                    
                    <CardLayout>
                        <Col md={8}>
                    <Row>
                        <Col md={12}>
                        <LabelField type={'text'} placeholder={'Name'} label={'Name'}/>
                        <LabelField type={'number'} placeholder={'Equal'} label={'Equal'}/>
                        <LabelField
                        label={'Unit'}
  type="select"
  option={options}
  placeholder="Select Unit"
  labelDir="label-col"
  fieldSize="field-select cus-w-300 h-md"
/>
                        </Col>
                        
                    </Row>
                    </Col>
                    </CardLayout>
                </Col>
            </Row>
        </PageLayout>
    </div>
  )
}
