<template>
  <loading
    v-model:active="isLoading"
    :can-cancel="true"
    :on-cancel="onCancel"
    :is-full-page="fullPage"
    color="red"
    loader="dots"
  />
  <div class="d-flex flex-column min-vh-100 bg-light">
    <the-header></the-header>
    <div class="container-xxl">
      <app-pkdex-search @search-pkmn="getPkmn"></app-pkdex-search>
      <app-pkdex-grid
        class="pt-2"
        v-if="pkmnData !== null && isModalVisible === false"
        :pkmn-data="pkmnData"
      ></app-pkdex-grid>
      <app-pkdex-homepage-grid
        v-else-if="pkmnDataList.length !== 0"
        class="pt-2 pb-2"
        :pkmn-data-list="pkmnDataList"
        @load-pkmn="getPkmnList"
        @load-pkmn-details="getPkmn"
      >
      </app-pkdex-homepage-grid>
    </div>
    <the-footer></the-footer>
    <the-error-modal
      v-if="isModalVisible"
      :error-request="errorRequest"
      @close-modal="closeModal"
    ></the-error-modal>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import TheHeader from './components/Layout/TheHeader.vue';
import TheFooter from './components/Layout/TheFooter.vue';
import TheErrorModal from './components/Layout/TheErrorModal.vue';
import AppPkdexSearch from './components/UI/AppPkdexSearch.vue';
import AppPkdexGrid from './components/UI/AppPkdexGrid.vue';
import AppPkdexHomepageGrid from './components/UI/AppPkdexHomepageGrid.vue';
import getAxios from './components/Functionality/vue-pokedex-project';
import Loading from 'vue-loading-overlay';

const axiosInstance = getAxios();
const isLoading = ref(false);
const pkmnData = ref(null);
const pkmnDataList = ref([]);
const endIndex = ref(0);
const pkmnDataListLimit = 10;
const isModalVisible = ref(false);
const errorRequest = ref({
  errorTitle: '',
  errorMessage: '',
});

const getPkmn = (value) => {
  isLoading.value = true;
  let url = `/${value.searchType}/${value.searchQuery}`;
  axiosInstance
    .get(url)
    .then((result) => {
      pkmnData.value = result;
    })
    .catch((error) => {
      errorRequest.value.errorMessage = error.message;
      errorRequest.value.errorTitle = error.response.data;
      isModalVisible.value = true;
    })
    .finally(() => {
      isLoading.value = false;
    });
};

const getPkmnList = () => {
  isLoading.value = true;
  let url = `pokemon?offset=${endIndex.value}&limit=${pkmnDataListLimit}`;
  axiosInstance
    .get(url)
    .then((result) => {
      for (let i = 0; i < result.data.results.length; i++) {
        let pkmn = result.data.results[i];
        var pkmnTempDataList = [];

        axiosInstance.get(pkmn.url).then((pkmnData) => {
          let pkmnList = {
            name: pkmn.name,
            iconUrl: pkmnData.data.sprites.other.showdown.front_default,
            type: pkmnData.data.types,
            id: pkmnData.data.id,
          };

          pkmnTempDataList.push(pkmnList);
          if (pkmnTempDataList.length === pkmnDataListLimit) {
            pkmnDataList.value = pkmnDataList.value.concat(
              sortPkmnList(pkmnTempDataList)
            );

            endIndex.value += pkmnDataListLimit;
            isLoading.value = false;
          }
        });
      }
    })
    .catch((error) => {
      errorRequest.value.errorMessage = error.message;
      errorRequest.value.errorTitle = error.response.data;
      isModalVisible.value = true;
    });
};

const sortPkmnList = (pkmnList) => {
  return pkmnList.sort((pkmnA, pkmnB) => {
    return pkmnA.id - pkmnB.id;
  });
};

const closeModal = () => {
  isModalVisible.value = false;
};

onMounted(() => {
  getPkmnList();
});
</script>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
