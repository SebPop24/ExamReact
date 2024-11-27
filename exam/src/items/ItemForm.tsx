import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { Item } from '../types/item';

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
  initialData}) => {
  const [name, setName] = useState<string>(initialData?.name || '');
  const [food_Group, setFoodGroup] = useState<string>(initialData?.food_Group || '');
  const [energi_Kj, setEnergiKj] = useState<number>(initialData?.energi_Kj || 0);
  const [fett, setFett] = useState<number>(initialData?.fett || 0);
  const [protein, setProtein] = useState<number>(initialData?.protein || 0);
  const [karbohydrat, setKarbohydrat] = useState<number>(initialData?.karbohydrat || 0);
  const [salt, setSalt] = useState<number>(initialData?.salt || 0);
  const [imageUrl, setImageUrl] = useState<string>(initialData?.imageUrl || '');
  const [hasGreenKeyhole, setHasGreenKeyhole] = useState<boolean>(initialData?.hasGreenKeyhole || false);
  //const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const onCancel = () => {
  navigate(-1); // Navigate back
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const item: Item = {itemId, name, food_Group, energi_Kj, fett,protein, karbohydrat, salt, imageUrl, hasGreenKeyhole,
    };
    onItemChanged(item); // Call the passed function with the item data

  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formItemName">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter item name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          //Legg til input validation her
        />
      </Form.Group>

      <Form.Group controlId="formFoodGroup">
        <Form.Label>Food Group</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter food group"
          value={food_Group}
          onChange={(e) => setFoodGroup(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group controlId="formEnergiKj">
        <Form.Label>Energi (kJ)</Form.Label>
        <Form.Control
          type="number"
          placeholder="Enter energy (kJ)"
          value={energi_Kj}
          onChange={(e) => setEnergiKj(Number(e.target.value))}
          required
          min="0"
          step="0.01"
        />
      </Form.Group>

      <Form.Group controlId="formFett">
        <Form.Label>Fett (g)</Form.Label>
        <Form.Control
          type="number"
          placeholder="Enter fat content (g)"
          value={fett}
          onChange={(e) => setFett(Number(e.target.value))}
          required
          min="0"
          step="0.01"
        />
      </Form.Group>

      <Form.Group controlId="formProtein">
        <Form.Label>Protein (g)</Form.Label>
        <Form.Control
          type="number"
          placeholder="Enter protein content (g)"
          value={protein}
          onChange={(e) => setProtein(Number(e.target.value))}
          required
          min="0"
          step="0.01"
        />
      </Form.Group>

      <Form.Group controlId="formKarbohydrat">
        <Form.Label>Karbohydrat (g)</Form.Label>
        <Form.Control
          type="number"
          placeholder="Enter carbohydrate content (g)"
          value={karbohydrat}
          onChange={(e) => setKarbohydrat(Number(e.target.value))}
          required
          min="0"
          step="0.01"
        />
      </Form.Group>

      <Form.Group controlId="formSalt">
        <Form.Label>Salt (g)</Form.Label>
        <Form.Control
          type="number"
          placeholder="Enter salt content (g)"
          value={salt}
          onChange={(e) => setSalt(Number(e.target.value))}
          required
          min="0"
          step="0.01"
        />
      </Form.Group>

      <Form.Group controlId="formImageUrl">
        <Form.Label>Image URL</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter image URL"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="formHasGreenKeyhole">
        <Form.Check
          type="checkbox"
          label="Has Green Keyhole"
          checked={hasGreenKeyhole}
          onChange={(e) => setHasGreenKeyhole(e.target.checked)}
        />
      </Form.Group>

      <Button variant="primary" type="submit">{isUpdate ? 'Update Item' : 'Create Item'}</Button>
      <Button variant="secondary" onClick={onCancel} className="ms-2">
        Cancel
      </Button>
    </Form>
  );
};

export default ItemForm;

