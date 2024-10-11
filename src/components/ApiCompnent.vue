<script setup>
import { ref, onMounted } from 'vue';

const users = ref([]);
const posts = ref([]);
const error = ref('');

const searchInput = ref('');
const filterUsers = ref('');

const selectedOption = ref('Name');
const isOpen = ref(false);
const options = ['ID', 'Name', 'Email'];

const isModalOpen = ref(false);
const title = ref('');
const body = ref('');
const foundPost = ref('');

const fetchUsers = async () => {
  try {
    const response = await fetch('https://gorest.co.in/public/v2/users');
    if(!response.ok) {
      throw new Error('Somethink go wrong');
    }
    const data = await response.json();
    users.value = data;
    filterUsers.value = data;
    // console.log(data);
  } catch (err) {
    error.value = `Problem z pobraniem użytkowników ${err.message}`;
  }
};

const fetchPosts = async () => {
  try {
    const response = await fetch('https://gorest.co.in/public/v2/posts');
    if(!response.ok) {
      throw new Error('Somethink go wrong');
    }
    const data = await response.json();
    posts.value = data;
    // console.log(data);
  } catch (err) {
    error.value = `Problem z pobraniem postów ${err.message}`;
  }
};

const searchUser = () => {
  switch (selectedOption.value) {
    case 'ID':
      filterUsers.value = users.value.filter(user =>
          user.id.toString().includes(searchInput.value)
      );
      break;
    case 'Name':
      filterUsers.value = users.value.filter(user =>
          user.name.toLowerCase().includes(searchInput.value.toLowerCase())
      );
      break;
    case 'Email':
      filterUsers.value = users.value.filter(user =>
          user.email.toLowerCase().includes(searchInput.value.toLowerCase())
      );
      break;
    default:
      filterUsers.value = users.value.filter(user =>
          user.name.toLowerCase().includes(searchInput.value.toLowerCase())
      );
      break;
  }
}

const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};

const selectOption = (option) => {
  selectedOption.value = option;
  isOpen.value = false;
};

const editPost = (id) => {
  isModalOpen.value = true;
  foundPost.value = posts.value.find(post => post.id === id);
  title.value = foundPost.value.title;
  body.value = foundPost.value.body;
}

const savePost = () => {
  isModalOpen.value = false;
  foundPost.value.body = body.value;
  foundPost.value.title = title.value;
}

onMounted(fetchUsers);
onMounted(fetchPosts);
</script>

<template>
  <section class="container">
    <div class="modal" v-if="isModalOpen">
      <div class="modal__box">
        <h4>Edytuj post</h4>
        <div>Tytuł</div>
        <input type="text"
               class="modal__input"
               v-model="title"
        >
        <div>Treść</div>
        <textarea v-model="body"
                  placeholder="Wpisz dużo tekstu..."
                  rows="10" cols="40"
                  class="modal__input"
        ></textarea>
        <div class="modal__con">
          <button class="modal__con__btn" @click="savePost">Zatwierdź</button>
        </div>
      </div>
    </div>
    <h2>Zadanie 3</h2>
    <p>Napisz w Vue3 obsługę API dostępnego pod <a href="https://gorest.co.in/" target="_blank">adresem</a>. Aplikacja powinna posiadać widok listy użytkowników (pobranych z API) oraz mieć możliwość ich wyszukiwania i edycji istniejących wpisów.</p>
    <h3>Rozwiązanie</h3>
    <div class="box">
      <div class="box__users">
        <h3>Lista użytkowników</h3>
        <div class="searching">
          <input type="text"
                 placeholder="Wyszukaj użytkownika..."
                 v-model="searchInput"
                 @input="searchUser"
                 class="box__search"
          >
          <div class="dropdown">
            <button @click="toggleDropdown" class="dropdown__button">
              {{ selectedOption || 'Wybierz opcję' }}
            </button>
            <ul v-if="isOpen" class="dropdown__list">
              <li v-for="(option, index) in options" :key="index" @click="selectOption(option)">
                {{ option }}
              </li>
            </ul>
          </div>
        </div>
        <table>
          <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Gender</th>
            <th>Status</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="user in filterUsers" :key="user.id">
            <td>{{ user.id }}</td>
            <td>{{ user.name }}</td>
            <td>{{ user.email }}</td>
            <td :class="{ male: user.gender === 'male', female: user.gender === 'female' }">{{ user.gender }}</td>
            <td :class="{ active: user.status === 'active', inactive: user.status === 'inactive' }">{{ user.status }}</td>
          </tr>
          </tbody>
        </table>
      </div>
      <div class="box__posts">
        <h3>Posty użytkowników</h3>
        <div class="box__posts__description">Posty wszystkich użytkowników</div>
        <table>
          <thead>
          <tr>
            <th>ID</th>
            <th>User ID</th>
            <th>Title</th>
            <th>Post</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="post in posts" :key="post.id" @click="editPost(post.id)" class="clickable">
            <td>{{ post.id }}</td>
            <td>{{ post.user_id }}</td>
            <td>{{ post.title }}</td>
            <td>{{ post.body }}</td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;

  &__box {
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    max-width: 400px;
    width: 100%;
    text-align: center;
  }

  &__input {
    width: 80%;
    padding: 10px;
    margin: 10px 0;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-family: "Afacad Flux", sans-serif;
  }

  &__con {
    display: flex;
    justify-content: center;
    margin-top: 15px;

    &__btn {
      background-color: #f2f2f2;
      width: 100px;
      padding: 10px 20px;
      border: none;
      cursor: pointer;
      border-radius: 4px;
      font-size: 16px;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    &__btn:hover {
      background-color: white;
      border: 1px solid black;
      padding: 9px 19px;
    }
  }
}

.container {
  padding: 20px 90px 60px 90px;
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

  .box {
    width: 100%;
    display: flex;

    &__users {
      width: 50%;
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-right: 20px;
    }

    &__posts {
      width: 50%;
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-left: 20px;

      &__description{
        margin-bottom: 20px;
      }
    }

    &__search {
      width: 200px;
      padding: 5px;
      box-sizing: border-box;
      border: 1px solid #ccc;
      font-family: "Afacad Flux", sans-serif;
      border-radius: 4px;
      background-color: #f2f2f2;
      font-size: 16px;
      color: #333;
      outline: none;
    }

    table {
      width: 100%;
      border-collapse: collapse;
    }

    th, td {
      border: 1px solid #ddd;
      padding: 8px;
      text-align: left;
    }

    th {
      background-color: #f2f2f2;
      font-weight: bold;
    }
  }
}

.searching {
  display: flex;
  margin-bottom: 20px;
  gap: 20px;
  align-items: center;
}

.dropdown {
  position: relative;
  display: inline-block;

  &__button {
    background-color: #f2f2f2;
    width: 100px;
    padding: 10px 20px;
    border: none;
    cursor: pointer;
    border-radius: 4px;
    font-size: 16px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &__list {
    position: absolute;
    background-color: white;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    border-radius: 4px;
    list-style: none;
    padding: 0;
    margin: 0;
    width: 100%;
    z-index: 1;

    li {
      padding: 10px;
      cursor: pointer;
    }

    li:hover {
      background-color: #f1f1f1;
    }
  }
}

.clickable {
  cursor: pointer;
}

.clickable:hover {
  background-color: #f1f1f1;
}

.active {
  color: forestgreen;
}
.inactive {
  color: orangered;
}
.male {
  color: cornflowerblue;
}
.female {
  color: hotpink;
}
</style>