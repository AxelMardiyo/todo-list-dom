// Fungsi untuk mengambil data dari localStorage
export const getTodosFromLocalStorage = () => {
    return JSON.parse(localStorage.getItem("todos")) || [];
};

// Fungsi untuk menyimpan data ke localStorage
export const saveTodosToLocalStorage = (todos) => {
    localStorage.setItem("todos", JSON.stringify(todos));
};
