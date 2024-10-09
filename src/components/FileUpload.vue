<script setup>
import {ref} from 'vue';

const fileContent = ref('');
const startText = ref('');
const handleFileUpload = (e) => {
  const file = e.target.files[0];
  if(file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      const rawText = e.target.result;
      fileContent.value = formatText(rawText);
      startText.value = rawText;
    }
    reader.readAsText(file);
  }
}

const formatText = (rawText) => {
  const patterns = /[.,!?;:'"()]/g;
  const formated = [];
  let tempTab = [];
  let startWord = false;

  rawText.split('').forEach((letter) => {
    if(patterns.test(letter) || letter === ' ' || letter === '\n') {
      if(startWord) {
        const random = randomLetters(tempTab);
        tempTab = [];
        startWord = false;
        formated.push(random);
      }
      formated.push(letter);
    }
    else {
      startWord = true;
      tempTab.push(letter);
    }
  });

  return formated.join('');
}

const randomLetters = (letters) => {
  const tabLength = letters.length;
  const lettersToRandom = [];
  const firstAndLast = [];

  letters.forEach((letter, index) => {
    if(index === 0 || index === tabLength - 1) {
      firstAndLast.push(letter);
    } else {
      lettersToRandom.push(letter);
    }
  });

  const shuffledRandom = lettersToRandom.sort(() => Math.random() - 1);
  const text = shuffledRandom.join('');

  return `${firstAndLast[0]}${text}${firstAndLast[1]}`;
}
</script>

<template>
  <section class="container">
    <h2>Zadanie 1</h2>
    <p>Napisz program w Vue3, który posiada obsługę formularza do wgrania pliku tekstowego, a następnie przestawi losowo szyk liter w każdym wierszu oprócz pierwszej i ostatniej litery wyrazu. Uwzględnij interpunkcję, wielkie/małe litery, wielolinijkowe teksty, polskie znaki.</p>
    <h3>Rozwiązanie</h3>

    <div class="container__file">
      <input type="file" accept=".txt" @change="handleFileUpload" class="container__upload"/>
      <label for="file">Wybierz plik z rozszerzeniem .txt</label>
    </div>

    <div v-if="fileContent">
      <div>Pierwotny tekst:</div>
      <pre v-html="startText"></pre>
      <div>Tekst po modyfikacji:</div>
      <pre v-html="fileContent"></pre>
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

  &__file {
    width: 600px;
    height: 180px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border: 2px dashed #ccc;
    cursor: pointer;
  }

  &__upload {

  }
}
</style>