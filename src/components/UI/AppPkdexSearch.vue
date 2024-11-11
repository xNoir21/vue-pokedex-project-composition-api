<template>
  <div class="container text-center pt-4">
    <div class="row">
      <div class="col-3" />
      <div class="col-6">
        <form @submit.prevent>
          <fieldset>
            <legend>Search for a Pokémon!</legend>
            <!-- Search input -->
            <div class="mb-3">
              <label class="form-label pt-2">Try it now!</label>
              <input
                type="text"
                class="form-control"
                v-model="data.searchQuery"
                placeholder="Insert a pokemon name or number"
              />
            </div>
            <!-- Search type -->
            <div class="mb-3">
              <label class="form-label pt-2">Select Search Term</label>
              <select class="form-select" v-model="data.searchType">
                <option value="-1" disabled hidden>Select a option</option>
                <option value="pokemon">Pokémon General info</option>
                <option value="pokemon-species" disabled>
                  Pokémon Species
                </option>
              </select>
            </div>
            <button
              type="submit"
              class="btn btn-primary"
              @click="searchPkmnCheck"
            >
              Submit
            </button>
            <button
              type="submit"
              class="btn btn-primary m-2"
              @click="getRandomPokemon"
            >
              Get Random Pokémon
            </button>
          </fieldset>
        </form>
      </div>
      <div class="col-3" />
    </div>
  </div>
</template>

<script setup>
import { ref, defineEmits } from 'vue'
const data = ref({
  searchQuery: '',
  searchType: '-1',
});
const emit = defineEmits(['search-pkmn']);

const searchPkmnCheck = () => {
  if (data.value.searchQuery === '' || data.value.searchType === '-1') {
    return;
  }
  let checkSearch = parseInt(data.value.searchQuery, 10).toString();
  if (!isNaN(checkSearch)) {
    data.value.searchQuery = checkSearch;
  } else {
    data.value.searchQuery = data.value.searchQuery.toLowerCase();
  }
  emit('search-pkmn', data.value);
  data.value.searchQuery = '';
};

const getRandomPokemon = () => {
  data.value.searchQuery = Math.floor(Math.random() * 1025);
  data.value.searchType = 'pokemon';
  searchPkmnCheck();
};
</script>
