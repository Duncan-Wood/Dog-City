import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { RANDOM_DOG_URL } from "../globals";
import { Link, useNavigate } from "react-router-dom";
import { BREEDS_URL } from "../globals";
import "../css/Home.css";

export default function Home() {
  const [randomDogImage, setRandomDogImage] = useState(null);
  const imgRef = useRef(null);

  useEffect(() => {
    const getRandomDogImage = async () => {
      try {
        const response = await axios.get(`${RANDOM_DOG_URL}`, {
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_THEDOGAPI_KEY}`,
          },
        });
        setRandomDogImage(response.data[0]);
      } catch (error) {
        alert(
          "An error occurred while fetching a random breed. Please email duncanwoodpro@gmail.com to notify them about this error."
        );
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
      try {
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
      } catch (error) {
        alert("There was an error getting the featured breeds. Please email duncanwoodpro@gmail.com to notify them about this error.");
      }
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
      {randomDogImage ? (
        <div className="home-card">
          <h1>WELCOME TO DOG CITY!</h1>
          <img ref={imgRef} alt="random dog photo" />
          <div className="home-buttons">
            <button>
              <Link to="breeds">Browse Our Breeds</Link>
            </button>
            <button onClick={showRandomBreed}>Random Breed</button>
          </div>
        </div>
      ) : (
        <p>dog loading</p>
      )}
      <h2>Featured Breeds</h2>

      <div className="random-grid" id="random-breeds">
        {randomBreeds.map((breed, i) => (
          <div
            className="random-card"
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
