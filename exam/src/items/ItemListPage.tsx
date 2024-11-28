import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import ItemTable from './ItemTable';
import ItemGrid from './ItemGrid';
import { Item } from '../types/item';
import API_URL from '../apiConfig';
import * as ItemService from './ItemService';



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
      const data = await ItemService.fetchItems();
      setItems(data);
      console.log(data);
    } catch (error) {
      console.error(`There was a problem with the fetch operation: ${error.message}`);
      setError('Failed to fetch items.');
    } finally {
      setLoading(false); // Set loading to false once the fetch is complete
    }
  };

 // Set the view mode to local storage when the item is fetched
 useEffect(() => {
  const savedViewMode = localStorage.getItem('itemViewMode');
  console.log('[fetch items] Saved view mode:', savedViewMode); // Debugging line
  if (savedViewMode) {
    if (savedViewMode === 'grid')
      setShowTable(false)
    console.log('show table', showTable);
  }
  fetchItems();
}, []);

// Save the view mode to local storage whenever it changes
useEffect(() => {
  console.log('[save view state] Saving view mode:', showTable ? 'table' : 'grid');
  localStorage.setItem('itemViewMode', showTable ? 'table' : 'grid');
}, [showTable]);


const handleItemDeleted = async (itemId: number) => {
  const confirmDelete = window.confirm(`Are you sure you want to delete the item ${itemId}?`);
  if (confirmDelete) {
    try {
      await ItemService.deleteItem(itemId);
      setItems(prevItems => prevItems.filter(item => item.itemId !== itemId));
      console.log('Item deleted:', itemId);
    } catch (error) {
      console.error('Error deleting item:', error);
      setError('Failed to delete item.');
    }
  }
};

  return (
    <div>
     <Button 
  onClick={toggleTableOrGrid} 
  className="btn p-0 bg-transparent border-0"
>
  <img 
    src={showTable ? "../images/grid-view.jpg" : "../images/table.png"} 
    alt="Toggle View" 
    style={{ width: '35px', height: '35px' }} 
  />
</Button>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {showTable
        ? <ItemTable items={items} apiUrl={API_URL} onItemDeleted={handleItemDeleted} />
        : <ItemGrid items={items} apiUrl={API_URL} onItemDeleted={handleItemDeleted} />}
         <Button href='/itemcreate' className="btn btn-secondary mt-3">Add New Item</Button>  
    </div>
  );
};

export default ItemListPage;
