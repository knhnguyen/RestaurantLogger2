import React, { useEffect, useState } from "react";
import "./RestaurantsTable.css";
import Axios from "axios";

function App() {
  const [backendData, setBackendData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/restaurant");
        if (response.ok) {
          const data = await response.json();
          setBackendData(data);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    // Fetch data initially and then set up polling
    fetchData();

    // Set up polling to refresh data every 5 seconds (adjust the interval as needed)
    const pollingInterval = setInterval(fetchData, 1000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(pollingInterval);
  }, []);

  function deleteRestaurant(itemId) {
    // Define the URL for the DELETE request
    const apiUrl = "http://localhost:5000/delete-restaurant"; // Replace with your actual API endpoint

    console.log(itemId);
    // Make the DELETE request
    Axios.delete(apiUrl, {
      data: { id: itemId },
    })
      .then((response) => {
        if (response.status === 200) {
          // Item was successfully deleted
          console.log("Data deleted successfully.");
        } else {
          console.error("Error deleting data.");
        }
      })
      .catch((error) => {
        console.log("asd");
        console.error("Network error:", error);
      });
  }

  return (
    <div>
      {loading ? (
        <p>Loading ...</p>
      ) : (
        <table className="restaurantTable">
          <thead>
            <tr>
              <th>Restaurant ID</th>
              <th>Name</th>
              <th>Description</th>
              <th>Location</th>
              <th>Cuisine</th>
              <th>Rating</th>
            </tr>
          </thead>
          <tbody>
            {backendData.map((item, index) => (
              <tr key={index}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.description}</td>
                <td>{item.location}</td>
                <td>{item.cuisine}</td>
                <td>{item.rating}</td>
                <button className="deleteButton" onClick={() => deleteRestaurant(item.id)}>
  Delete
</button>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default App;
