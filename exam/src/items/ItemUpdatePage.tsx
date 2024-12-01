import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ItemForm from "./ItemForm";
import { Item } from "../types/item";
import API_URL from "../apiConfig";
import * as ItemService from "./ItemService";

// Defines `ItemUpdatePage` to manage item updates, retrieves `itemId` from the URL, and initializes state for item details, loading status, and error messages.
const ItemUpdatePage: React.FC = () => {
  const { itemId } = useParams<{ itemId: string }>();
  const navigate = useNavigate();
  const [item, setItem] = useState<Item | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetches item details by `itemId` on component mount, updates item state, handles errors, and manages loading state.
  useEffect(() => {
    const fetchItem = async () => {
      try {
        const data = await ItemService.fetchItemById(itemId);
        setItem(data);
      } catch (error) {
        setError("Failed to fetch item");
        console.error("There was a problem with the fetch operation:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchItem();
  }, [itemId]);

  // Handles item update, sends updated data to the server, logs success, and navigates back to the items list upon completion.
  const handleItemUpdated = async (item: Item) => {
    try {
      const data = await ItemService.updateItem(item.itemId, item);
      console.log("Item updated successfully:", data);
      navigate("/items"); // Navigate back after successful creation
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  };
  // Renders a loading message, error message, or "No item found" if applicable.
  // If an item is available, it displays the `ItemForm` with update functionality and prefilled data.
  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!item) return <p>No item found</p>;

  return (
    <div>
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
