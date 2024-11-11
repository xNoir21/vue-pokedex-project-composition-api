<template>
  <!-- pokemon number -->
  <div class="row">
    <div class="col-sm">Pokédex #{{ pkmnData.id }}</div>
  </div>
  <!-- pokemon picture -->
  <div class="row">
    <img
      :src="pkmnData.iconUrl"
      :alt="'Pokémon Sprite for: ' + pkmnData.name"
      width="50"
      height="150"
    />
  </div>
  <!-- pokemon name -->
  <div class="row">
    <p class="text-center">Pokémon Name: {{ pkmnName() }}</p>
  </div>
  <div class="row">
    <div v-for="(type, idx) in pkmnData.type" :key="idx">
      <div class="col-6 pokemon-label" :class="type.type.name">
        {{ type.type.name }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  pkmnData: Object,
});

const pkmnName = () => {
  return props.pkmnData.name[0].toUpperCase() + props.pkmnData.name.slice(1);
};
</script>

<style scoped>
.pokemon-label {
  display: inline-block;
  padding: 2px 10px;
  color: white;
  font-family: 'Courier New', monospace;
  font-size: 14px;
  font-weight: bold;
  border-radius: 5px;
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 2px;
}
.normal {
  background-color: #a8a878;
  border-color: #6d6d4e;
}
.fire {
  background-color: #f08030;
  border-color: #c03028;
}
.water {
  background-color: #6890f0;
  border-color: #4470c4;
}
.electric {
  background-color: #f8d030;
  border-color: #a1871f;
}
.grass {
  background-color: #78c850;
  border-color: #4e8234;
}
.ice {
  background-color: #98d8d8;
  border-color: #638d8d;
}
.fighting {
  background-color: #c03028;
  border-color: #7d1f1a;
}
.poison {
  background-color: #a040a0;
  border-color: #682a68;
}
.ground {
  background-color: #e0c068;
  border-color: #927d44;
}
.flying {
  background-color: #a890f0;
  border-color: #6d5e9c;
}
.psychic {
  background-color: #f85888;
  border-color: #a13959;
}
.bug {
  background-color: #a8b820;
  border-color: #6d7815;
}
.rock {
  background-color: #b8a038;
  border-color: #786824;
}
.ghost {
  background-color: #705898;
  border-color: #493963;
}
.dragon {
  background-color: #7038f8;
  border-color: #4924a1;
}
.dark {
  background-color: #705848;
  border-color: #49392f;
}
.steel {
  background-color: #b8b8d0;
  border-color: #787887;
}
.fairy {
  background-color: #ee99ac;
  border-color: #9b6470;
}
</style>