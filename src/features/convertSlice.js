import { createSlice } from "@reduxjs/toolkit"

export const convertSlice = createSlice({
  name: "convert",
  initialState: {
    value: "",
    error: false,
    errorDecimal: false,
  },
  reducers: {
    romanToDecimal: (state, action) => {
      const roman = action.payload.toUpperCase()
      if (
        !/^M{0,3}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$/.test(roman)
      ) {
        state.error = true

        return
      }

      const roman2Decimal = new Map()

      roman2Decimal.set("I", 1)
      roman2Decimal.set("V", 5)
      roman2Decimal.set("X", 10)
      roman2Decimal.set("L", 50)
      roman2Decimal.set("C", 100)
      roman2Decimal.set("D", 500)
      roman2Decimal.set("M", 1000)
      let number = 0
      state.error = false
      for (let i = 0; i < roman.length; i++) {
        let firstValue = roman2Decimal.get(roman[i])
        let secondValue = roman2Decimal.get(roman[i + 1])
        if (firstValue < secondValue) {
          number += secondValue - firstValue
          i++
        } else {
          number += roman2Decimal.get(roman[i])
        }
      }

      state.value = number
    },
    decimalToRoman: (state, action) => {
      let decimal = action.payload
      if (!/^[0-9]+$/.test(decimal)) {
        state.errorDecimal = true

        return
      }

      const decimal2Roman = new Map()

      decimal2Roman.set("M", 1000)
      decimal2Roman.set("CM", 900)
      decimal2Roman.set("D", 500)
      decimal2Roman.set("CD", 400)
      decimal2Roman.set("C", 100)
      decimal2Roman.set("XC", 90)
      decimal2Roman.set("L", 50)
      decimal2Roman.set("XL", 40)
      decimal2Roman.set("X", 10)
      decimal2Roman.set("IX", 9)
      decimal2Roman.set("V", 5)
      decimal2Roman.set("IV", 4)
      decimal2Roman.set("I", 1)

      let roman = ""
      state.errorDecimal = false
      decimal2Roman.forEach((item, key) => {
        let divNum = Math.floor(decimal / item)

        decimal -= divNum * item

        roman += key.repeat(divNum)
      })
      state.value = roman
    },
    resetErrors: (state) => {
      state.error = false
      state.errorDecimal = false
    },
  },
})

export const { romanToDecimal, decimalToRoman, resetErrors } =
  convertSlice.actions

export default convertSlice.reducer
