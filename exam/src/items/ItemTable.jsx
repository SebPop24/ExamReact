import React from 'react';
import { Table } from 'react-bootstrap';

const ItemTable = ({ items, apiUrl }) => {
  return (
    <Table striped bordered hover>
  <thead>
    <tr>
      <th>Name</th>
      <th>Food Group</th>
      <th>Energy (kJ)</th>
      <th>Fat (g)</th>
      <th>Protein (g)</th>
      <th>Carbohydrate (g)</th>
      <th>Salt (g)</th>
      <th>Image</th>
      <th>Has Green Keyhole</th>
    </tr>
  </thead>
  <tbody>
    {items.map(item => (
        <tr key={item.itemId}>
        <td>{item.name}</td>
        <td>{item.food_Group}</td>
        <td>{item.energi_Kj}</td>
        <td>{item.fett}</td>
        <td>{item.protein}</td>
        <td>{item.karbohydrat}</td>
        <td>{item.salt}</td>
        <td>
          <img 
            src={`${apiUrl}${item.imageUrl}`} 
            alt={item.name} 
            width="120" 
          />
        </td>
        <td>{item.hasGreenKeyhole ? 'Yes' : 'No'}</td>
      </tr>
    ))}
  </tbody>
</Table>
  );
};

export default ItemTable;
