import { useState, useEffect } from "react";
import axios from "axios";
import { RANDOM_DOG_URL } from "../globals";

export default function Home() {
  const [randomDogImage, setRandomDogImage] = useState(null);

  useEffect(() => {
    const getRandomDogImage = async () => {
      const response = await axios.get(`${RANDOM_DOG_URL}`);
      console.log(response.data);
      setRandomDogImage(response.data[0]);
    };
    getRandomDogImage();
  }, []);

  return (
    <div>
      <h1>Welcome to Dog City!</h1>
      {randomDogImage ? (
        <img
          src={randomDogImage.url}
          alt="random dog photo"
          style={{ width: "50%" }}
        />
      ) : (
        "dog loading"
      )}
    </div>
  );
}