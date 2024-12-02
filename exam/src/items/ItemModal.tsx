import React from "react";
import { Modal, Button } from "react-bootstrap";
import "../assets/css/Details.css";
import { Link } from "react-router-dom";

//Defines props for a `Details` component, including modal visibility, item details, and callback functions for updating and deleting an item.
interface DetailsProps {
  showModal: boolean;
  handleClose: () => void;
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
  //Renders a modal displaying detailed information about an item, including an image, nutritional facts, and actions for updating or deleting the item.
  showModal,
  handleClose,
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
          <strong>{name}</strong>{" "}
          {hasGreenKeyhole && (
            <img
              src="/images/green_keyhole.jpg"
              alt="Nøkkelhullsmerke"
              className="keyhole-icon"
            />
          )}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="details">
          <div className="row gx-5 my-3">
            {/* Image Section */}
            <div className="col-md-5 position-relative">
              <img
                alt={name}
                src={imageUrl}
                className="product-image img-fluid"
              />
            </div>

            {/* Nutritional Information Section */}
            <div className="col-md-7">
              {/* Nutritional Information in a dropdown that starts open */}
              <details className="nutrition-details" open>
                <summary className="summary-subtle">
                  Nutritional content per 100 gram
                </summary>
                <div className="nutrition-table-container">
                  <table>
                    <tbody>
                      <tr>
                        <td>Type:</td>
                        <td>{foodGroup}</td>
                      </tr>
                      <tr>
                        <td>Energy:</td>
                        <td>{energyKj} kj</td>
                      </tr>
                      <tr>
                        <td>Fat:</td>
                        <td>{fat} g</td>
                      </tr>
                      <tr>
                        <td>Protein:</td>
                        <td>{protein} g</td>
                      </tr>
                      <tr>
                        <td>Carbohydrates:</td>
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
                  <Link to={`/itemupdate/${itemId}`} className="update-link">
                    {" "}
                    Update
                  </Link>
                  <button
                    style={{ marginLeft: "5px" }}
                    className="delete-link"
                    onClick={() => onDelete(itemId)}
                  >
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
