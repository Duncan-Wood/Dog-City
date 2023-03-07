import "../css/Breeds.css";

import { BREEDS_URL } from "../globals";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Breeds() {
  const [breeds, setBreeds] = useState([]);
  const [searchBreed, setSearchBreed] = useState("");
  const [selectedBreeds, setSelectedBreeds] = useState("");

  useEffect(() => {
    const getBreeds = async () => {
      try {
        const response = await axios.get(`${BREEDS_URL}`);
        setBreeds(response.data);
      } catch (error) {
        alert(
          "There was an error getting the breeds. Please email duncanwoodpro@gmail.com to notify them about this error."
        );
      }
    };
    getBreeds();
  }, []);

  let navigate = useNavigate();
  const showBreed = (id) => {
    navigate(`${id}`);
  };
  const handleSearch = () => {
    setSelectedBreeds(searchBreed);
  };
  const handleSelect = (event) => {
    setSelectedBreeds(event.target.value);
  };

  //This is the core of how my search bar works. By taking either the selected breed from the drop down or any number of breeds that include the search paramater, my breeds array gets filtered accordingly
  const filteredBreeds = breeds.filter((breed) =>
    breed.name.toLowerCase().includes(selectedBreeds.toLowerCase())
  );

  return (
    <div className="breeds">
      <Link to="/" className="back-button">
        Back
      </Link>
      <div className="breeds-header">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search breeds"
            value={searchBreed}
            onChange={(event) => setSearchBreed(event.target.value)}
          />
          <button onClick={handleSearch}>Search</button>
          <select value={selectedBreeds} onChange={handleSelect}>
            <option value="">All breeds</option>
            {breeds.map((breed) => (
              <option value={breed.name} key={breed.id}>
                {breed.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="grid" id="breeds">
        {filteredBreeds.map((breed, i) => (
          <div
            className="card"
            onClick={() => showBreed(breed.id)}
            key={breed.id}
          >
            <img src={breed.image.url} alt="Breed Photo" />
            <h4>{breed.name}</h4>
          </div>
        ))}
      </div>
    </div>
  );
}
