import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { Item } from "../types/item";
import Details from "./ItemModal"; // Import your updated Details component
import "../assets/css/Grid.css";

//Defines props for `ItemGrid`, including an array of items, the API URL, and a callback for item deletion.
interface ItemGridProps {
  items: Item[];
  apiUrl: string;
  onItemDeleted: (itemId: number) => void;
}

// Defines `ItemGrid` component to display items, manage modal visibility for details, and convert energy values to kcal.
// Includes handlers for card clicks and modal closure.
const ItemGrid: React.FC<ItemGridProps> = ({
  items,
  apiUrl,
  onItemDeleted,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);

  const energiToKcal = (energi: number) => {
    return Math.round(energi / 4.184);
  };

  const handleCardClick = (item: Item) => {
    setSelectedItem(item);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedItem(null);
  };

  return (
    <>
      {/* Grid of Items */}
      <div className="grid">
        <Row xs={1} md={3} className="g-4">
          {items.map((item) => (
            <Col key={item.itemId}>
              <div className="card">
                <a
                  onClick={() => handleCardClick(item)}
                  style={{ position: "relative", cursor: "pointer" }}
                  className="w-100"
                >
                  <img
                    src={`${item.imageUrl}`}
                    className="img-fluid custom-image-size card-img-top"
                    alt={item.name}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{item.name}</h5>
                    <p className="card-text">
                      {energiToKcal(item.energi_Kj)} kcal
                    </p>
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
      </div>

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
          onUpdate={(id) => console.log(`Update item ${id}`)}
          onDelete={onItemDeleted}
        />
      )}
    </>
  );
};

export default ItemGrid;
