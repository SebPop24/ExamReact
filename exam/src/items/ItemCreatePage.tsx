import React from "react";
import { useNavigate } from "react-router-dom";
import ItemForm from "./ItemForm";
import { Item } from "../types/item";
import API_URL from "../apiConfig";
import * as ItemService from "./ItemService";

const ItemCreatePage: React.FC = () => {
  const navigate = useNavigate(); // Create a navigate function

  const handleItemCreated = async (item: Item) => {
    try {
      const data = await ItemService.createItem(item);
      console.log("Item created successfully:", data);
      navigate("/items"); // Navigate back after successful creation
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  };

  return <ItemForm onItemChanged={handleItemCreated} />;
};

export default ItemCreatePage;
