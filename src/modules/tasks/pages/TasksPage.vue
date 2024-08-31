<script setup lang="ts">
import TasksService from '@/sevices/tasks.service';
import { useAppToaster } from '@/utils/app.toaster';
import { Task } from '../tasks.types';
import TaskDetails from '../views/TaskDetails.vue';
import TaskForm from '../views/TaskForm.vue';
import TasksTable from '../views/TasksTable.vue';

const drawer = ref(true);
const rail = ref(true);
const tasks: Ref<Task[] | undefined> = ref();
const selectedRow = ref();
const showForm = ref(false);
const isLoading = ref(false);
const toaster = useAppToaster();

onMounted(() => {
  fetchTasks();
});

const fetchTasks = async () => {
  isLoading.value = true;
  try {
    tasks.value = (await TasksService.getTasks(1))?.tasks;
  } catch (error) {
    toaster.error(error);
  }
  isLoading.value = false;
};

const onClickTask = (row: any) => {
  selectedRow.value = row;
  showForm.value = false;
};

const showNewForm = () => {
  selectedRow.value = undefined;
  showForm.value = true;
};

const showEditForm = (row: any) => {
  selectedRow.value = row;
  showForm.value = true;
};

const cancelForm = () => {
  showForm.value = false;
};

const onSuccessfulSubmit = async () => {
  showForm.value = false;
  await fetchTasks();
  if (selectedRow.value && tasks.value) {
    selectedRow.value.item = tasks.value.find((task) => task.id === selectedRow.value.item.id);
  }
};
</script>

<template>
  <v-sheet height="100%" class="py-2">
    <v-card height="100%" class="rounded-lg">
      <v-layout height="100%">
        <v-navigation-drawer
          width="200"
          v-model="drawer"
          :rail="rail"
          permanent
          @click="rail = false"
        >
          <v-list-item
            prepend-icon="mdi-checkbox-marked-circle-auto-outline"
            title="Filter Tasks"
            nav
          >
            <template v-slot:append>
              <v-btn icon="mdi-chevron-left" variant="text" @click.stop="rail = !rail"></v-btn>
            </template>
          </v-list-item>

          <v-divider></v-divider>

          <v-list density="compact">
            <v-list-item prepend-icon="mdi-list-status" title="All" value="all" />
            <v-list-item
              prepend-icon="mdi-sticker-check-outline"
              title="Completed"
              value="completed"
            />
            <v-list-item
              prepend-icon="mdi-clipboard-text-clock-outline"
              title="Incomplete"
              value="incomplete"
            />
          </v-list>
        </v-navigation-drawer>
        <v-main>
          <v-row class="h-100 ma-0">
            <v-col class="h-100 pa-0 border-e" :cols="6">
              <div class="d-flex pa-1 align-center ga-2">
                <v-text-field
                  placeholder="Filter"
                  type="text"
                  prepend-inner-icon="mdi-filter"
                  density="compact"
                />
                <v-btn @click="showNewForm" text="New" prepend-icon="mdi-plus" color="success" />
              </div>
              <TasksTable :onClickTask="onClickTask" class="h-100" :tasks="tasks" />
            </v-col>
            <v-col :cols="6" class="pa-0">
              <TaskDetails
                v-if="selectedRow && !showForm"
                :row="selectedRow"
                :showForm="showEditForm"
                :onSuccessfulSubmit="onSuccessfulSubmit"
              />
              <TaskForm
                v-if="showForm"
                :row="selectedRow"
                :onSuccessfulSubmit="onSuccessfulSubmit"
                :cancelForm="cancelForm"
              />
            </v-col>
          </v-row>
        </v-main>
      </v-layout>
    </v-card>
  </v-sheet>
</template>

<style scoped lang="scss"></style>
