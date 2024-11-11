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
      showErrorMessage(error);
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
      let pkmnDataPromises = [];
      for (let i = 0; i < result.data.results.length; i++) {
        let pkmn = result.data.results[i];
        pkmnDataPromises.push(axiosInstance.get(pkmn.url));
      }
      processPromisesPkmnData(pkmnDataPromises);
    })
    .catch((error) => {
      showErrorMessage(error);
    });
};

const processPromisesPkmnData = (pkmnDataPromises) => {
  Promise.all(pkmnDataPromises)
    .then((pkmnDataResultList) => {
      let pkmnTempDataList = [];
      pkmnDataResultList.forEach((pkmnDataListElement) => {
        pkmnTempDataList.push({
          name: pkmnDataListElement.data.name,
          iconUrl:
            pkmnDataListElement.data.sprites.other.showdown.front_default,
          type: pkmnDataListElement.data.types,
          id: pkmnDataListElement.data.id,
        });
      });
      pkmnDataList.value = pkmnDataList.value.concat(
        sortPkmnList(pkmnTempDataList)
      );
    })
    .finally(() => {
      endIndex.value += pkmnDataListLimit;
      isLoading.value = false;
    });
};

const sortPkmnList = (pkmnList) => {
  return pkmnList.sort((pkmnA, pkmnB) => {
    return pkmnA.id - pkmnB.id;
  });
};

const showErrorMessage = (error) => {
  errorRequest.value.errorMessage = error.message;
  errorRequest.value.errorTitle = error.response.data;
  isModalVisible.value = true;
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
