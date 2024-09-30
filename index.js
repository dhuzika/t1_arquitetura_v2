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

// Exemplo de uso
getCoordinates('Santos');
