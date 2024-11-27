import React from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import { Item } from '../types/item';

interface ItemGridProps {
  items: Item[];
  apiUrl: string;
}

const ItemGrid: React.FC<ItemGridProps> = ({ items, apiUrl }) => {
  
  
    return (
    <div>
      <Row xs={1} sm={2} md={3} lg={4} className="g-4">
        {items.map(item => (
          <Col key={item.itemId}>
            <Card>
              <Card.Img variant="top" src={`${apiUrl}${item.imageUrl}`} alt={item.name} />
              <Card.Body>
                <Card.Title>{item.name}</Card.Title>
                <Card.Text>Food Group: {item.food_Group}</Card.Text>
                <Card.Text>Energy: {item.energi_Kj} kJ</Card.Text>
                <Card.Text>Fat: {item.fett} g</Card.Text>
                <Card.Text>Protein: {item.protein} g</Card.Text>
                <Card.Text>Carbohydrate: {item.karbohydrat} g</Card.Text>
                <Card.Text>Salt: {item.salt} g</Card.Text>
                <Card.Text>Has Green Keyhole: {item.hasGreenKeyhole ? 'Yes' : 'No'}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default ItemGrid;
