import React, { useContext } from 'react';
import { DataContext } from '../DataContext';

export default function Home () {
    const { dogs } = useContext(DataContext);

    return (
        <div>
            <h1>Welcome to Dog City!</h1>
            {/* This code is a placeholder and will probably need to change. in the future, I will add a variable for index to use for the default random dog on the starting page. */}
            {dogs.length > 0 && (
            <img src={dogs[0].url} alt="random dog photo" style={{width:'50%'}}/>
            )}
        </div>
    )
}