import React, { useState } from 'react';
import { Table, Modal } from 'react-bootstrap';
import { Item } from '../types/item';
import { Link } from 'react-router-dom';
import '../css/Table.css';

interface ItemTableProps {
  items: Item[];
  apiUrl: string;
  onItemDeleted: (itemId: number) => void;
  isAuthenticated?: boolean;
}

const ItemTable: React.FC<ItemTableProps> = ({ items, apiUrl, onItemDeleted, isAuthenticated }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);

  const handleRowClick = (item: Item) => {
    setSelectedItem(item);
    setShowModal(true);
  };

  return (
    <>
     <div className="table"> 
      <Table striped bordered hover style={{ overflowY: 'scroll' }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Food group</th>
            <th>Energy per 100g</th>
            <th>Fat per 100g</th>
            <th>Protein per 100g</th>
            <th>Carbohydrates per 100g</th>
            <th>Salt per 100g</th>
            <th>Image</th>
            <th>Keyhole</th>
            {isAuthenticated && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {items.map(item => (
            <tr key={item.itemId} onClick={() => handleRowClick(item)} className="open-modal">
              <td>{item.name}</td>
              <td>{item.food_Group}</td>
              <td>{item.energi_Kj} kj</td>
              <td>{item.fett} g</td>
              <td>{item.protein} g</td>
              <td>{item.karbohydrat} g</td>
              <td>{item.salt} g</td>
              <td>
                <img 
                  src={`${apiUrl}${item.imageUrl}`}
                  alt={item.name}
                  style={{ maxWidth: '50px', maxHeight: '50px', display: 'block', margin: '0 auto' }}
                />
              </td>
              <td>
                {item.hasGreenKeyhole && (
                  <img 
                    src="/images/green_keyhole.jpg"
                    alt="Keyhole"
                    style={{ maxWidth: '25px', maxHeight: '25px', display: 'block', margin: '0 auto' }}
                  />
                )}
              </td>
              {isAuthenticated && (
                <td className="action-links">
                  <Link to={`/itemupdate/${item.itemId}`} className="update-link">Update</Link>
                  <Link 
                    to="#"
                    onClick={(e) => {
                      e.stopPropagation();
                      onItemDeleted(item.itemId);
                    }}
                    className="delete-link"
                  >
                    Delete
                  </Link>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </Table>

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
                style={{ maxWidth: '100%', height: 'auto' }}
              />
              <p>Food Group: {selectedItem.food_Group}</p>
              <p>Energy: {selectedItem.energi_Kj} kj</p>
              <p>Fat: {selectedItem.fett} g</p>
              <p>Protein: {selectedItem.protein} g</p>
              <p>Carbohydrates: {selectedItem.karbohydrat} g</p>
              <p>Salt: {selectedItem.salt} g</p>
            </div>
          )}
        </Modal.Body>
      </Modal>
      </div>
    </>

  );
};

export default ItemTable;
