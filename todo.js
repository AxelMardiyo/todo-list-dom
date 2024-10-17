import {
  getTodosFromLocalStorage,
  saveTodosToLocalStorage,
} from "./storage.js";

// Fungsi untuk membuat elemen tugas
export const createTodoItem = (task, index, toggleCompleteTask, removeTask) => {
  const li = document.createElement("li");
  li.classList.add("todo-item");
  if (task.completed) {
    li.classList.add("completed");
  }

  li.innerHTML = `
        <div>
            <input type="checkbox" ${task.completed ? "checked" : ""} />
            <span>${task.text}</span>
        </div>
        <button class="remove-btn">Remove</button>
    `;

  // Event listener untuk checkbox (centang tugas)
  li.querySelector('input[type="checkbox"]').addEventListener("change", () => {
    toggleCompleteTask(index);
  });

  // Event listener untuk tombol "Remove" dengan SweetAlert konfirmasi
  li.querySelector(".remove-btn").addEventListener("click", () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      confirmButtonColor: "#1e88e5", // Warna biru lebih gelap untuk dark mode
      cancelButtonColor: "#e53935", // Warna merah yang lebih lembut
      background: "#333", // Warna latar belakang gelap
      color: "#fff", // Warna teks putih
      customClass: {
        popup: "dark-swal", // Class tambahan untuk menyesuaikan gaya lebih lanjut
      },
    }).then((result) => {
      if (result.isConfirmed) {
        removeTask(index);
        Swal.fire("Deleted!", "Your task has been deleted.", "success");
      }
    });
  });

  return li;
};

// Fungsi untuk memperbarui tampilan daftar tugas berdasarkan filter
export const renderTodos = (
  filter,
  todoList,
  toggleCompleteTask,
  removeTask
) => {
  todoList.innerHTML = ""; // Kosongkan daftar
  const todos = getTodosFromLocalStorage(); // Ambil data dari localStorage

  todos.forEach((task, index) => {
    if (
      filter === "all" ||
      (filter === "completed" && task.completed) ||
      (filter === "active" && !task.completed)
    ) {
      todoList.appendChild(
        createTodoItem(task, index, toggleCompleteTask, removeTask)
      );
    }
  });
};

// Fungsi untuk menambahkan tugas baru
export const addTask = (taskText) => {
  const todos = getTodosFromLocalStorage();
  todos.push({ text: taskText, completed: false });
  saveTodosToLocalStorage(todos);

  // SweetAlert notifikasi setelah tugas berhasil ditambahkan
  Swal.fire({
    title: "Task Added!",
    text: `Your task "${taskText}" has been successfully added to the list.`,
    icon: "success",
    confirmButtonText: "OK",
    confirmButtonColor: "#1e88e5", // Warna biru lebih gelap untuk dark mode
    cancelButtonColor: "#e53935", // Warna merah yang lebih lembut
    background: "#333", // Warna latar belakang gelap
    color: "#fff", // Warna teks putih
    customClass: {
      popup: "dark-swal", // Class tambahan untuk menyesuaikan gaya lebih lanjut
    },
  });
};
