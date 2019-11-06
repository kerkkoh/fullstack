import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Country = ({data, weather}) => {
  
  return (
    <div>
      <h1>{data.name}</h1>
      <p>capital {data.capital}<br/>
      population {data.population}</p>
      <h3>languages</h3>
      <ul>
        {data.languages.map(l => <li key={l.iso639_1}>{l.name}</li>)}
      </ul>
      <img alt='flag' src={data.flag} height='100px'/>
      {
        ( weather.temperature !== undefined ) ? (
          <div>
            <h3>Weather in {data.name}</h3>
            <b>temperature:</b> {weather.temperature}<br/>
            <img alt='weather' src={weather.weather_icons} height='60px'/><br/>
            <b>wind:</b> {weather.wind_speed} kph direction {weather.wind_dir}<br/>
          </div>
        ) : (<div></div>)
      }
    </div>
  )
}
const Result = ({allCountries, filter, setCountry, country}) => {
  if ( filter === '' || country.name !== undefined ) return (<div></div>)

  const countries = allCountries.filter( c => c.name.toLowerCase().includes(filter.toLowerCase()))
  
  if ( countries.length === 1) {
    setCountry(countries[0])
    return (<div></div>)
  } else if (countries.length > 10) {
    return (<p>Too many matches, specify another filter</p>)
  } else {
    return (
      <ul>
        {
          countries.map( c => <li key={c.alpha3Code}>{c.name}<button onClick={() => setCountry(c)}>show</button></li>)
        }
      </ul>
    )
  }
}

const Filter = ({filter, setFilter, setCountry, setWeather}) => {
  const newFilter = (val) => {
    setFilter(val)
    setCountry({})
    setWeather({})
  }
  return (
    <div>
      find countries: <input
      value={filter}
      onChange={event => newFilter(event.target.value)} />
    </div>
  )
}

const App = () => {
  const [ allCountries, setAllCountries] = useState([])
  const [ filter, setFilter] = useState('')
  const [ country, setCountry] = useState({})
  const [ weather, setWeather] = useState({})
  
  const API_KEY = '375a087693e93ee863d33d72cb88d763'

  useEffect(() => {
    axios.get('https://restcountries.eu/rest/v2/all')
         .then(res => setAllCountries(res.data))
  }, [])
  useEffect(() => {
    if (country.capital !== undefined) {
      axios.get(`http://api.weatherstack.com/current?access_key=${API_KEY}&query=${country.capital}`)
      .then(res => setWeather(res.data.current))
      .catch(console.error)
    }
  }, [country])

  return (
    <div>
      <Filter filter={filter} setFilter={setFilter} setCountry={setCountry} setWeather={setWeather}/>
      <Result allCountries={allCountries} filter={filter} setCountry={setCountry} country={country}/>
      {country.name === undefined ? <div></div> : <Country data={country} weather={weather}/>}
    </div>
  )

}

export default App