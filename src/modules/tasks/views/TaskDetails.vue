<script setup lang="ts">
import { Task } from '../tasks.types';
import ConfirmDialog from '@/components/ConfirmDialog.vue';
import TasksService from '@/sevices/tasks.service';
import { useAppToaster } from '@/utils/app.toaster';

const props = defineProps({
  row: { type: Object as PropType<{ index: number; item: Task }>, required: true },
  showForm: { type: Function, required: true },
  onSuccessfulSubmit: { type: Function, required: true },
});

const toaster = useAppToaster();

const isLoading = ref(false);
const showConfirm = ref(false);
const deleteOptions = ref({
  title: 'Delete Task',
  message: `Are you sure you want to delete '${props.row.item.title}'`,
  onConfirm: async () => {
    isLoading.value = true;
    try {
      await TasksService.DeleteTask(props.row.item.id);
      toaster.success('Successfully deleted');
      props.onSuccessfulSubmit();
    } catch (error) {
      toaster.error(error);
    }
    isLoading.value = false;
  },
});
</script>

<template>
  <ConfirmDialog :options="deleteOptions" v-model:show="showConfirm" />
  <div class="pa-2">
    <div class="d-flex pa-1 justify-space-between align-center">
      <b>Task Details</b>
      <div class="d-flex ga-2 align-center">
        <v-btn
          @click="showForm(row)"
          icon="mdi-pencil"
          variant="outlined"
          density="comfortable"
          size="small"
          color="primary"
        />
        <v-btn
          @click="showConfirm = true"
          icon="mdi-trash-can-outline"
          variant="outlined"
          density="comfortable"
          size="small"
          color="error"
        />
      </div>
    </div>

    <div class="mt-6">
      <div class="text-h6">{{ row.item.title }}</div>

      <div class="mt-3">
        <v-icon icon="mdi-text-long" />
        {{ row.item.description }}
      </div>

      <div class="mt-3">
        <v-icon icon="mdi-check-underline-circle-outline" />
        Completed:
        <v-icon
          v-if="row.item.completed"
          icon="mdi-checkbox-marked-circle-outline"
          color="success"
        />
        <v-icon v-else icon="mdi-minus-circle-outline" color="warning" />
      </div>

      <div v-if="row.item.dueDate" class="mt-3">
        <v-icon icon="mdi-clipboard-text-clock-outline" />
        Due Date: <b>{{ row.item.dueDate }}</b>
      </div>
    </div>
  </div>
</template>
