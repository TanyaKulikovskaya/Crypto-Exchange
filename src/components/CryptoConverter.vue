<template>
  <div v-show="baseCoin && convertCoin">
    <div class="flex flex-col lg:flex-row justify-between">
      <div class="flex relative w-full lg:w-5/12 pb-6 mb-6 md:mb-2">
        <input
          type="text"
          v-model.trim="baseCoinAmount"
          class="appearance-none border border-[#e3ebef] bg-[#f6f7f8] w-2/3 rounded-l-md py-3 px-4 focus:outline-none"
        />
        <div class="absolute top-0 right-0" :class="[isBaseSelectOpen ? 'w-full z-10' : 'w-1/3']">
          <VueMultiselect
            v-model="baseCoin"
            :options="currencies"
            :close-on-select="true"
            :max-height="132"
            :hide-selected="true"
            label="name"
            track-by="name"
            placeholder="Search"
            selectLabel=""
            selectedLabel=""
            deselectLabel=""
            @open="toggleBaseSelect"
            @close="toggleBaseSelect"
          >
            <template v-slot:singleLabel="{ option }">
              <div class="flex items-center">
                <img :src="option.image" :alt="option.name" class="w-5 h-5 mr-3" />
                <span class="uppercase truncate">{{ option.ticker }}</span>
              </div>
            </template>
            <template v-slot:option="props">
              <div class="flex items-center w-full">
                <img :src="props.option.image" :alt="props.option.name" class="w-5 h-5 mr-5" />
                <span class="uppercase w-1/5 truncate mr-1">{{ props.option.ticker }}</span>
                <span class="text-[#80A2B6]">{{ props.option.name }}</span>
              </div>
            </template>
          </VueMultiselect>
        </div>
        <p
          v-show="baseAmountError"
          class="absolute bottom-0 left-0 w-full text-center text-[#E03F3F]"
        >
          {{ baseAmountError }}
        </p>
      </div>
      <div class="flex relative w-full lg:w-5/12 pb-6 mb-2">
        <input
          type="text"
          v-model="convertCoinAmount"
          readonly
          class="appearance-none border border-[#e3ebef] bg-[#f6f7f8] rounded-l-md w-2/3 py-3 px-4 focus:outline-none"
        />

        <div
          class="absolute top-0 right-0"
          :class="[isConvertSelectOpen ? 'w-full z-10' : 'w-1/3']"
        >
          <VueMultiselect
            v-model="convertCoin"
            :options="currencies"
            :close-on-select="true"
            :max-height="132"
            :hide-selected="true"
            label="name"
            track-by="name"
            placeholder="Search"
            selectLabel=""
            selectedLabel=""
            deselectLabel=""
            @open="toggleConvertSelect"
            @close="toggleConvertSelect"
          >
            <template v-slot:singleLabel="{ option }">
              <div class="flex items-center">
                <img :src="option.image" :alt="option.name" class="w-5 h-5 mr-3" />
                <span class="uppercase truncate">{{ option.ticker }}</span>
              </div>
            </template>
            <template v-slot:option="props">
              <div class="flex items-center">
                <img :src="props.option.image" :alt="props.option.name" class="w-5 h-5 mr-5" />
                <span class="uppercase w-1/5 truncate mr-1">{{ props.option.ticker }}</span>
                <span class="text-[#80A2B6]">{{ props.option.name }}</span>
              </div>
            </template>
          </VueMultiselect>
        </div>
      </div>
    </div>
    <p class="mb-2">Your Ethereum address</p>
    <div class="flex flex-col md:flex-row justify-between relative pb-6">
      <input
        type="text"
        class="appearance-none border border-[#e3ebef] bg-[#f6f7f8] w-full md:w-8/12 rounded-md py-3 px-4 focus:outline-none mb-4 md:mb-0"
      />
      <button
        type="button"
        class="focus:outline-none text-white bg-[#11B3FE] hover:bg-[#0095E0] w-full md:w-3/12 font-bold rounded-md uppercase px-5 py-3"
      >
        Exchange
      </button>
      <p
        v-show="error"
        class="absolute bottom-0 right-0 w-full md:w-3/12 text-center text-[#E03F3F]"
      >
        {{ error }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import VueMultiselect from 'vue-multiselect'
import debounce from 'lodash.debounce'

import Currencies from '@/api/Currencies'
import getCurrencies from '@/composables/getCurrencies'

const { currencies, baseCoin, convertCoin, load } = getCurrencies()
load()

const baseCoinAmount = ref('')
const baseCoinMinAmount = ref('')
const baseAmountError = ref('')

const convertCoinAmount = ref('')

const error = ref('')

const isBaseSelectOpen = ref(false)
const toggleBaseSelect = () => {
  isBaseSelectOpen.value = !isBaseSelectOpen.value
}

const isConvertSelectOpen = ref(false)
const toggleConvertSelect = () => {
  isConvertSelectOpen.value = !isConvertSelectOpen.value
}

watch([baseCoin, convertCoin], (newValue) => {
  const tickers = {
    from: newValue[0].ticker,
    to: newValue[1].ticker
  }
  getMinExchangeAmount(tickers)
})
const getMinExchangeAmount = async (tickers) => {
  try {
    const response = await Currencies.fetchMinExchangeAmount(tickers)
    const { minAmount } = response
    if (minAmount) {
      baseCoinAmount.value = minAmount
      baseCoinMinAmount.value = minAmount
    } else {
      error.value = 'This pair is disabled now.'
    }
  } catch (err) {
    baseCoinAmount.value = ''
    console.log('err', err)
  }
}

watch(baseCoinAmount, (newValue) => {
  if (isNaN(newValue) || newValue === '') {
    baseAmountError.value = 'Please enter a valid number.'
  } else if (
    Number.parseFloat(baseCoinAmount.value) >= Number.parseFloat(baseCoinMinAmount.value)
  ) {
    updateEstimated(newValue)
    baseAmountError.value = ''
  } else {
    convertCoinAmount.value = '-'
    baseAmountError.value = 'The entered value is below the min amount.'
  }
})
const updateEstimated = debounce((value) => {
  getEstimated(value)
}, 500)
const getEstimated = async (amount) => {
  const data = {
    amount,
    from: baseCoin.value.ticker,
    to: convertCoin.value.ticker
  }
  try {
    const response = await Currencies.fetchEstimated(data)
    const { estimatedAmount } = response
    if (estimatedAmount) {
      convertCoinAmount.value = estimatedAmount.toFixed(9)
    } else {
      error.value = 'This pair is disabled now.'
    }
  } catch (err) {
    console.log('err', err)
  }
}
</script>

<style src="vue-multiselect/dist/vue-multiselect.css"></style>
<style>
.multiselect {
  min-height: 49px;
  color: #282828;
}
.multiselect__select {
  height: 100%;
}
.multiselect__tags {
  min-height: 49px;
  border-radius: 0px;
  border-top-right-radius: 6px;
  border-bottom-right-radius: 6px;
  border: 1px solid #e3ebef;
  background: #f6f7f8;
}

.multiselect__input::placeholder {
  color: #80a2b6;
}
.multiselect__input,
.multiselect__single {
  min-height: 32px;
  line-height: 32px;
  background: #f6f7f8;
}
.multiselect__option--highlight,
.multiselect__option--highlight:after {
  background: #eaf1f7;
  color: #282828;
}
.multiselect__content-wrapper::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  border-radius: 6px;
  background-color: #eaf1f7;
}

.multiselect__content-wrapper::-webkit-scrollbar {
  width: 6px;
  background-color: #eaf1f7;
}

.multiselect__content-wrapper::-webkit-scrollbar-thumb {
  border-radius: 6px;
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background-color: #11b3fe;
}
</style>
