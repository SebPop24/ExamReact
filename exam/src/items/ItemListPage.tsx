import React, { useState, useEffect } from "react";
import { Button, Container } from "react-bootstrap";
import ItemTable from "./ItemTable";
import ItemGrid from "./ItemGrid";
import { Item } from "../types/item";
import API_URL from "../apiConfig";
import * as ItemService from "./ItemService";

const ItemListPage: React.FC = () => {
  //Initializes state for `items` (list of items), `loading` (loading status), `error` (error messages), and `showTable` (toggle for table view).
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [showTable, setShowTable] = useState<boolean>(true);

  const toggleTableOrGrid = () =>
    setShowTable((prevShowTable) => !prevShowTable);

  // Fetches items, updates state, handles errors, and logs results.
  const fetchItems = async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await ItemService.fetchItems();
      setItems(data);
      console.log(data);
    } catch (error) {
      console.error(
        `There was a problem with the fetch operation: ${error.message}`
      );
      setError("Failed to fetch items.");
    } finally {
      setLoading(false);
    }
  };

  // Set the view mode to local storage when the item is fetched
  useEffect(() => {
    const savedViewMode = localStorage.getItem("itemViewMode");
    console.log("[fetch items] Saved view mode:", savedViewMode); // Debugging line
    if (savedViewMode) {
      if (savedViewMode === "grid") setShowTable(false);
      console.log("show table", showTable);
    }
    fetchItems();
  }, []);

  // Save the view mode to local storage whenever it changes
  useEffect(() => {
    console.log(
      "[save view state] Saving view mode:",
      showTable ? "table" : "grid"
    );
    localStorage.setItem("itemViewMode", showTable ? "table" : "grid");
  }, [showTable]);
  // Deletes an item after user confirmation, updates the item list, handles errors, and logs the result.
  const handleItemDeleted = async (itemId: number) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete the item ${itemId}?`
    );
    if (confirmDelete) {
      try {
        await ItemService.deleteItem(itemId);
        setItems((prevItems) =>
          prevItems.filter((item) => item.itemId !== itemId)
        );
        console.log("Item deleted:", itemId);
      } catch (error) {
        console.error("Error deleting item:", error);
        setError("Failed to delete item.");
      }
    }
  };

  return (
    <div className="tablebackground pt-3">
      <Container>
        <div>
          <div className="d-flex justify-content-between align-items-center mb-4">
            {/* Toggle Button */}
            <Button
              onClick={toggleTableOrGrid}
              className="btn p-0 bg-transparent border-0"
            >
              <img
                src={showTable ? "/images/grid-view.jpg" : "/images/table.png"}
                alt="Toggle View"
                style={{ width: "35px", height: "35px" }}
              />
            </Button>

            {/* Create New Item Button */}
            <Button
              href="/itemcreate"
              className="btn"
              style={{
                backgroundColor: "#05954F",
                display: "inline-block",
                padding: "10px 20px",
                color: "white",
                textDecoration: "none",
                borderRadius: "5px",
                marginTop: "20px",
                fontWeight: "bold",
              }}
            >
              {" "}
              Create New Item
            </Button>
          </div>

          {/* Error Message */}
          {error && <p style={{ color: "red" }}>{error}</p>}

          {/* Display Table or Grid */}
          {showTable ? (
            <ItemTable
              items={items}
              apiUrl={API_URL}
              onItemDeleted={handleItemDeleted}
            />
          ) : (
            <ItemGrid
              items={items}
              apiUrl={API_URL}
              onItemDeleted={handleItemDeleted}
            />
          )}
        </div>
      </Container>
    </div>
  );
};

export default ItemListPage;
