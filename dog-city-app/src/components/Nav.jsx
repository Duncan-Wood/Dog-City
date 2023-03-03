import "../css/Nav.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { BREEDS_URL } from "../globals";

export default function Nav() {
  const [breeds, setBreeds] = useState([]);
  const [randomBreed, setRandomBreed] = useState(null);

  useEffect(() => {
    const getBreeds = async () => {
      try {
        const response = await axios.get(`${BREEDS_URL}`, {
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_THEDOGAPI_KEY}`,
          },
        });
        setBreeds(response.data);
        setRandomBreed(response.data[Math.floor(Math.random() * response.data.length)].id);
      } catch (error) {
        alert(
          "An error occurred while fetching a random breed. Please email duncanwoodpro@gmail.com to notify them about this error."
        );
      }
    };
    getBreeds();
  }, []);

  // in one click, this function takes the breeds array and pulls a random index with in. Then, it pulls the ID from that index.
  function handleClick() {
    setRandomBreed(breeds[Math.floor(Math.random() * breeds.length)].id);
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
