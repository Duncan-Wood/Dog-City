import "../css/Home.css"

import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { RANDOM_DOG_URL } from "../globals";
import { Link, useNavigate } from "react-router-dom";

import { BREEDS_URL } from "../globals";

export default function Home() {
  const [randomDogImage, setRandomDogImage] = useState(null);
  const imgRef = useRef(null);

  useEffect(() => {
    const getRandomDogImage = async () => {
      try {
        const response = await axios.get(RANDOM_DOG_URL);
        setRandomDogImage(response.data[0]);
      } catch (error) {
        console.log(error);
      }
    };
    getRandomDogImage();
  }, []);

  useEffect(() => {
    //optional chaining operator: ?.
    if (randomDogImage && !imgRef.current?.src) {
      imgRef.current.src = randomDogImage.url;
    }
  }, [randomDogImage]);

  // 5 random featured breeds
  const [breeds, setBreeds] = useState([]);
  const [randomBreeds, setRandomBreeds] = useState([]);

  useEffect(() => {
    const getBreeds = async () => {
      const response = await axios.get(`${BREEDS_URL}`, {
        Authorization: `Bearer ${process.env.REACT_APP_THEDOGAPI_KEY}`,
      });
      setBreeds(response.data);
      // Get 5 random breeds from the list
      const randomBreeds = [];
      while (randomBreeds.length < 5) {
        const randomIndex = Math.floor(Math.random() * response.data.length);
        const randomBreed = response.data[randomIndex];
        if (!randomBreeds.includes(randomBreed)) {
          randomBreeds.push(randomBreed);
        }
      }
      setRandomBreeds(randomBreeds);
    };
    getBreeds();
  }, []);

  let navigate = useNavigate();
  const showBreed = (id) => {
    navigate(`breeds/${id}`);
  };

  const showRandomBreed = () => {
    const randomIndex = Math.floor(Math.random() * randomBreeds.length);
    const randomBreed = randomBreeds[randomIndex];
    showBreed(randomBreed.id);
  };

  return (
    <div className="home">
      <div className="card">
        <h1>Welcome to Dog City!</h1>
        {randomDogImage ? (
          <div>
            <img ref={imgRef} alt="random dog photo" />
            <button>
              <Link to="breeds">Browse Our Breeds</Link>
            </button>
            <button onClick={showRandomBreed}>Random Breed</button>
          </div>
        ) : (
          <p>dog loading</p>
        )}
      </div>
      <div className="grid" id="breeds">
        {randomBreeds.map((breed, i) => (
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
