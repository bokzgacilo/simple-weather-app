import React, { useState } from "react";
import './App.css'

const App = () => {
  const mockWeatherData = {
    'New York': { 
      temperature: '22°C', 
      humidity: '56%', 
      windSpeed: '15 km/h'
    },
    'Los Angeles': {
      temperature: '27°C',
      humidity: '45%',
      windSpeed: '10 km/h',
    },
    'London': { 
      temperature: '15°C', 
      humidity: '70%', 
      windSpeed: '20 km/h' 
    },
  };
  
  const [searchesArray, SetSearchesArray] = useState([]);
  const [searchInput, SetSearchInput] = useState("");
  const [city, SetCity] = useState("");

  const handleSearch = () => {
    try {
      if (searchInput in mockWeatherData) {
        if (!searchesArray.includes(searchInput)) {
          SetSearchesArray([...searchesArray, searchInput]);
          SetCity(searchInput);
          SetSearchInput("");
        } else {
          SetCity(searchInput);
        }
      }else {
        SetCity("")
      }
    } catch (error) {
      alert("Invalid JSON input.");
    }
  };

  const handleQuickSearch = (event) => {
    SetCity(event.target.textContent);
  }

  return (
    <main>
      <div>
        <input  
          value={searchInput}
          onChange={(event) => SetSearchInput(event.target.value)}
          type="text" 
          id="citySearch" 
          placeholder="Search for a city..." 
        />
        <button onClick={handleSearch} id="searchButton">Search</button>
      </div>
      {city === "" ? <p>City not found</p> : <p>You are viewing data for <b>{city}</b></p>}
      <div>{city !== "" && 
        <div id="weatherData">
          <p>Temperature: <span>{mockWeatherData[city].temperature}</span></p>
          <p>Humidity: <span>{mockWeatherData[city].humidity}</span></p>
          <p>Wind Speed: <span>{mockWeatherData[city].windSpeed}</span></p>
        </div>
      }</div>
      <div id="previousSearches">
        {searchesArray.map((value, index) => (
          <button onClick={handleQuickSearch} key={index}>{value}</button>
        ))}
      </div>
    </main>
  );
};

export default App;
