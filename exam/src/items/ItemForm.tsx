import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { Item } from "../types/item";
import "../assets/css/Form.css";

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
  initialData,
}) => {
  const [name, setName] = useState<string>(initialData?.name || "");
  const [food_Group, setFoodGroup] = useState<string>(
    initialData?.food_Group || ""
  );
  const [energi_Kj, setEnergiKj] = useState<string>(
    initialData?.energi_Kj?.toString() || ""
  );
  const [fett, setFett] = useState<string>(initialData?.fett?.toString() || "");
  const [protein, setProtein] = useState<string>(
    initialData?.protein?.toString() || ""
  );
  const [karbohydrat, setKarbohydrat] = useState<string>(
    initialData?.karbohydrat?.toString() || ""
  );
  const [salt, setSalt] = useState<string>(initialData?.salt?.toString() || "");
  const [imageUrl, setImageUrl] = useState<string>(initialData?.imageUrl || "");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [hasGreenKeyhole, setHasGreenKeyhole] = useState<boolean>(
    initialData?.hasGreenKeyhole || false
  );
  const navigate = useNavigate();

  const validateField = (field: string, value: string) => {
    let error = "";

    // Map field names to their display titles
    const fieldTitles: { [key: string]: string } = {
      energi_Kj: "Energy",
      fett: "Fat",
      protein: "Protein",
      karbohydrat: "Carbohydrates",
      salt: "Salt",
    };

    switch (field) {
      case "name":
        if (!value.match(/^[a-zA-ZæøåÆØÅ0-9\s-]{2,50}$/)) {
          error =
            "Name must be 2-50 characters long and can include letters, numbers, spaces, and hyphens.";
        }
        break;
      case "food_Group":
        if (!value) {
          error = "Please select a food group.";
        }
        break;
      case "energi_Kj":
      case "fett":
      case "protein":
      case "karbohydrat":
      case "salt":
        if (!value || isNaN(Number(value)) || Number(value) < 0) {
          const title = fieldTitles[field] || field.replace("_", " ");
          error = `${title} must be a valid number greater than or equal to 0.`;
        }
        break;
      case "imageUrl":
        if (!value.match(/^https?:\/\/.+$/)) {
          error = "Please enter a valid URL starting with http:// or https://.";
        }
        break;
      default:
        break;
    }

    return error;
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    newErrors.name = validateField("name", name);
    newErrors.food_Group = validateField("food_Group", food_Group);
    newErrors.energi_Kj = validateField("energi_Kj", energi_Kj);
    newErrors.fett = validateField("fett", fett);
    newErrors.protein = validateField("protein", protein);
    newErrors.karbohydrat = validateField("karbohydrat", karbohydrat);
    newErrors.salt = validateField("salt", salt);
    newErrors.imageUrl = validateField("imageUrl", imageUrl);

    setErrors(newErrors);
    return Object.values(newErrors).every((error) => !error);
  };

  const handleBlur = (field: string, value: string) => {
    const error = validateField(field, value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      [field]: error,
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // Validate all fields and show all errors at once
    if (!validateForm()) return;

    const item: Partial<Item> = {
      itemId,
      name,
      food_Group,
      energi_Kj: Number(energi_Kj) || 0,
      fett: Number(fett) || 0,
      protein: Number(protein) || 0,
      karbohydrat: Number(karbohydrat) || 0,
      salt: Number(salt) || 0,
      imageUrl,
    };
    onItemChanged(item as Item);
  };

  /*  useEffect(() => {
    validateForm(); // Validate initial data when the form is loaded
  }, []); */

  return (
    <div className="form-wrapper">
      <h2 className="form-title">
        {isUpdate ? "Update Item" : "Create New Item"}
      </h2>
      <Form onSubmit={handleSubmit} className="custom-form">
        <Form.Group className="form-group">
          <Form.Control
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onBlur={(e) => handleBlur("name", e.target.value)}
          />
          {errors.name && <p className="error-text">{errors.name}</p>}
        </Form.Group>

        <Form.Group className="form-group">
          <Form.Select
            value={food_Group}
            onChange={(e) => setFoodGroup(e.target.value)}
            onBlur={(e) => handleBlur("food_Group", e.target.value)}
          >
            <option value="">Select Food Group</option>
            <option value="Dairy">Dairy</option>
            <option value="Meat">Meat</option>
            <option value="Vegetables">Vegetables</option>
            <option value="Nuts">Nuts</option>
            <option value="Sauce">Sauce</option>
            <option value="Berries">Berries</option>
            <option value="Beverages">Beverages</option>
          </Form.Select>
          {errors.food_Group && (
            <p className="error-text">{errors.food_Group}</p>
          )}
        </Form.Group>

        {[
          {
            label: "Energy per 100g (kJ)",
            value: energi_Kj,
            setValue: setEnergiKj,
            error: errors.energi_Kj,
          },
          {
            label: "Fat per 100g (g)",
            value: fett,
            setValue: setFett,
            error: errors.fett,
          },
          {
            label: "Protein per 100g (g)",
            value: protein,
            setValue: setProtein,
            error: errors.protein,
          },
          {
            label: "Carbohydrates per 100g (g)",
            value: karbohydrat,
            setValue: setKarbohydrat,
            error: errors.karbohydrat,
          },
          {
            label: "Salt per 100g (g)",
            value: salt,
            setValue: setSalt,
            error: errors.salt,
          },
        ].map((field, index) => (
          <Form.Group className="form-group" key={index}>
            <Form.Control
              type="text"
              placeholder={field.label}
              value={field.value}
              onChange={(e) => field.setValue(e.target.value)}
              onBlur={(e) =>
                handleBlur(
                  field.label.toLowerCase().replace(/ /g, "_"),
                  e.target.value
                )
              }
            />
            {field.error && <p className="error-text">{field.error}</p>}
          </Form.Group>
        ))}

        <Form.Group className="form-group">
          <Form.Control
            type="text"
            placeholder="Image URL"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            onBlur={(e) => handleBlur("imageUrl", e.target.value)}
          />
          {errors.imageUrl && <p className="error-text">{errors.imageUrl}</p>}
        </Form.Group>

        <div className="button-group">
          <Button variant="success" type="submit">
            {isUpdate ? "Update Item" : "Create Item"}
          </Button>
          <Button variant="outline-success" onClick={() => navigate(-1)}>
            Cancel
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default ItemForm;
