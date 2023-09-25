import React, { useState, useEffect } from 'react';
import { Col, Row, Table } from 'react-bootstrap';
import IconSearchBar from '../elements/IconSearchBar';
import MultiSelectNoLabel from '../fields/MultiSelectNoLabel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faCheck, faEdit, faArrowTurnRight, faEllipsis, faCopy, faTrash, faDownload } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { Box } from '../elements';
import axiosInstance from "../../api/baseUrl";
import { useNavigate } from "react-router-dom";
import { Button } from 'react-bootstrap';

export default function SuppliesGeneralTab() {
  const [openDot, setOpenDot] = useState({}); // Maintain dot box state for each row
  const [supplyData, setSupplyData] = useState([]);
  const navigate = useNavigate();
  const toggleDotBox = (id) => {
    setOpenDot({ ...openDot, [id]: !openDot[id] }); // Toggle dot box state for the clicked row
  };

  useEffect(() => {
    // Fetch supply data using Axios when the component mounts
    axiosInstance.get('/md_supplies')
      .then(response => {
        setSupplyData(response.data);
      })
      .catch(error => {
        console.error('Error fetching supply data', error);
      });
  }, []); // The empty dependency array ensures this effect runs only once

  const options = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
    { value: 'option4', label: 'Option 4' },
    { value: 'option5', label: 'Option 5' },
  ];

  const handleSuppliesEdit = (id) =>{
    console.log("id: " + id);
    navigate(`/supplies-edit/`, {
      state: {
        id: id,
        action: "updateSupplies",
      },
    });
  };

  return (
    <div>
      <Row>
        <Col md={12}>
          <Row>
            <Col md={10}>
              <Row>
                <Col md={3}>
                  <IconSearchBar />
                </Col>
                <Col md={2}>
                  <MultiSelectNoLabel options={options} />
                </Col>
                {/* Add more MultiSelectNoLabel components as needed */}
              </Row>
            </Col>
            <Col md={2}>
              <Link to="/customer-create" style={{ float: "right" }}>
                <button className="acc-create-btn rs-btn-create">
                  <FontAwesomeIcon icon={faPlus} /> Create
                </button>
              </Link>
            </Col>
            <Col md={12}>
              <Box className={'cus-ptb'}>
                <Box className={'supplies-gen-table-wrap'}>
                  <Table style={{ width: '1200px' }}>
                    <thead className='thead-dark'>
                      <tr className='f-12'>
                        <th className='th-w50'>ID</th>
                        <th className='th-w150'>Products</th>
                        <th className='th-w130' title="Operation Time">Operation time</th>
                        <th className='th-w100'>Supplier</th>
                        <th className='th-w100'>Storage</th>
                        <th className='th-w100'>Amount<br />
                          <span>9742003 SAR</span>
                        </th>
                        <th className='th-w100'>Account</th>
                        <th className='th-w130'>Invoice#</th>
                        <th className='th-w100' title="Description">Description</th>
                        <th className='th-w100'>Process</th>
                        <th className='th-w100'>Status</th>
                        <th className='th-w50'></th>
                      </tr>
                    </thead>
                    <tbody>
                      {supplyData.map(supply => (
                        <tr className='f-13' key={supply.id}>
                          <td className='td-w50'>{supply.id}</td>
                          <td className='td-w150'>{supply?.supply_lines[0]?.product?.product_name}</td>
                          <td className='td-w130' title={supply.operation_time}>{`${supply.operation_time.substring(0, 10)}...`}</td>
                          <td className='td-w100'>{supply.supplier.supplier_name}</td>
                          <td className='td-w100'>{supply.storage.name}</td>
                          <td className='td-w100'>{supply.balance}</td>
                          <td className='td-w100'><span className='unpaid'> Unpaid</span></td>
                          <td className='td-w130'>{supply.invoice_no}</td>
                          <td className='td-w100' title={supply.description}>
                            {supply.description.length > 8? `${supply.description.substring(0, 8)}...` : supply.description}
                          </td>
                          <td className='td-w100'><span className='check'><FontAwesomeIcon icon={faCheck} color="#fff" /> </span></td>
                          <td className='td-w100'><span className='approved'>{supply.status || 'Approved'}</span></td>
                          <td className='td-w50'>
                            <Box className="dot-content">
                              <div onClick={() => toggleDotBox(supply.id)}><FontAwesomeIcon icon={faEllipsis} /> </div>
                              {openDot[supply.id] ? (
                                <Box className="DotBox-main-wrapper">
                                  <Box className="DotBox-inner">
                                    <Box className="DotBox-p-con" >
                                   
                                      <Button
                                  title="Edit"
                                  className="material-icons edit"
                                  onClick={() =>handleSuppliesEdit(supply.id)}
                                >
                                     <FontAwesomeIcon icon={faEdit}/> Edit
                                </Button>
                                    </Box>
                                    <Box className="DotBox-p-con">
                                      <FontAwesomeIcon icon={faArrowTurnRight} /> Product Return
                                    </Box>
                                    <Box className="DotBox-p-con">
                                      <FontAwesomeIcon icon={faCopy} /> Duplicate
                                    </Box>
                                    <Box className="DotBox-p-con">
                                      <FontAwesomeIcon icon={faTrash} /> Remove
                                    </Box>
                                    <Box className="DotBox-p-con">
                                      <FontAwesomeIcon icon={faDownload} /> Export
                                    </Box>
                                  </Box>
                                </Box>
                              ) : (
                                ""
                              )}
                            </Box>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Box>
              </Box>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
}
