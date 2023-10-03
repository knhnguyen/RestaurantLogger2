import React, { useState } from "react";
import Axios from 'axios';
import './AddRestaurants.css'; // Import the CSS file

function AddRestaurants() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    location: "",
    cuisine: "",
    rating: "",
  });

  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  }

  async function submitForm(event) {
    event.preventDefault(); // Prevent the default form submission
    try {
      const response = await Axios.post('http://localhost:5000/postrestaurant', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 201) {
        console.log('Data sent and inserted successfully.');
        // Reset the form or handle other UI updates as needed
      } else {
        console.error('Error sending data to the server.');
      }
    } catch (error) {
      console.error('Network error:', error);
    }
  }

  return (
    <div className="form-container">
      <form className="form" onSubmit={submitForm}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Description:
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Location:
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Cuisine:
          <input
            type="text"
            name="cuisine"
            value={formData.cuisine}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Rating:
          <input
            type="text"
            name="rating"
            value={formData.rating}
            onChange={handleInputChange}
          />
        </label>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

export default AddRestaurants;
