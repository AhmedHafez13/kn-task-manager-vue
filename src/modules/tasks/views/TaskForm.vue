<script setup lang="ts">
import TasksService from '@/sevices/tasks.service';
import { useAppToaster } from '@/utils/app.toaster';
import $v from '@/utils/app.validations';
import { Task } from '../tasks.types';
import { VForm } from 'vuetify/components';

const props = defineProps({
  row: { type: Object as PropType<{ index: number; item: Task }>, required: false },
  onSuccessfulSubmit: { type: Function, required: true },
  cancelForm: { type: Function, required: true },
});

const taskForm: Ref<VForm | null> = ref(null);
const isLoading = ref(false);
const form = ref(
  props.row
    ? {
        id: props.row.item.id,
        title: props.row.item.title,
        description: props.row.item.description,
        dueDate: new Date(props.row.item.dueDate),
      }
    : {
        id: -1,
        title: '',
        description: '',
        dueDate: new Date(),
      },
);

// ----- Services ----- //

const toaster = useAppToaster();

// ----- Submit Form ----- //

const onSubmit = async () => {
  isLoading.value = true;
  if (taskForm.value) {
    try {
      const { valid } = await taskForm.value.validate();

      if (valid) {
        const data = {
          title: form.value.title,
          description: form.value.description,
          dueDate: form.value.dueDate,
        };

        if (form.value.id > 0) {
          await TasksService.updateTask(form.value.id, data);
          toaster.success('Successfully updated');
        } else {
          await TasksService.CreateTask(data);
          toaster.success('Successfully created');
        }

        props.onSuccessfulSubmit();
      }
    } catch (error) {
      toaster.error(error);
    }
  }
  isLoading.value = false;
};

// ----- Validation Rules ----- //

const validationRules = computed(() => ({
  title: [
    (v: string) => $v.required(v) || 'Title is required',
    (v: string) => $v.maxLength(v, 64) || 'Title is too long',
  ],
  description: [
    (v: string) => $v.required(v) || 'Description is required',
    (v: string) => $v.maxLength(v, 255) || 'Description is too long',
  ],
  dueDate: [(v: string) => $v.required(v) || 'Due date is required'],
}));
</script>

<template>
  <div class="pa-2">
    <VForm
      ref="taskForm"
      @submit.prevent="onSubmit"
      validate-on="invalid-input"
      :disabled="isLoading"
    >
      <div class="d-flex pa-1 justify-space-between align-center">
        <b v-if="row">Edit Task</b>
        <b v-else>Create Task</b>
        <div class="d-flex ga-2 align-center">
          <v-btn
            icon="mdi-check"
            variant="outlined"
            density="comfortable"
            size="small"
            color="success"
            type="submit"
          />
          <v-btn
            @click="cancelForm()"
            icon="mdi-close"
            variant="outlined"
            density="comfortable"
            size="small"
          />
        </div>
      </div>

      <div class="pa-3 overflow-auto" style="max-height: 480px">
        <p class="mb-1">Title</p>
        <v-text-field
          v-model="form.title"
          placeholder="Title"
          :rules="validationRules.title"
          type="text"
          :disabled="isLoading"
        />

        <p class="mt-3 mb-1">Description</p>
        <v-textarea
          v-model="form.description"
          placeholder="Description"
          :rules="validationRules.description"
          :disabled="isLoading"
          :rows="3"
        />

        <p class="mt-3 mb-1">Due Date</p>
        <v-date-picker
          v-model="form.dueDate"
          placeholder="Due Date"
          :rules="validationRules.dueDate"
          :disabled="isLoading"
        />
      </div>
    </VForm>
  </div>
</template>
