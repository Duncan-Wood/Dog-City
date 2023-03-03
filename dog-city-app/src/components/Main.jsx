import { Routes, Route } from 'react-router-dom'
import Home from './Home'
import Breeds from './Breeds'
import BreedDetails from './BreedDetails'

//Main is a house that holds your components. 

export default function Main () {
    return (
        <div className='main'>
            <Routes>
                <Route path='/' element={<Home />}/>
                <Route path='/breeds' element={<Breeds/>}/>
                {/* :id is used for the BreedDetails route so that I can use the ID params to create a dynamic link  */}
                <Route path='/breeds/:id' element={<BreedDetails/>}/>
            </Routes>
        </div>
    )
}