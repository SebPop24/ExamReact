import React, { useState } from 'react';
import { Table, Modal } from 'react-bootstrap';
import { Item } from '../types/item';
import { Link } from 'react-router-dom';
import Details from './ItemModal'; // Import your updated Details component
import '../css/Table.css';

interface ItemTableProps {
  items: Item[];
  apiUrl: string;
  onItemDeleted: (itemId: number) => void;
  isAuthenticated?: boolean;
}

const ItemTable: React.FC<ItemTableProps> = ({ items, apiUrl, onItemDeleted}) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);

  const handleRowClick = (item: Item) => {
    setSelectedItem(item);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedItem(null);
  };

  return (
    <>
      <div className="table">
        <Table striped bordered style={{ overflowY: 'scroll' }}>
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
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.itemId} onClick={() => handleRowClick(item)} className="open-modal">
                <td style={{ fontWeight: 700 }}>{item.name}</td>
                <td>{item.food_Group}</td>
                <td>{item.energi_Kj} kj</td>
                <td>{item.fett} g</td>
                <td>{item.protein} g</td>
                <td>{item.karbohydrat} g</td>
                <td>{item.salt} g</td>
                <td>
                  <img
                    src={`${item.imageUrl}`}
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
                
                  <td>
                    <div style={{'display': 'flex'}}>
                      <Link to={`/itemupdate/${item.itemId}`} className="update-link"> Update</Link>
                      <Link style={{marginLeft: '5px'}} to="#"onClick={(e) => { e.stopPropagation(); onItemDeleted(item.itemId);}} className="delete-link"> Delete </Link>
                    </div>
                  </td>
              </tr>
            ))}
          </tbody>
        </Table>

        {/* Item Details Modal */}
        {selectedItem && (
          <Details
            showModal={showModal}
            handleClose={handleCloseModal}
            name={selectedItem.name}
            hasGreenKeyhole={selectedItem.hasGreenKeyhole}
            imageUrl={selectedItem.imageUrl}
            foodGroup={selectedItem.food_Group}
            energyKj={selectedItem.energi_Kj}
            fat={selectedItem.fett}
            protein={selectedItem.protein}
            carbohydrate={selectedItem.karbohydrat}
            salt={selectedItem.salt}
            itemId={selectedItem.itemId}
            onUpdate={(id) => console.log(`Update item ${id}`)} // Replace with actual update logic
            onDelete={(id) => console.log(`Delete item ${id}`)} // Replace with actual delete logic
          />
        )}
      </div>
    </>
  );
};

export default ItemTable;
