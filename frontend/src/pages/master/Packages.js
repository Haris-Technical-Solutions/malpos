import React,{useState} from 'react'
import { Col, Row, Form, Tab } from 'react-bootstrap'
import { CardLayout } from '../../components/cards'
import PageLayout from '../../layouts/PageLayout'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faPlus, faCheck, faEllipsis, faEdit,faTrash,faMinus } from '@fortawesome/free-solid-svg-icons'
import { Box } from '../../components/elements'
import { Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'
export default function Packages() {
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
                            Packages
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
                                        <Col md={9}>
                                            <Link to={'/packages-create'} style={{ float: "right" }} ><button className='acc-create-btn rs-btn-create'><FontAwesomeIcon icon={faPlus} /> Create </button></Link>

                                        </Col>
                                        <Col md={12}>
                                            <Box className={'pacakes-table-wrap'}>
                                                <Table>
                                                    <thead className='thead-dark'>
                                                        <tr>
                                                            <th className='th-w30'>Name</th>
                                                            <th className='th-w30'>Equal</th>
                                                            <th className='th-w30'>Unit</th>
                                                            <th className='th-w10'></th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td className='th-w30'>Bottle 940 GRMS</td>
                                                            <td className='th-w30'>3000</td>
                                                            <td className='th-w30'>pcs</td>
                                                            <td className='th-w10'>
                                                            <Box className="dot-content">
                                                            <div onClick={handleDotBox}><FontAwesomeIcon icon={faEllipsis} /> </div>
                                                            {open ? (
                                                                <Box className="DotBox-main-wrapper">
                                                                    <Box className="DotBox-inner">
                                                                       <Link to={'/packages-create'}> <Box className="DotBox-p-con">
                                                                            <FontAwesomeIcon icon={faEdit} /> Edit
                                                                        </Box>
                                                                        </Link>
                                                                        <Box className="DotBox-p-con">
                                                                            <FontAwesomeIcon icon={faTrash} /> Remove
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
