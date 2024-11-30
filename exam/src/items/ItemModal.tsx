import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import '../css/Details.css';

interface DetailsProps {
  showModal: boolean; // Added this prop to control the visibility of the modal
  handleClose: () => void; // Added this prop to close the modal
  name: string;
  hasGreenKeyhole: boolean;
  imageUrl: string;
  foodGroup: string;
  energyKj: number;
  fat: number;
  protein: number;
  carbohydrate: number;
  salt: number;
  itemId: number;
  onUpdate: (id: number) => void;
  onDelete: (id: number) => void;
}

const Details: React.FC<DetailsProps> = ({
  showModal, // Use this to control modal visibility
  handleClose, // Function to handle modal close
  name,
  hasGreenKeyhole,
  imageUrl,
  foodGroup,
  energyKj,
  fat,
  protein,
  carbohydrate,
  salt,
  itemId,
  onUpdate,
  onDelete,
}) => {
  return (
    <Modal size={"lg"} show={showModal} onHide={handleClose}>
      <Modal.Header style={{ fontWeight: "700" }} closeButton>
        <Modal.Title>
          <strong>{name}</strong> {hasGreenKeyhole && (
            <img src="/images/green_keyhole.jpg" alt="Nøkkelhullsmerke" className="keyhole-icon" />
          )}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className='details'>
          <div className="row gx-5 my-3">
            {/* Image Section */}
            <div className="col-md-5 position-relative">
              <img alt={name} src={imageUrl} className="product-image img-fluid" />
            </div>

            {/* Nutritional Information Section */}
            <div className="col-md-7">
              {/* Nutritional Information in a dropdown that starts open */}
              <details className="nutrition-details" style={{ marginTop: '-20px' }} open>
              <summary className="summary-subtle">Næringsinnhold per 100 gram</summary>
                <div className="nutrition-table-container">
                  <table>
                    <tbody>
                      <tr>
                        <td>Type:</td>
                        <td>{foodGroup}</td>
                      </tr>
                      <tr>
                        <td>Energi:</td>
                        <td>{energyKj} kj</td>
                      </tr>
                      <tr>
                        <td>Fett:</td>
                        <td>{fat} g</td>
                      </tr>
                      <tr>
                        <td>Protein:</td>
                        <td>{protein} g</td>
                      </tr>
                      <tr>
                        <td>Karbohydrat:</td>
                        <td>{carbohydrate} g</td>
                      </tr>
                      <tr>
                        <td>Salt:</td>
                        <td>{salt} g</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="static-actions mb-3">
                    <button className="update-link" onClick={() => onUpdate(itemId)}>
                      Update
                    </button>
                    <button className="delete-link" onClick={() => onDelete(itemId)}>
                      Delete
                    </button>
                </div>
              </details>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default Details;
