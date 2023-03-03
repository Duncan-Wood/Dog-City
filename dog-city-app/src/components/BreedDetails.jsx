import "../css/BreedDetails.css";

import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import Chart from "chart.js/auto";
import {
  BREED_DETAILS_URL,
  REACT_APP_THEDOGAPI_KEY,
  REACT_APP_DOGSAPI_KEY,
} from "../globals";

export default function BreedDetails() {
  const { id } = useParams();
  const [breedDetails, setBreedDetails] = useState(null);
  const [breedStats, setBreedStats] = useState(null);
  const chartContainer = useRef(null);

  const getBreedDetails = async () => {
    try {
      const breedResponse = await axios.get(
        `${BREED_DETAILS_URL}${id}&api_key=${REACT_APP_THEDOGAPI_KEY}`
      );
      const breedName = breedResponse.data[0].breeds[0].name;

      const statsResponse = await axios.get(
        `https://api.api-ninjas.com/v1/dogs?name=${breedName}&api_key=${REACT_APP_DOGSAPI_KEY}`,
        {
          headers: {
            "X-Api-Key": `${REACT_APP_DOGSAPI_KEY}`,
          },
        }
      );
      setBreedDetails(breedResponse.data[0]);
      setBreedStats(statsResponse.data[0]);
    } catch (error) {
      alert(
        "There was an error getting the breed details and/or breed stats. Please email duncanwoodpro@gmail.com to notify them about this error."
      );
    }
  };

  //This useEffect hook is created to ensure that the page rerenders any time the ID changes
  useEffect(() => {
    getBreedDetails();
  }, [id]);

  //ChatGPT was a big help for me to figure out this code in particular. Graphs are not easy to make and I spent a lot of time on this!
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
          backgroundColor: "#D99F59",
          borderColor: "#412a17",
          borderWidth: 1,
        },
      ],
    };
  };
  useEffect(() => {
    // Set up chart when breedStats and chartContainer are available
    if (breedStats && chartContainer.current) {
      Chart.defaults.color = "#412a17";
      const chartData = getChartData();
      const chartOptions = {
        plugins: {
          legend: {
            display: false,
          },
        },
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

  return (
    <div className="breed-details-container">
      <Link to="/breeds" className="details-back-button">
        Back
      </Link>
      {breedDetails ? (
        <>
          <div className="top">
            <h1>{breedDetails.breeds[0].name}</h1>
            <img
              src={breedDetails.url}
              alt="Breed Image"
              style={{ width: "50%" }}
            />
          </div>
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
              <ul>
                <li>
                  Barking:{" "}
                  {breedStats.barking
                    ? breedStats.barking + "/5"
                    : "Unavailable"}
                </li>
                <li>
                  Coat Length:{" "}
                  {breedStats.coat_length
                    ? breedStats.coat_length + "/5"
                    : "Unavailable"}
                </li>
                <li>
                  Drooling:{" "}
                  {breedStats.drooling
                    ? breedStats.drooling + "/5"
                    : "Unavailable"}
                </li>
                <li>
                  Energy:{" "}
                  {breedStats.energy ? breedStats.energy + "/5" : "Unavailable"}
                </li>
                <li>
                  Good with Children:{" "}
                  {breedStats.good_with_children
                    ? breedStats.good_with_children + "/5"
                    : "Unavailable"}
                </li>
                <li>
                  Good with Other Dogs:{" "}
                  {breedStats.good_with_other_dogs
                    ? breedStats.good_with_other_dogs + "/5"
                    : "Unavailable"}
                </li>
                <li>
                  Good with Strangers:{" "}
                  {breedStats.good_with_strangers
                    ? breedStats.good_with_strangers + "/5"
                    : "Unavailable"}
                </li>
                <li>
                  Grooming:{" "}
                  {breedStats.grooming
                    ? breedStats.grooming + "/5"
                    : "Unavailable"}
                </li>
                <li>
                  Playfulness:{" "}
                  {breedStats.playfulness
                    ? breedStats.playfulness + "/5"
                    : "Unavailable"}
                </li>
                <li>
                  Protectiveness:{" "}
                  {breedStats.protectiveness
                    ? breedStats.protectiveness + "/5"
                    : "Unavailable"}
                </li>
                <li>
                  Shedding:{" "}
                  {breedStats.shedding
                    ? breedStats.shedding + "/5"
                    : "Unavailable"}
                </li>
                <li>
                  Trainability:{" "}
                  {breedStats.trainability
                    ? breedStats.trainability + "/5"
                    : "Unavailable"}
                </li>
              </ul>
            </>
          ) : (
            <h2>Breed Stats Unavailable</h2>
          )}
        </div>
      </div>
    </div>
  );
}
