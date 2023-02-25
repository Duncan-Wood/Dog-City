import { useState, useEffect } from "react"
import  axios  from 'axios'


export default function Home () {
    const [randomDogImage, setRandomDogImage] = useState([])

    useEffect(() => {
        const getRandomDogImage = async () => {
          const response = await axios.get(`https://api.thedogapi.com/v1/images/search`)
          console.log(response.data)
          setRandomDogImage(response.data[0])
        }
    
        getRandomDogImage()
      }, [])
    return (
        <div>
            <h1>Welcome to Dog City!</h1>
            {randomDogImage ? <img src={randomDogImage.url} alt="random dog photo" style={{width:'50%'}}/> : "dog loading"}
        </div>
    )
}