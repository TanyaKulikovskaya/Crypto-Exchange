import { ref } from 'vue'
import Currencies from '@/api/Currencies'

const getCurrencies = () => {
  const currencies = ref([])
  const baseCoin = ref(null)
  const convertCoin = ref(null)

  const load = async () => {
    const response = await Currencies.fetchCurrencies()
    currencies.value = response
    baseCoin.value = response.filter(({ name }) => name === 'Bitcoin')[0]
    convertCoin.value = response.filter(({ name }) => name === 'Ethereum')[0]
  }
  return { currencies, baseCoin, convertCoin, load }
}

export default getCurrencies
