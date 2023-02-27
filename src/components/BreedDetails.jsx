import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
// import { BREED_DETAILS_URL } from "../globals";
import { Link } from "react-router-dom";

export default function BreedDetails() {
  const { id } = useParams();
  const [breedDetails, setBreedDetails] = useState(null);
  const [breedStats, setBreedStats] = useState(null);

  const getBreedDetails = async () => {
    const breedResponse = await axios.get(
      `https://api.thedogapi.com/v1/images/search?breed_ids=${id}&api_key=live_EAEhKA2lnKST2cJzf095BVhl6W1yxvJyeyC7KMC20ybyc3uVqhI0woaQfoEJWYWv`
    );
    const breedName = breedResponse.data[0].breeds[0].name;
    const statsResponse = await axios.get(
      `https://api.api-ninjas.com/v1/dogs?name=${breedName}`,
      {
        headers: {
          "X-Api-Key": `ljveLliOD2EeCCqhEdxOnA==EidUfAgTaoZs7DQl`,
        },
      }
    );
    setBreedDetails(breedResponse.data[0]);
    setBreedStats(statsResponse.data[0]);
  };

  useEffect(() => {
    getBreedDetails();
  }, [id]);

  console.log(breedStats)
  
  return (
    <div>
      <Link to="/breeds">Back</Link>
      {breedDetails ? (
        <>
          <h1>{breedDetails.breeds[0].name}</h1>
          <img
            src={breedDetails.url}
            alt="Breed Image"
            style={{ width: "50%" }}
          />
        </>
      ) : (
        <p>loading breed image</p>
      )}
      <div className="breed-details">
        <div className="breed-description">
          {breedDetails ? (
            <>
              <h2>Breed Description</h2>
              <ul>
                <li>Temperament: {breedDetails.breeds[0].temperament}</li>
                <li>Origin: {breedDetails.breeds[0].origin}</li>
                <li>Breed Group: {breedDetails.breeds[0].breed_group}</li>
                <li>Life Span: {breedDetails.breeds[0].life_span}</li>
                <li>Height: {breedDetails.breeds[0].height.imperial} inches</li>
                <li>Weight: {breedDetails.breeds[0].weight.imperial} lbs</li>
              </ul>
            </>
          ) : (
            <p>Loading breed details...</p>
          )}
        </div>
        <div className="breed-stats">
          {breedStats ? (
            <>
              <h2>Breed Stats</h2>
              <ul>
                {/* {Object.entries(breedStats).map(([key, value]) => (
                  <li key={key}>
                    {key.replace(/_/g, " ")}: {value}
                  </li>
                ))} */}
                <li>Barking: {breedStats.barking}</li>
                <li>Coat Length: {breedStats.coat_length}</li>
                <li>Drooling: {breedStats.drooling}</li>
                <li>Energy: {breedStats.energy}</li>
                <li>Good with Children: {breedStats.good_with_children}</li>
                <li>Good with Other Dogs: {breedStats.good_with_other_dogs}</li>
                <li>Good with Strangers: {breedStats.good_with_children}</li>
                <li>Grooming: {breedStats.grooming}</li>
                <li>Playfulness: {breedStats.playfulness}</li>
                <li>Protectiveness: {breedStats.protectiveness}</li>
                <li>Shedding: {breedStats.shedding}</li>
                <li>Trainability: {breedStats.trainability}</li>
              </ul>
            </>
          ) : (
            <p>Loading breed stats...</p>
          )}
        </div>
      </div>
    </div>
  );
}
