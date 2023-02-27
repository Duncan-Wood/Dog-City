import { Routes, Route } from 'react-router-dom'
import Home from './Home'
import Breeds from './Breeds'
import BreedDetails from './BreedDetails'

//Main is a house that holds your components. 


//create a route for breeddetails using the name (so i can use dogs api)

export default function Main () {
    return (
        <div className='main'>
            <Routes>
                <Route path='/' element={<Home />}/>
                <Route path='/breeds' element={<Breeds/>}/>
                <Route path='/breeds/:id' element={<BreedDetails/>}/>
            </Routes>
        </div>
    )
}