<template>
  <div
    class="absolute top-0 right-0 h-[49px]"
    :class="[isSelectOpen ? 'w-full z-10' : 'w-2/5 md:w-1/3']"
  >
    <div
      v-if="!isSelectOpen"
      class="relative flex items-center justify-between h-full px-1 py-1 text-custom-gray border border-[#e3ebef] bg-[#f6f7f8] rounded-r-md hover:cursor-pointer"
      @click="toggleSelect"
    >
      <div class="flex pr-2 pl-1">
        <img :src="option.image" :alt="option.name" class="w-5 h-5 mr-3" />
        <span class="uppercase truncate mr-1">{{ option.ticker }}</span>
      </div>
      <button class="h-full flex items-center bg-transparent px-1">
        <svg
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          c
        >
          <path
            d="M5.01077 5.99987C5.23471 5.99804 5.44916 5.90703 5.60872 5.74612L9.74595 1.5096C9.90811 1.34428 9.99949 1.11977 10 0.885451C10.0005 0.651135 9.91008 0.42621 9.74864 0.260157C9.5872 0.0941027 9.36795 0.000521907 9.13913 2.17641e-06C8.91031 -0.000517555 8.69066 0.0920662 8.52849 0.257385L5 3.87057L1.47151 0.257386C1.39121 0.175528 1.29595 0.110666 1.19118 0.066504C1.08641 0.0223427 0.974171 -0.000254555 0.86087 2.94837e-06C0.747568 0.000259974 0.635423 0.0233675 0.530842 0.0680047C0.426262 0.112642 0.331288 0.177935 0.25135 0.260156C0.171411 0.342378 0.108078 0.439918 0.0649512 0.547206C0.0218248 0.654494 -0.0002492 0.76943 2.12213e-06 0.885452C0.000253444 1.00147 0.0228229 1.11631 0.0664137 1.2234C0.110004 1.33049 0.17376 1.42774 0.254054 1.5096L4.39127 5.74612C4.47288 5.82845 4.56971 5.8933 4.67608 5.93687C4.78244 5.98043 4.89623 6.00185 5.01077 5.99987Z"
            fill="#80A2B6"
          />
        </svg>
      </button>
    </div>
    <div
      v-else
      v-on-click-outside="handleClickOutside"
      class="border border-[#e3ebef] bg-[#f6f7f8] rounded-md hover:border-[#c1d9e6] hover:bg-white transition-all ease-in-out delay-150"
    >
      <div class="flex justify-between items-center py-3 px-4 border-b border-[#e3ebef]">
        <input
          type="text"
          placeholder="Search"
          v-model.trim="search"
          class="appearance-none w-full bg-inherit focus:outline-none"
        />
        <button class="h-full flex items-center bg-transparent" @click="clearSearch">
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.1787 1.26318L6.00003 5.44187L1.82134 1.26318L1.26318 1.82134L5.44187 6.00003L1.26318 10.1787L1.82134 10.7369L6.00003 6.55815L10.1787 10.7369L10.7369 10.1787L6.55815 6.00003L10.7369 1.82134L10.1787 1.26318Z"
              fill="#80A2B6"
              stroke="#80A2B6"
            />
          </svg>
        </button>
      </div>
      <ul
        v-show="matchingOptions.length > 0"
        class="max-h-[144px] overflow-x-hidden overflow-y-auto"
      >
        <li
          v-for="(option, idx) in matchingOptions"
          :key="`${option.ticker}-${idx}`"
          class="flex items-center py-3 px-4 hover:bg-[#eaf1f7] transition-bg ease-in-out delay-150 hover:cursor-pointer"
          @click="selectOption(option)"
        >
          <img :src="option.image" :alt="option.name" class="w-5 h-5 mr-5" />
          <span class="uppercase w-1/5 truncate mr-1">{{ option.ticker }}</span>
          <span class="text-[#80A2B6]">{{ option.name }}</span>
        </li>
      </ul>
      <span v-show="matchingOptions.length === 0" class="flex items-center px-4 h-[48px]">
        Not found
      </span>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

import { vOnClickOutside } from '@vueuse/components'

const props = defineProps({
  options: {
    type: Array,
    default: () => []
  },
  option: {
    type: Object,
    default: () => {}
  }
})

const isSelectOpen = ref(false)
const toggleSelect = () => {
  isSelectOpen.value = !isSelectOpen.value
}

const search = ref('')
const matchingOptions = computed(() => {
  const query = search.value.toLowerCase()
  return query === ''
    ? props.options
    : props.options.filter(({ ticker, name }) => {
        return ticker.includes(query) || name.toLowerCase().includes(query)
      })
})

const emit = defineEmits(['setOption'])

const selectOption = (option) => {
  clearSearch()
  toggleSelect()
  emit('setOption', option)
}

const clearSearch = () => {
  search.value = ''
}

const handleClickOutside = () => {
  clearSearch()
  toggleSelect()
}
</script>

<style scoped>
::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  border-radius: 6px;
  background-color: #eaf1f7;
}

::-webkit-scrollbar {
  width: 6px;
  background-color: #eaf1f7;
}

::-webkit-scrollbar-thumb {
  border-radius: 6px;
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background-color: #11b3fe;
}
</style>
