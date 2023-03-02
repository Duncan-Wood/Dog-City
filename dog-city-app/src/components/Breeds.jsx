import "../css/Breeds.css"

import { BREEDS_URL } from "../globals";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Breeds() {
  const [breeds, setBreeds] = useState([]);
  const [searchBreed, setSearchBreed] = useState("");
  const [selectedBreed, setSelectedBreed] = useState("");

  useEffect(() => {
    const getBreeds = async () => {
      const response = await axios.get(`${BREEDS_URL}`, {
        Authorization: `Bearer ${process.env.REACT_APP_THEDOGAPI_KEY}`,
      });
      setBreeds(response.data);
    };
    getBreeds();
  }, []);

  let navigate = useNavigate();
  const showBreed = (id) => {
    navigate(`${id}`);
  };
  const handleSearch = () => {
    setSelectedBreed(searchBreed);
  };
  const handleSelect = (event) => {
    setSelectedBreed(event.target.value);
  };
  const filteredBreeds = breeds.filter((breed) =>
    breed.name.toLowerCase().includes(selectedBreed.toLowerCase())
  );

  return (
    <div>
      <Link to="/" className='back-button'>Back</Link>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search breeds"
          value={searchBreed}
          onChange={(event) => setSearchBreed(event.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
        <select value={selectedBreed} onChange={handleSelect}>
          <option value="">All breeds</option>
          {breeds.map((breed) => (
            <option value={breed.name} key={breed.id}>
              {breed.name}
            </option>
          ))}
        </select>
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
