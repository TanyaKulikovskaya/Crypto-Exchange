import axios from 'axios'

const API = axios.create({
  baseURL: 'https://api.changenow.io/v1'
})

export default {
  async fetchCurrencies() {
    const response = await API.get('/currencies?active=true')
    if (response) {
      return response.data
    }
  },
  async fetchMinExchangeAmount({ from, to }) {
    const response = await API.get(
      `/min-amount/${from}_${to}?api_key=${import.meta.env.VITE_API_KEY}`
    )
    if (response) {
      return response.data
    }
  },
  async fetchEstimated({ amount, from, to }) {
    const response = await API.get(
      `exchange-amount/${amount}/${from}_${to}/?api_key=${import.meta.env.VITE_API_KEY}`
    )
    if (response) {
      return response.data
    }
  }
}
