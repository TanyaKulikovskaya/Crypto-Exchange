<template>
  <div v-if="baseCoin && convertCoin" class="flex justify-between">
    <div class="flex relative w-2/5">
      <input
        type="text"
        v-model="baseCoinAmount"
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
              <span class="uppercase">{{ option.ticker }}</span>
            </div>
          </template>
          <template v-slot:option="props">
            <div class="flex items-center">
              <img :src="props.option.image" :alt="props.option.name" class="w-5 h-5 mr-5" />
              <span class="uppercase w-1/5">{{ props.option.ticker }}</span>
              <span>{{ props.option.name }}</span>
            </div>
          </template>
        </VueMultiselect>
      </div>
    </div>
    <div class="flex relative w-2/5">
      <input
        type="text"
        v-model="convertCoinAmount"
        class="appearance-none border border-[#e3ebef] bg-[#f6f7f8] rounded-l-md w-2/3 py-3 px-4 focus:outline-none"
      />

      <div class="absolute top-0 right-0" :class="[isConvertSelectOpen ? 'w-full z-10' : 'w-1/3']">
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
              <span class="uppercase">{{ option.ticker }}</span>
            </div>
          </template>
          <template v-slot:option="props">
            <div class="flex items-center">
              <img :src="props.option.image" :alt="props.option.name" class="w-5 h-5 mr-5" />
              <span class="uppercase w-1/5">{{ props.option.ticker }}</span>
              <span>{{ props.option.name }}</span>
            </div>
          </template>
        </VueMultiselect>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import VueMultiselect from 'vue-multiselect'

import getCurrencies from '@/composables/getCurrencies'

const { currencies, baseCoin, convertCoin, load } = getCurrencies()
load()

const baseCoinAmount = ref('')
const convertCoinAmount = ref('')

const isBaseSelectOpen = ref(false)
const toggleBaseSelect = () => {
  isBaseSelectOpen.value = !isBaseSelectOpen.value
}

const isConvertSelectOpen = ref(false)
const toggleConvertSelect = () => {
  isConvertSelectOpen.value = !isConvertSelectOpen.value
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
