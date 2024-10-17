import { getTodosFromLocalStorage, saveTodosToLocalStorage } from './storage.js';
import { createTodoItem, renderTodos, addTask } from './todo.js';

// Seleksi elemen dari DOM
const todoForm = document.getElementById("todo-form");
const newTaskInput = document.getElementById("new-task");
const todoList = document.getElementById("todo-list");
const filterButtons = document.querySelectorAll('.filter-btn');

// Fungsi untuk menandai tugas sebagai selesai atau belum selesai
const toggleCompleteTask = (index) => {
    const todos = getTodosFromLocalStorage();
    todos[index].completed = !todos[index].completed;
    saveTodosToLocalStorage(todos);
    renderTodos('all', todoList, toggleCompleteTask, removeTask); // Refresh daftar tugas setelah status berubah
};

// Fungsi untuk menghapus tugas
const removeTask = (index) => {
    const todos = getTodosFromLocalStorage();
    todos.splice(index, 1);
    saveTodosToLocalStorage(todos);
    renderTodos('all', todoList, toggleCompleteTask, removeTask);
};

// Event listener untuk form submit (menambahkan tugas)
todoForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const taskText = newTaskInput.value.trim();
    if (taskText) {
        addTask(taskText);
        renderTodos('all', todoList, toggleCompleteTask, removeTask);
        newTaskInput.value = ""; // Kosongkan input setelah menambahkan
    }
});

// Event listeners untuk tombol filter
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        const filter = button.getAttribute('data-filter');
        renderTodos(filter, todoList, toggleCompleteTask, removeTask);

        // Tambahkan class active pada tombol yang dipilih
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
    });
});

// Render tugas saat halaman dimuat
window.addEventListener("load", () => renderTodos('all', todoList, toggleCompleteTask, removeTask));
