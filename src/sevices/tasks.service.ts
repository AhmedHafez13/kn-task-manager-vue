import axios from './axios';

const BASE_PATH = '/api';

export default class TasksService {
  static getTasks(page: number) {
    return axios.get(BASE_PATH + `/tasks?page=${page}`);
  }

  static getTask(id: number) {
    return axios.get(BASE_PATH + `/tasks/${id}`);
  }

  static CreateTask(task: { title: string; description: string; dueDate: Date }) {
    return axios.post(BASE_PATH + '/tasks', task);
  }

  static updateTask(taskId: number, task: { title: string; description: string; dueDate: Date }) {
    return axios.put(BASE_PATH + `/tasks/${taskId}`, task);
  }

  static markTaskCompleted(taskId: number, completed: boolean) {
    return axios.put(BASE_PATH + `/tasks/${taskId}`, { completed });
  }

  static DeleteTask(taskId: number) {
    return axios.delete(BASE_PATH + `/tasks/${taskId}`);
  }
}
