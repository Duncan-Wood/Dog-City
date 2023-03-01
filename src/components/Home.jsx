import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { RANDOM_DOG_URL } from "../globals";

export default function Home() {
  const [randomDogImages, setRandomDogImages] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const imgRefs = useRef([]);

  useEffect(() => {
    const getRandomDogImages = async () => {
      try {
        const response = await axios.get(`${RANDOM_DOG_URL}?limit=5`);
        setRandomDogImages(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getRandomDogImages();
  }, []);

  useEffect(() => {
    if (randomDogImages.length > 0) {
      imgRefs.current.forEach((ref, i) => {
        if (ref && randomDogImages[i]) {
          ref.src = randomDogImages[i].url;
        }
      });
    }
  }, [randomDogImages]);

  const handleNextImage = () => {
    const nextIndex =
      currentImageIndex === randomDogImages.length - 1
        ? 0
        : currentImageIndex + 1;
    setCurrentImageIndex(nextIndex);
  };

  const handleGenerateImages = async () => {
    try {
      const response = await axios.get(`${RANDOM_DOG_URL}?limit=5`, {
        Authorization: `Bearer ${process.env.REACT_APP_THEDOGAPI_KEY}`,
      });
      setRandomDogImages(response.data);
      setCurrentImageIndex(0);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="home">
      <h1>Welcome to Dog City!</h1>
      {randomDogImages.length > 0 ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "10px",
            flexWrap: "wrap",
          }}
        >
          {randomDogImages.map((image, i) => (
            <img
              key={image.id}
              ref={(el) => (imgRefs.current[i] = el)}
              alt="random dog photo"
              style={{
                width: "200px",
                height: "200px",
                objectFit: "cover",
                borderRadius: "10px",
                cursor: "pointer",
                border:
                  i === currentImageIndex
                    ? "3px solid blue"
                    : "3px solid white",
              }}
              onClick={handleNextImage}
            />
          ))}
        </div>
      ) : (
        <p>dogs loading</p>
      )}
      <button onClick={handleGenerateImages}>Generate More Dogs</button>
    </div>
  );
}

// import { useState, useEffect, useRef } from "react";
// import axios from "axios";
// import { RANDOM_DOG_URL } from "../globals";

// export default function Home() {
//   const [randomDogImage, setRandomDogImage] = useState(null);
//   const imgRef = useRef(null);

//   useEffect(() => {
//     const getRandomDogImage = async () => {
//       try {
//         const response = await axios.get(RANDOM_DOG_URL);
//         setRandomDogImage(response.data[0]);
//         console.log(response.data[0])
//       } catch (error) {
//         console.log(error);
//       }
//     };
//     getRandomDogImage();
//   }, []);

//   useEffect(() => {
//     //optional chaining operator: ?.
//     if (randomDogImage && !imgRef.current?.src) {
//       imgRef.current.src = randomDogImage.url;
//     }
//   }, [randomDogImage]);

//   return (
//     <div className='home'>
//       <h1>Welcome to Dog City!</h1>
//       {randomDogImage ? (
//         <img ref={imgRef} alt="random dog photo" />
//       ) : (
//         <p>dog loading</p>
//       )}
//     </div>
//   );
// }