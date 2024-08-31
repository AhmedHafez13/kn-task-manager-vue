<script setup lang="ts">
import { type PropType } from 'vue';

const show = defineModel('show', { type: Boolean, required: true });

defineProps({
  options: {
    type: Object as PropType<{ title: string; message: string; onConfirm?: Function }>,
    required: true,
  },
});
</script>

<template>
  <v-dialog v-model="show" width="auto">
    <v-card
      max-width="600"
      min-width="400"
      min-height="180"
      prepend-icon="mdi-alert"
      :title="options.title"
      :text="options.message"
    >
      <template v-slot:actions>
        <div class="w-100 d-flex justify-end ga-1">
          <v-btn text="Cancel" show="false" @click="show = false" />
          <v-btn
            color="error"
            text="Confirm"
            @click="options.onConfirm && options.onConfirm() && (show = false)"
          />
        </div>
      </template>
    </v-card>
  </v-dialog>
</template>
