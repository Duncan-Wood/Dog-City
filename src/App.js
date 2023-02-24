import './App.css';
import { Routes, Route } from "react-router-dom"
import { useState, useEffect } from "react"
import  axios  from 'axios'
import { DataContext } from './DataContext'

import Home from './components/Home'

function App() {
  const [dogs, setDogs] = useState([])
  const [selectedDog, setSelectedDog] = useState(null)

  useEffect(() => {
    const getDogs = async () => {
      const response = await axios.get(`https://api.thedogapi.com/v1/images/search`)
      console.log(response.data)
      console.log(response.data.url)
      setDogs(response.data)
    }

    getDogs()
  }, [])

  return (
    <div className="App">
      <DataContext.Provider value={{dogs, setDogs}}>
        <Home />
      </DataContext.Provider>    
      </div>
  );
}

export default App;
