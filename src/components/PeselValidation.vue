<script setup>
import { ref } from 'vue'

const pesel = ref('')
const isPeselValid = ref(null)
const errorMessage = ref('')

const validatePesel = () => {
  errorMessage.value = ''
  isPeselValid.value = null

  if (!/^\d{11}$/.test(pesel.value)) {
    errorMessage.value = 'PESEL jest nie poprawny'
    return
  }

  const weights = [1, 3, 7, 9, 1, 3, 7, 9, 1, 3]
  const digits = pesel.value.split('').map(Number)
  const checksum = digits
      .slice(0, 10)
      .reduce((sum, digit, index) => sum + digit * weights[index], 0)

  const controlDigit = (10 - (checksum % 10)) % 10

  isPeselValid.value = controlDigit === digits[10]
}
</script>

<template>
  <section class="container">
    <h2>Zadanie 2</h2>
    <p>Napisz program w Vue3 do walidacji numeru PESEL zgodnie z oficjalną specyfikacją formatu. Przygotuj testy jednostkowe sprawdzające kilka danych nieprawidłowych i przynajmniej jeden poprawny numer PESEL.</p>
    <h3>Rozwiązanie</h3>
    <form @submit.prevent="validatePesel">
      <div>
        <label for="pesel">Podaj nr. PESEL:</label>
        <input
            type="text"
            id="pesel"
            v-model="pesel"
            maxlength="11"
            placeholder="Wprowadź PESEL"
        />
      </div>
      <button type="submit">Sprawdź</button>
    </form>

    <div v-if="errorMessage" class="error">{{ errorMessage }}</div>
    <div v-if="isPeselValid !== null" class="result">
      <p v-if="isPeselValid" class="valid">PESEL jest poprawny.</p>
      <p v-else class="invalid">PESEL jest niepoprawny.</p>
    </div>
  </section>
</template>

<style scoped lang="scss">
.container {
  padding: 20px 90px 0 90px;
  display: flex;
  flex-direction: column;
  align-items: center;

  h2 {
    font-size: 44px;
  }

  p {
    font-size: 19px;
    text-align: center;
  }

  h3 {
    font-size: 34px;
  }
}
.pesel-validator {
  max-width: 300px;
  margin: 0 auto;
}

.error {
  color: red;
}

.result {
  margin-top: 15px;
}

.valid {
  color: green;
}

.invalid {
  color: red;
}
</style>