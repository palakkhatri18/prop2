// YourProperty.js
import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import { submitPropertyForm } from '../services/api'; // Adjust the path as needed

const YourProperty = () => {
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
    date: '',
    category: '',
    query: '' 
  });

  const [feedbackMessage, setFeedbackMessage] = useState({ text: '', type: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await submitPropertyForm(formData);
      console.log('Form Data Submitted:', data);
      setFeedbackMessage({ text: 'Form submitted successfully!', type: 'success' });
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
        date: '',
        category: '',
        query: '' 
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      setFeedbackMessage({ text: 'Error submitting form. Please try again.', type: 'danger' });
    }
  };

  return (
    <Container>
      <Row className="justify-content-center mt-5">
        <Col md={8}>
          <h1 className="text-center mb-4">Enter the Details of your Property</h1>
          <Form onSubmit={handleSubmit}>
            {feedbackMessage.text && (
              <Alert variant={feedbackMessage.type} className="mb-3">
                {feedbackMessage.text}
              </Alert>
            )}
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
                as="select"
                name="status"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="">Select Status</option>
                <option value="raw">Raw</option>
                <option value="furnished">Furnished</option>
                <option value="semi-furnished">Semi-Furnished</option>
              </Form.Control>
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
                placeholder="Enter Tower/Plot"
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
                placeholder="Enter Demand/Budget"
                name="demand"
                value={formData.demand}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="formPartyName" className="mb-3">
              <Form.Control
                type="text"
                placeholder="Enter your Name"
                name="partyName"
                value={formData.partyName}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="formPartyContact" className="mb-3">
              <Form.Control
                type="text"
                placeholder="Enter Contact"
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
                <option value="rentout">Purchase</option>
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

            <Form.Group controlId="formMessage" className="mb-3">
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter any additional message or comments"
                name="query"
                value={formData.query}
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

export default YourProperty;
