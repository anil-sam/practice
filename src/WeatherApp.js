import React, { useState, useEffect } from 'react'

function WeatherApp() {

	const [city, setCity] = useState('Bangalore')
	const [response, setResponse] = useState({})
	
	const handleClick = async () => {
		if(city === '') return
		const data = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=65f65ad51bc6a263c95e2a78516c9843`)
		.then(res => res.json())
		.catch(err => err)
		console.log(data)
		setResponse(data)
		setCity('')
	}

	useEffect(() => {
		handleClick()
	}, [])

    return (
        <div>
          	<input type="text" value={city} onChange={e => setCity(e.target.value)} />
					<button onClick={handleClick}>Search</button>
					{response?.cod == "200" && <>
					<h1>Name: {response.name}</h1>
					<h3>Description: {response?.weather?.[0]?.description}</h3>
					<h3>Wind Speed: {response?.wind?.speed}</h3>
					<h3>Sunrise : {response?.sys?.sunrise}</h3>
					<h3>Sunset : {response?.sys?.sunset}</h3>
					<h3>Humidity: {response?.main?.humidity}</h3>
					<h3>Teperature: {response?.main?.temp}</h3>
					<h3>Pressure: {response?.main?.pressure}</h3>
					</>}
					{response?.cod === "404" && <>
					<h1>{response.message}</h1>
					</>}
        </div>
    )
}

export default WeatherApp