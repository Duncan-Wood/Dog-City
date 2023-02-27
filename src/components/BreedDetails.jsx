import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
// import { BREED_DETAILS_URL } from "../globals";
import { Link } from "react-router-dom";

export default function BreedDetails() {
    const { id } = useParams()
    const [breedDetails, setBreedDetails] = useState(null)
  
    useEffect(() => {
      const getBreedDetails = async () => {
        const response = await axios.get(`https://api.thedogapi.com/v1/images/search?breed_ids=${id}&api_key=live_EAEhKA2lnKST2cJzf095BVhl6W1yxvJyeyC7KMC20ybyc3uVqhI0woaQfoEJWYWv`)
        console.log(response.data[0])
        setBreedDetails(response.data[0])
      }
      getBreedDetails()
    }, [id])
  
    return (
      <div>
        <div className='breed-description'>
        {breedDetails ? (
          <>
        <Link to="/breeds">Back</Link>
            <h1>{breedDetails.breeds[0].name}</h1>
            <img src={breedDetails.url} alt='Breed Image' style={{ width: "50%" }}/>
            <p>Temperament: {breedDetails.breeds[0].temperament}</p>
            <p>Origin: {breedDetails.breeds[0].origin}</p>
            <p>Breed Group: {breedDetails.breeds[0].breed_group}</p>
            <p>Life Span: {breedDetails.breeds[0].life_span}</p>
            <p>Height: {breedDetails.breeds[0].height.imperial} inches</p>
            <p>Weight: {breedDetails.breeds[0].weight.imperial} lbs</p>
          </>
        ) : (
          <p>Loading breed details...</p>
        )}
        </div>
        <div className='breed-stats'>
          
        </div>
      </div>
    )
  }