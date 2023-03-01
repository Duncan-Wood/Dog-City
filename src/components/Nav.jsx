import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { BREEDS_URL } from "../globals";

export default function Nav() {
  const [breeds, setBreeds] = useState([]);
  const [randomBreed, setRandomBreed] = useState(null);

  useEffect(() => {
    const getBreeds = async () => {
      const response = await axios.get(`${BREEDS_URL}`, {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_THEDOGAPI_KEY}`,
        },
      });
      setBreeds(response.data);
      setRandomBreed(randomBreedGenerator(response.data));
    };
    getBreeds();
  }, []);

  const randomBreedGenerator = (breeds) => {
    const min = 0;
    const max = breeds.length - 1;
    const randomIndex = Math.floor(Math.random() * (max - min + 1)) + min;
    return breeds[randomIndex]?.id;
  };

  function handleClick() {
    setRandomBreed(randomBreedGenerator(breeds));
  }

  return (
    <div className="nav">
      <Link to="/">Home</Link>
      <Link to="/breeds">Breeds</Link>
      {breeds.length > 0 && (
        <Link to={`/breeds/${randomBreed}`} onClick={handleClick}>
          Random Breed
        </Link>
      )}
    </div>
  );
}
