import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { RANDOM_DOG_URL, BREEDS_URL } from "../globals";
import { Link, useNavigate } from "react-router-dom";
import "../css/Home.css";

export default function Home() {
  const [randomDogImage, setRandomDogImage] = useState(null);
  //stores a reference to the original dog image that is pulled. This allows me to only use the original image since it renders twice in React
  const imgRef = useRef(null);
  const [randomBreeds, setRandomBreeds] = useState([]);

  useEffect(() => {
    const getRandomDogImage = async () => {
      try {
        const response = await axios.get(`${RANDOM_DOG_URL}`);
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
    //optional chaining (?.) will set the imgRef once and only once to bypass React refreshing and showing image twice
    if (randomDogImage && !imgRef.current?.src) {
      imgRef.current.src = randomDogImage.url;
    }
  }, [randomDogImage]);

  useEffect(() => {
    const getBreeds = async () => {
      try {
        const response = await axios.get(`${BREEDS_URL}`);
        //storing entire breeds array withing the function, since we will only use 5 random ones in the end, I do not need a seperate useState
        const breeds = response.data;
        while (randomBreeds.length < 5) {
          const randomIndex = Math.floor(Math.random() * breeds.length);
          const randomBreed = breeds[randomIndex];
          if (!randomBreeds.includes(randomBreed)) {
            randomBreeds.push(randomBreed);
          }
        }
        setRandomBreeds(randomBreeds);
      } catch (error) {
        alert(
          "There was an error getting the featured breeds. Please email duncanwoodpro@gmail.com to notify them about this error."
        );
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
