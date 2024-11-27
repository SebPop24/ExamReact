import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ItemForm from './ItemForm';
import { Item } from '../types/item';
//import API_URL from '../apiConfig';
const API_URL = 'http://localhost:5063'

const ItemUpdatePage: React.FC = () => {
  const { itemId } = useParams<{ itemId: string }>(); // Get itemId from the URL
  const navigate = useNavigate(); // Create a navigate function
  const [item, setItem] = useState<Item | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await fetch(`${API_URL}/api/itemapi/${itemId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch item');
        }
        const data = await response.json();
        setItem(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchItem();
  }, [itemId]);

  const handleItemUpdated = async (updatedItem: Item) => {
    try {
      const response = await fetch(`${API_URL}/api/itemapi/update/${itemId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedItem),
      });

      if (!response.ok) {
        throw new Error('Failed to update item');
      }

      const data = await response.json();
      console.log('Item updated successfully:', data);
      navigate('/items'); // Navigate back to the item list
    } catch (err) {
      console.error('Error updating item:', err);
      setError((err as Error).message);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!item) return <p>No item found</p>;

  return (
    <div>
      <h2>Update Item</h2>
      <ItemForm
        onItemChanged={handleItemUpdated}
        itemId={item.itemId}
        isUpdate={true}
        initialData={item}
      />
    </div>
  );    
};

export default ItemUpdatePage;