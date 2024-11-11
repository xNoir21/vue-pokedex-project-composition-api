<template>
  <div class="modal-backdrop fade show" tabindex="-1"></div>
  <!--Modal -->
  <div class="modal fade show modal-dialog-centered">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5">{{ props.errorRequest.errorTitle }}</h1>
          <button type="button" class="btn-close" @click="closeModal"></button>
        </div>
        <div class="modal-body">
          The entered Pokémon is invalid, please enter a valid Pokémon.<br />
          Error Message: {{ props.errorRequest.errorMessage }}
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" @click="closeModal">
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";

const props = defineProps({
  errorRequest: Object,
})
const emit = defineEmits(['close-modal']);

const closeModal = () =>{
  emit('close-modal');
}
</script>
