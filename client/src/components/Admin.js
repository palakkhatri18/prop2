import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { submitFormData } from '../services/api'; // Import the API function

const AdminPage = () => {
  const [formData, setFormData] = useState({
    BHK: '',
    status: '',
    area: '',
    tower: '',
    floor: '',
    demand: '',
    partyName: '',
    partyContact: '',
    society: '',
    date: '', // Add date field to state
    category: '', // Add category field to state
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send form data to the backend using the submitFormData function
      const response = await submitFormData(formData);
      console.log('Form Data Submitted:', response);
      // Clear form fields after successful submission
      setFormData({
        BHK: '',
        status: '',
        area: '',
        tower: '',
        floor: '',
        demand: '',
        partyName: '',
        partyContact: '',
        society: '',
        date: '', // Clear the date field
        category: '', // Clear the category field
      });
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <Container>
      <Row className="justify-content-center mt-5">
        <Col md={8}>
          <h1 className="text-center mb-4">Admin Page</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBHK" className="mb-3">
              <Form.Control
                type="text"
                placeholder="Enter BHK"
                name="BHK"
                value={formData.BHK}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="formStatus" className="mb-3">
              <Form.Control
                type="text"
                placeholder="Enter Status"
                name="status"
                value={formData.status}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="formArea" className="mb-3">
              <Form.Control
                type="text"
                placeholder="Enter Area"
                name="area"
                value={formData.area}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="formTower" className="mb-3">
              <Form.Control
                type="text"
                placeholder="Enter Tower"
                name="tower"
                value={formData.tower}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="formFloor" className="mb-3">
              <Form.Control
                type="text"
                placeholder="Enter Floor"
                name="floor"
                value={formData.floor}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="formDemand" className="mb-3">
              <Form.Control
                type="text"
                placeholder="Enter Demand"
                name="demand"
                value={formData.demand}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="formPartyName" className="mb-3">
              <Form.Control
                type="text"
                placeholder="Enter Party Name"
                name="partyName"
                value={formData.partyName}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="formPartyContact" className="mb-3">
              <Form.Control
                type="text"
                placeholder="Enter Party Contact"
                name="partyContact"
                value={formData.partyContact}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="formSociety" className="mb-3">
              <Form.Control
                type="text"
                placeholder="Enter Society Name"
                name="society"
                value={formData.society}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="formCategory" className="mb-3">
              <Form.Control
                as="select"
                name="category"
                value={formData.category}
                onChange={handleChange}
              >
                <option value="">Select Category</option>
                <option value="rent">Rent</option>
                <option value="sale">Sale</option>
                <option value="rentout">Rent Out</option>
              </Form.Control>
            </Form.Group>
            
            <Form.Group controlId="formDate" className="mb-3">
              <Form.Control
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminPage;
