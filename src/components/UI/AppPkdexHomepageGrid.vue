<template>
  <div class="container text-center pt-4">
    <div class="row">
      <div class="col-sm">
        <div
          v-for="(group, groupIdx) in groupPkmnData"
          :key="groupIdx"
          class="row border"
        >
          <div v-for="(pkmn, idx) in group" :key="idx" class="col-sm-3 border">
            <button class="btn btn-light" @click="loadPkmnDetails(pkmn.id)">
              <app-pkmn-card :pkmn-data="pkmn"></app-pkmn-card>
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="row pt-2">
      <div class="col-sm-4" />
      <div class="col-sm-4">
        <button @click="loadPkmn" class="btn btn-primary">
          Load More Pokémons
        </button>
      </div>
      <div class="col-sm-4" />
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, computed } from 'vue';
import AppPkmnCard from './AppPkmnCard.vue';

const props = defineProps({
  pkmnDataList: Array,
});
const emit = defineEmits(['load-pkmn', 'load-pkmn-details']);

const groupPkmnData = computed(() => {
  const groups = [];
  for (let idx = 0; idx <= props.pkmnDataList.length; idx += 4) {
    groups.push(props.pkmnDataList.slice(idx, idx + 4));
  }
  return groups;
});

const loadPkmn = () => {
  emit('load-pkmn');
};

const loadPkmnDetails = (pkmnId) => {
  let pkmn = {
    searchType: 'pokemon',
    searchQuery: pkmnId,
  };
  emit('load-pkmn-details', pkmn);
};
</script>
