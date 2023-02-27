import { BREEDS_URL } from "../globals";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Breeds() {
  const [breeds, setBreeds] = useState([]);
  useEffect(() => {
    const getBreeds = async () => {
      const response = await axios.get(`${BREEDS_URL}`);
      setBreeds(response.data);
    };
    getBreeds();
  }, []);

  let navigate = useNavigate()
  const showBreed = (id) => {
    navigate(`${id}`);
  };

  return (
      <div>
        <Link to="/">Back</Link>
        <div className="grid" id="breeds">
          {breeds.map((breed, i) => (
            <div
              className="card"
              onClick={() => showBreed(breed.id)}
              key={breed.id}
            >
              <img src={breed.image.url} alt="Breed Photo" />
              <h4>{breed.name}</h4>
              <Link to={`/breeds/${i}`}>
                <button>View Breed</button>
              </Link>
            </div>
          ))}
        </div>
      </div>
  );
}
