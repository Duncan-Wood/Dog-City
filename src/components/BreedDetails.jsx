

// // import { useContext } from 'react'
// // import { BreedContext } from '../BreedContext'
// // import { useParams } from 'react-router-dom'


// // //use useParams to use the index or object name to select the breed from the array


// // export default function BreedDetails () {
// //     const { breeds } = useContext(BreedContext);
// //     const { breedIndex } = useParams();
// //     const selectedBreed = breeds[breedIndex];

// //     return (
// //         <div>
// //             {breeds && <h1>{selectedBreed.name}</h1>}

// //         </div>
// //     )
// // }

// import { useParams } from "react-router-dom";
// import axios from "axios";
// import { useEffect, useState } from "react";
// import { BreedContext } from "../BreedContext";


// export default function BreedDetails() {
//     const { breeds } = useContext(BreedContext);
 
//     const { breedIndex } = match.params;
//     const breed = breeds?.[breedIndex];

//     const [breedDetails, setBreedDetails] = useState(null);
  
//     useEffect(() => {
//       const getBreedDetails = async () => {
//         const response = await axios.get(`${BREEDS_URL}`);
//         setBreedDetails(response.data[breedIndex]);
//       };
//       getBreedDetails();
//     }, [breedIndex]);
  
//     return (
//         <div>
//           <h1>{breed.name}</h1>
//           <img src={breed.image.url} alt="Breed" />
//           <p>{breed.temperament}</p>
//           <p>{breed.origin}</p>
//         </div>
//       );
//     }

import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
// import { BreedContext } from "../BreedContext";
import { BREED_DETAILS_URL } from "../globals";
import { Link } from "react-router-dom";



export default function BreedDetails() {
    const { id } = useParams()
    const [breedDetails, setBreedDetails] = useState(null)
  
    useEffect(() => {
      const getBreedDetails = async () => {
        const response = await axios.get(`${BREED_DETAILS_URL}/${id}`)
        setBreedDetails(response.data)
        console.log(response.data)
      }
      getBreedDetails()
    }, [id])
  
    return (
      <div>
        {breedDetails ? (
          <>
        <Link to="/breeds">Back</Link>

            <h1>{breedDetails.name}</h1>
            {/* <img src={breedDetails.image.url} alt='Breed' /> */}
            <p>Temperament: {breedDetails.temperament}</p>
            <p>Origin: {breedDetails.origin}</p>
            <p>Breed Group: {breedDetails.breed_group}</p>
            <p>Life Span: {breedDetails.life_span}</p>
            <p>Height: {breedDetails.height.imperial} inches</p>
            <p>Weight: {breedDetails.weight.imperial} lbs</p>
          </>
        ) : (
          <p>Loading breed details...</p>
        )}
      </div>
    )
  }