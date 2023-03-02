import "../css/BreedDetails.css"

import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import Chart from "chart.js/auto";

export default function BreedDetails() {
  const { id } = useParams();
  const [breedDetails, setBreedDetails] = useState(null);
  const [breedStats, setBreedStats] = useState(null);
  const chartContainer = useRef(null);

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

  useEffect(() => {
    // Set up chart when breedStats is available
    if (breedStats && chartContainer.current) {
      const chartData = getChartData();
      const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              stepSize: 1,
              max: 5,
            },
          },
        },
      };
      const chart = new Chart(chartContainer.current.getContext("2d"), {
        type: "bar",
        data: chartData,
        options: chartOptions,
      });
      // Clean up chart on unmount
      return () => chart.destroy();
    }
  }, [breedStats]);

  const getChartData = () => {
    const labels = [
      "Barking",
      "Coat_Length",
      "Drooling",
      "Energy",
      "Good_with_Children",
      "Good_with_Other_Dogs",
      "Good_with_Strangers",
      "Grooming",
      "Playfulness",
      "Protectiveness",
      "Shedding",
      "Trainability",
    ];
    const data = labels.map((label) => breedStats[label.toLowerCase()]);
    return {
      labels,
      datasets: [
        {
          label: "Breed Stats",
          data,
          backgroundColor: "rgba(54, 162, 235, 0.2)",
          borderColor: "rgba(54, 162, 235, 1)",
          borderWidth: 1,
        },
      ],
    };
  };

  return (
    <div className='breed-details-container'>
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
      <div className="breed-information">
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
              <div className="breed-chart">
                <canvas ref={chartContainer} />
              </div>
            </>
          ) : (
            <p>Breed Stats Unavailable</p>
          )}
          {breedStats ? (
            <>
              <ul>
                <li>Barking: {breedStats.barking}/5</li>
                <li>Coat Length: {breedStats.coat_length}/5</li>
                <li>Drooling: {breedStats.drooling}/5</li>
                <li>Energy: {breedStats.energy}/5</li>
                <li>Good with Children: {breedStats.good_with_children}/5</li>
                <li>
                  Good with Other Dogs: {breedStats.good_with_other_dogs}/5
                </li>
                <li>Good with Strangers: {breedStats.good_with_children}/5</li>
                <li>Grooming: {breedStats.grooming}/5</li>
                <li>Playfulness: {breedStats.playfulness}/5</li>
                <li>Protectiveness: {breedStats.protectiveness}/5</li>
                <li>Shedding: {breedStats.shedding}/5</li>
                <li>Trainability: {breedStats.trainability}/5</li>
              </ul>
            </>
          ) : (
            <p>Breed Stats Unavailable</p>
          )}
        </div>
      </div>
    </div>
  );
}
