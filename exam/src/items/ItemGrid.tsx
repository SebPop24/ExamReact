import React, { useState } from 'react';
import { Card, Col, Row, Modal } from 'react-bootstrap';
import { Item } from '../types/item';
import '../css/Grid.css';

interface ItemGridProps {
  items: Item[];
  apiUrl: string;
  onItemDeleted: (itemId: number) => void;
}

const ItemGrid: React.FC<ItemGridProps> = ({ items, apiUrl, onItemDeleted }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);

  const energiToKcal = (energi: number) => {
    return Math.round(energi / 4.184);
  };

  const handleCardClick = (item: Item) => {
    setSelectedItem(item);
    setShowModal(true);
  };

  return (
    <>
    <div className="grid">
      <Row xs={1} md={3} className="g-4">
        {items.map(item => (
          <Col key={item.itemId}>
            <div className="card">
              <a onClick={() => handleCardClick(item)} style={{ position: 'relative', cursor: 'pointer' }} className="w-100">
                <img 
                  src={`${apiUrl}${item.imageUrl}`} 
                  className="img-fluid custom-image-size card-img-top" 
                  alt={item.name} 
                />
                <div className="card-body">
                  <h5 className="card-title">{item.name}</h5>
                  <p className="card-text">{energiToKcal(item.energi_Kj)} kcal</p>
                </div>
                {item.hasGreenKeyhole && (
                  <img 
                    src="/images/green_keyhole.jpg" 
                    alt="Nøkkelhullsmerke" 
                    className="keyhole-icon" 
                  />
                )}
              </a>
            </div>
          </Col>
    
        ))}
      </Row>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedItem?.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedItem && (
            <div>
              <img 
                src={`${apiUrl}${selectedItem.imageUrl}`}
                alt={selectedItem.name}
                className="modal-image"
              />
              <div className="modal-details">
                <p>Energy: {energiToKcal(selectedItem.energi_Kj)} kcal</p>
                <p>Fat: {selectedItem.fett} g</p>
                <p>Protein: {selectedItem.protein} g</p>
                <p>Carbohydrates: {selectedItem.karbohydrat} g</p>
                <p>Salt: {selectedItem.salt} g</p>
              </div>
            </div>
          )}
        </Modal.Body>
      </Modal>
      </div>    
    </>
    
  );
};

export default ItemGrid;