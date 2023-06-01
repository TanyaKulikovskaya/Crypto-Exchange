import axios from 'axios'

const API = axios.create({
  baseURL: 'https://api.changenow.io/v2/exchange',
  headers: {
    'x-changenow-api-key': import.meta.env.VITE_API_KEY
  }
})

export default {
  async fetchCurrencies() {
    const response = await API.get('/currencies?active=true&flow=standard')
    if (response) {
      return response.data
    }
  }
}
