import axios from 'axios';

export const fetchTodos = (filters: any) => {
    return axios.get('/todos', { params: filters });
};

export const createTodo = (todo: any) => {
    return axios.post('/todos', todo);
};

export const updateTodo = (id: string, todo: any) => {
    return axios.put(`/todos/${id}`, todo);
};

export const markDone = (id: string) => {
    return axios.post(`/todos/${id}/done`);
};

export const markUndone = (id: string) => {
    return axios.put(`/todos/${id}/undone`);
};