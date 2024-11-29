import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { Item } from '../types/item';
import '../css/Form.css';

interface ItemFormProps {
  onItemChanged: (newItem: Item) => void;
  itemId?: number;
  isUpdate?: boolean;
  initialData?: Item;
}

const ItemForm: React.FC<ItemFormProps> = ({
  onItemChanged, 
  itemId, 
  isUpdate = false,
  initialData
}) => {
  const [name, setName] = useState<string>(initialData?.name || '');
  const [food_Group, setFoodGroup] = useState<string>(initialData?.food_Group || '');
  const [energi_Kj, setEnergiKj] = useState<number | undefined>(initialData?.energi_Kj || undefined);
  const [fett, setFett] = useState<number | undefined>(initialData?.fett || undefined);
  const [protein, setProtein] = useState<number | undefined>(initialData?.protein || undefined);
  const [karbohydrat, setKarbohydrat] = useState<number | undefined>(initialData?.karbohydrat || undefined);
  const [salt, setSalt] = useState<number | undefined>(initialData?.salt || undefined);
  const [imageUrl, setImageUrl] = useState<string>(initialData?.imageUrl || '');
  const [hasGreenKeyhole, setHasGreenKeyhole] = useState<boolean>(initialData?.hasGreenKeyhole || false);
  const navigate = useNavigate();

  const onCancel = () => {
    navigate(-1);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const item: Item = {
      itemId,
      name,
      food_Group,
      energi_Kj: energi_Kj || 0,
      fett: fett || 0,
      protein: protein || 0,
      karbohydrat: karbohydrat || 0,
      salt: salt || 0,
      imageUrl,
      hasGreenKeyhole,
    };
    onItemChanged(item);
  };

  return (
    <div className="form-wrapper">
      <h2 className="form-title">{isUpdate ? 'Update Item' : 'Create New Item'}</h2>
      <Form onSubmit={handleSubmit} className="custom-form">
        <Form.Group className="form-group">
          <Form.Control
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="form-group">
          <Form.Select
            value={food_Group}
            onChange={(e) => setFoodGroup(e.target.value)}
            required
          >
            <option value="">Select Food Group</option>
            <option value="dairy">Dairy</option>
            <option value="meat">Meat</option>
            <option value="vegetables">Vegetables</option>
            <option value="nuts">Nuts</option>
            <option value="sauce">Sauce</option>
            <option value="berries">Berries</option>
            <option value="beverages">Beverages</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="form-group">
          <Form.Control
            type="number"
            placeholder="Energy per 100g"
            value={energi_Kj === undefined ? '' : energi_Kj}
            onChange={(e) => {
              const value = e.target.value;
              if (value === '') {
                setEnergiKj(undefined);
              } else {
                setEnergiKj(Number(value));
              }
            }}
            required
            min="0"
            step="0.01"
          />
        </Form.Group>

        <Form.Group className="form-group">
          <Form.Control
            type="number"
            placeholder="Fat per 100g"
            value={fett === undefined ? '' : fett}
            onChange={(e) => {
              const value = e.target.value;
              if (value === '') {
                setFett(undefined);
              } else {
                setFett(Number(value));
              }
            }}
            required
            min="0"
            step="0.01"
          />
        </Form.Group>

        <Form.Group className="form-group">
          <Form.Control
            type="number"
            placeholder="Protein per 100g"
            value={protein === undefined ? '' : protein}
            onChange={(e) => {
              const value = e.target.value;
              if (value === '') {
                setProtein(undefined);
              } else {
                setProtein(Number(value));
              }
            }}
            required
            min="0"
            step="0.01"
          />
        </Form.Group>

        <Form.Group className="form-group">
          <Form.Control
            type="number"
            placeholder="Carbohydrates per 100g"
            value={karbohydrat === undefined ? '' : karbohydrat}
            onChange={(e) => {
              const value = e.target.value;
              if (value === '') {
                setKarbohydrat(undefined);
              } else {
                setKarbohydrat(Number(value));
              }
            }}
            required
            min="0"
            step="0.01"
          />
        </Form.Group>

        <Form.Group className="form-group">
          <Form.Control
            type="number"
            placeholder="Salt per 100g"
            value={salt === undefined ? '' : salt}
            onChange={(e) => {
              const value = e.target.value;
              if (value === '') {
                setSalt(undefined);
              } else {
                setSalt(Number(value));
              }
            }}
            required
            min="0"
            step="0.01"
          />
        </Form.Group>

        <Form.Group className="form-group">
          <Form.Control
            type="text"
            placeholder="Image url"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="form-group">
          <Form.Check
            type="checkbox"
            label="Has Green Keyhole"
            checked={hasGreenKeyhole}
            onChange={(e) => setHasGreenKeyhole(e.target.checked)}
          />
        </Form.Group>

        <div className="button-group">
          <Button variant="success" type="submit">
            {isUpdate ? 'Update Item' : 'Create Item'}
          </Button>
          <Button variant="outline-success" onClick={onCancel}>
            Cancel
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default ItemForm;