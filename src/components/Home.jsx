import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { RANDOM_DOG_URL } from "../globals";

export default function Home() {
  const [randomDogImage, setRandomDogImage] = useState(null);
  const imgRef = useRef(null);

  useEffect(() => {
    const getRandomDogImage = async () => {
      try {
        const response = await axios.get(RANDOM_DOG_URL);
        setRandomDogImage(response.data[0]);
        console.log(response.data[0])
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

  return (
    <div className='home'>
      <h1>Welcome to Dog City!</h1>
      {randomDogImage ? (
        <img ref={imgRef} alt="random dog photo" />
      ) : (
        <p>dog loading</p>
      )}
    </div>
  );
}