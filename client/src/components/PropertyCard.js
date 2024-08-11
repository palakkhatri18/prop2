import React from 'react';
import { Card, Button } from 'react-bootstrap';

const PropertyCard = ({ item, isAdmin, showAddToCart, onAddToCart }) => {
  return (
    <Card>
      <Card.Body>
        <Card.Title><strong>BHK:</strong> {item.BHK}</Card.Title>
        <Card.Text><strong>Area:</strong> {item.area}</Card.Text>
        <Card.Text><strong>Tower:</strong> {item.tower}</Card.Text>
        <Card.Text><strong>Floor:</strong> {item.floor}</Card.Text>
        <Card.Text><strong>Demand:</strong> {item.demand}</Card.Text>
        {isAdmin && (
          <>
            <Card.Text><strong>Party Name:</strong> {item.partyName}</Card.Text>
            <Card.Text><strong>Party Contact:</strong> {item.partyContact}</Card.Text>
            <Card.Text><strong>Date:</strong> {new Date(item.date).toLocaleDateString()}</Card.Text>
          </>
        )}
        <Card.Text><strong>Society:</strong> {item.society}</Card.Text>
        <Card.Text><strong>Category:</strong> {item.category}</Card.Text>
        {showAddToCart && (
          <Button
            variant="primary"
            onClick={() => onAddToCart(item._id)}
          >
            ADD TO CART
          </Button>
        )}
      </Card.Body>
    </Card>
  );
};

export default PropertyCard;
