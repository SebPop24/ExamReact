import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import ItemTable from './ItemTable';
import ItemGrid from './ItemGrid';
import { Item } from '../types/item';
const API_URL = 'http://localhost:5063';
//import API_URL from '../apiConfig';



const ItemListPage: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]); // State for storing items with Item type
  const [loading, setLoading] = useState<boolean>(false); // State for loading indicator
  const [error, setError] = useState<string | null>(null); // State for storing error messages
  const [showTable, setShowTable] = useState<boolean>(true); // State to toggle between table and grid view

  const toggleTableOrGrid = () => setShowTable(prevShowTable => !prevShowTable);

  const fetchItems = async () => {
    setLoading(true); // Set loading to true when starting the fetch
    setError(null); // Clear any previous errors

    try {
      const response = await fetch(`${API_URL}/api/itemapi/itemlist`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setItems(data);
      console.log(data);
    } catch (error) {
      console.error(`There was a problem with the fetch operation: ${error.message}`);
      setError('Failed to fetch items.');
    } finally {
      setLoading(false); // Set loading to false once the fetch is complete
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <div>
      <h1>Items</h1>
      <Button onClick={fetchItems} className="btn btn-primary mb-3 me-2" disabled={loading}>
        {loading ? 'Loading...' : 'Refresh Items'}
      </Button>
      <Button onClick={toggleTableOrGrid} className="btn btn-primary mb-3 me-2">
        {showTable ? 'Display Grid' : 'Display Table'}
      </Button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {showTable
        ? <ItemTable items={items} apiUrl={API_URL} />
        : <ItemGrid items={items} apiUrl={API_URL} />}
         <Button href='/itemcreate' className="btn btn-secondary mt-3">Add New Item</Button>  
    </div>
  );
};

export default ItemListPage;
