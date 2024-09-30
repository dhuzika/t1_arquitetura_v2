require('dotenv').config();
const axios = require('axios');

async function getCoordinates(city) {
  const apiKey = process.env.OPENWEATHERMAP_API_KEY;
  const url = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`;

  try {
    const response = await axios.get(url);
    const data = response.data[0];
    if (data) {
      const { lat, lon } = data;
      console.log(`Coordenadas de ${city}: Latitude: ${lat}, Longitude: ${lon}`);
      return { lat, lon };
    } else {
      console.log(`Cidade ${city} não encontrada.`);
    }
  } catch (error) {
    console.error(`Erro ao buscar coordenadas: ${error}`);
  }
}

async function getCurrentConditions(lat, lon) {
  const apiKey = process.env.OPENWEATHERMAP_API_KEY;
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

  try {
    const response = await axios.get(url);
    const data = response.data;
    if (data) {
      const feelsLike = data.main.feels_like;
      const description = data.weather[0].description;
      console.log(`Sensação térmica: ${feelsLike}°C`);
      console.log(`Descrição: ${description}`);
      return { feelsLike, description };
    } else {
      console.log(`Condições atuais não encontradas.`);
    }
  } catch (error) {
    console.error(`Erro ao buscar condições atuais: ${error}`);
  }
}

// Exemplo de uso
(async () => {
  const city = 'Santos';
  const coords = await getCoordinates(city);
  if (coords) {
    await getCurrentConditions(coords.lat, coords.lon);
  }
})();