import React, { useEffect, useState } from 'react'
import Header from './Components/Header.component';



const RegularLayout = (props) => {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    useEffect(() => {

    }, [])

    return (
        <>
            <Header />
            {props.children}

            {}
        </>
    )
}

export default RegularLayout;
