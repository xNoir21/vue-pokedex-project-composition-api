<template>
  <div class="container">
    <!-- Grid Header -->
    <div class="row justify-content-start border">
      <div class="col-sm">
        <h2><strong>Pokémon info</strong></h2>
      </div>
    </div>
    <!-- Grid body -->
    <div class="row justify-content-start border">
      <!-- pokemon picture and name  -->
      <div class="col-sm-4">
        <!-- pokemon number -->
        <div class="row border">
          <div class="col-sm">Pokédex #{{ pkmnData.data.id }}</div>
        </div>
        <!-- pokemon picture -->
        <div class="row border">
          <img
            :src="
              pkmnData.data.sprites.other['official-artwork']['front_default']
            "
            :alt="'Pokémon Sprite for: ' + pkmnName"
            width="100%"
            height="100%"
          />
        </div>
        <!-- pokemon name -->
        <div class="row border">
          <p class="text-center">Pokémon Name: {{ pkmnName }}</p>
        </div>
      </div>
      <!-- pokemon info  -->
      <div class="col-sm-8">
        <!-- pokemon type -->
        <div class="row border">
          <div class="e-sm">
            <strong>Type/</strong>
            <div
              v-for="(type, idx) in pkmnData.data.types"
              :key="idx"
              class="pokemon-label"
              :class="type.type.name"
            >
              {{ pkmnType(type) }}
            </div>
          </div>
        </div>
        <!-- pokemon abilities -->
        <div class="row border">
          <div class="col-sm">
            <strong>Abilities</strong>
            <ul
              v-for="(ability, idx) in pkmnData.data.abilities"
              class="list-group list-group-flush"
              :key="idx"
            >
              <li class="list-group-item bg-light text-start">
                {{ pkmnAbility(ability) }}: <br />
                {{ abilityDescription[idx] }}
              </li>
            </ul>
          </div>
        </div>
        <!-- pokemon stats -->
        <div class="row border">
          <div class="col-sm">
            <p>Base Stats:</p>
            <div class="row border">
              <div class="col-sm border">
                <ul class="list-group list-group-flush" v-for="n in 3" :key="n">
                  <li class="list-group-item bg-light text-start">
                    {{ pkmnStat(pkmnData.data.stats[n - 1]) }}
                  </li>
                </ul>
              </div>
              <div class="col-sm border">
                <ul class="list-group list-group-flush" v-for="n in 3" :key="n">
                  <li class="list-group-item bg-light text-start">
                    {{ pkmnStat(pkmnData.data.stats[n + 2]) }}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onUpdated, computed, defineProps, ref } from 'vue';
import getAxios from '../Functionality/Vue-odata-general';

const props = defineProps({
  pkmnData: Object,
});

const axiosInstance = getAxios();
const abilityDescription = ref([]);

onMounted(() => {
  getPkmnAbilityDescription();
});

onUpdated(() => {
  getPkmnAbilityDescription();
});

const pkmnName = computed(() => {
  return (
    props.pkmnData.data.name[0].toUpperCase() +
    props.pkmnData.data.name.slice(1)
  );
});

const pkmnStat = (stat) => {
  let statArray = stat.stat.name.split('-');
  let statName = '';
  statArray.forEach((item) => {
    statName += item[0].toUpperCase() + item.slice(1) + ' ';
  });
  return statName + ': ' + stat['base_stat'];
};

const pkmnType = (type) => {
  return type.type.name[0].toUpperCase() + type.type.name.slice(1);
};

const pkmnAbility = (ability) => {
  let abilityArray = ability.ability.name.split('-');
  let abilityName = '';
  if (ability.is_hidden) {
    abilityName += '(Hidden Ability) ';
  }
  abilityArray.forEach((item) => {
    abilityName += item[0].toUpperCase() + item.slice(1) + ' ';
  });
  return abilityName;
};

const getPkmnAbilityDescription = () => {
  if (!props.pkmnData) {
    return;
  }

  let ability = props.pkmnData.data.abilities;
  let abilityPromises = [];

  for (let i = 0; i < ability.length; i++) {
    abilityPromises.push(axiosInstance.get(ability[i].ability.url));
  }

  Promise.all(abilityPromises).then((result) => {
    for (let i = 0; i < result.length; i++) {
      let abilityDescriptionEn;

      if (result[i].data.effect_entries.length !== 0) {
        abilityDescriptionEn = result[i].data.effect_entries.filter(
          (entry) => entry.language.name === 'en'
        );
        abilityDescription.value[i] = abilityDescriptionEn[0].effect;
      } else {
        abilityDescriptionEn = result[i].data.flavor_text_entries.filter(
          (entry) => entry.language.name === 'en'
        );
        abilityDescription.value[i] = abilityDescriptionEn[0].flavor_text;
      }
    }
  });
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
