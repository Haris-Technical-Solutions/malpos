import React,{useState} from 'react'
import { Col, Row, Form, Table } from 'react-bootstrap'
import { CardLayout } from '../../components/cards'
import PageLayout from '../../layouts/PageLayout'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faPlus, faMinus,faEllipsis, faCircleQuestion ,faTrash,faEdit} from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import { Box } from '../../components/elements'
export default function Suppliers() {
    const [open, Close] = useState(false);

    const handleDotBox = () => {
        Close(!open);
    };
    return (
        <div>
            <PageLayout>
                <Row>
                    <Col md={12}>
                        <CardLayout>
                            Suppliers
                        </CardLayout>
                    </Col>
                    <Col md={12}>
                        <CardLayout>
                            <Row>
                                <Col md={12}>
                                    <Row>
                                        <Col md={3}>
                                            <div style={{ position: "relative" }}>
                                                <Form.Control
                                                    type="search"
                                                    placeholder="Search"
                                                    className="search-pl"
                                                />
                                                <span
                                                    style={{
                                                        position: "absolute",
                                                        top: "50%",
                                                        right: "10px",
                                                        transform: "translateY(-50%)",
                                                        fontSize: "14px",
                                                    }}
                                                >
                                                    <button type="submit">
                                                        <FontAwesomeIcon icon={faSearch} />
                                                    </button>
                                                </span>
                                            </div>
                                        </Col>
                                        <Col md={3} className='col-md-suppiers-checkbox'>
                                            <Form.Check className='suppiers-checkbox'
                                                type='checkbox'
                                                label='Deleted Values'
                                            />
                                        </Col>
                                        <Col md={6}>
                                            <Box className='suppliers-r-btn'>
                                                <Link to={'/suppliers-create'} ><button className='acc-create-btn rs-btn-create'><FontAwesomeIcon icon={faPlus} /> Create </button></Link>
                                                <Link to={''} ><button className='acc-create-btn rs-btn-create payment-btn'><FontAwesomeIcon icon={faPlus} /> Make a Payment </button></Link>
                                            </Box>
                                        </Col>
                                        <Col md={12}>
                                                    <Box className={'suppliers-table-wrap'}>
                                                        <Table responsive>
                                                            <thead className='thead-dark'>
                                                                <tr >
                                                                <th className='th-w20'>Name</th>
                                                                <th className='th-w15 text-end'>Debt
                                                               {""} <FontAwesomeIcon icon={faCircleQuestion} color={"#f29b30"}/>
                                                                <br/>
                                                                <span className='debt'>-322670.00 SAR</span>
                                                                </th>
                                                                <th className='th-w15 text-end'>Balance
                                                                {""} <FontAwesomeIcon icon={faCircleQuestion} color={"#f29b30"}/>

                                                                <br/>
                                                                <span className='bal '>-02670.00 SAR</span>
                                                                </th>
                                                                <th className='th-w15'>Description</th>
                                                                    <th className='th-w15'>Phone</th>
                                                                    <th className='th-w10'>Tin</th>
                                                                    <th className='th-w10'></th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                <tr className='f-13'>
                                                                <td className='td-w20'><Link to={'/suppliers-details'} className={'link'}>Fish Market B</Link> </td>
                                                                <td className='td-w15 text-end'>322670.00</td>
                                                                <td className='td-w15 text-end'>322670.00</td>
                                                                <td className='td-w15'>توريدات القهوة المختصة</td>
                                                                    <td className='td-w15'>0123456789</td>
                                                                    <td className='td-w10'>
                                                                        <FontAwesomeIcon icon={faMinus}/>
                                                                    </td>
                                                                    <td className='td-w10'>
                                                                    <Box className="dot-content">
                                                            <div onClick={handleDotBox}><FontAwesomeIcon icon={faEllipsis} /> </div>
                                                            {open ? (
                                                                <Box className="DotBox-main-wrapper">
                                                                    <Box className="DotBox-inner">
                                                                        <Box className="DotBox-p-con">
                                                                            <FontAwesomeIcon icon={faEdit} /> Edit
                                                                        </Box>
                                                                        <Box className="DotBox-p-con">
                                                                            <FontAwesomeIcon icon={faTrash} /> Delete
                                                                        </Box>
                                                                    </Box>
                                                                </Box>
                                                            ) : (
                                                                ""
                                                            )}
                                                        </Box>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </Table>
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
