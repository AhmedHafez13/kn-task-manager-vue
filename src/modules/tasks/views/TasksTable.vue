<script setup lang="ts">
import TasksService from '@/sevices/tasks.service';
import { useAppToaster } from '@/utils/app.toaster';
import { Task } from '../tasks.types';

const props = defineProps({
  tasks: { type: Array as PropType<Task[] | undefined>, required: false },
  onClickTask: { type: Function, required: true },
});

// Table headers
const headers: any = [
  { title: 'Title', key: 'title', align: 'start', sortable: false },
  { title: 'Due Date', key: 'dueDate', sortable: false, align: 'center' },
  { title: 'Complete', key: 'completed', sortable: false, align: 'center' },
];

const isLoading = ref(false);

const toaster = useAppToaster();

const onClickRow = (_: any, row: any) => {
  props.onClickTask(row);
};

const onUpdateCompleted = async (item: Task) => {
  isLoading.value = true;
  try {
    await TasksService.markTaskCompleted(item.id, !item.completed);
    toaster.success('Successfully updated');
  } catch (error) {
    toaster.error(error);
  }
  isLoading.value = false;
};
</script>

<template>
  <v-data-table :headers="headers" :items="tasks" density="comfortable" @click:row="onClickRow">
    <template #item.completed="{ item }">
      <div class="d-flex justify-center">
        <v-checkbox v-model="(item as Task).completed" @click="() => onUpdateCompleted(item)" />
      </div>
    </template>
    <template v-slot:no-data>
      <div>No Tasks</div>
    </template>
  </v-data-table>
</template>

<style scoped lang="scss"></style>
