import html from "./app.html?raw";
import todoStore, { Filter } from "../store/todo.store.js";
import { renderTodos, renderPending } from "./use-cases/index.js";

const ElementIDs = {
  ClearCompletedButton: ".clear-completed",
  TodoList: ".todo-list",
  NewTodoInput: "#new-todo-input",
  TodoFilters: ".filtro",
  PendingCountLabel: "#pending-count",
};

/**
 * @param {string} elementId identificador del elemento
 */
export const App = (elementId) => {
  const displayTodos = () => {
    const todos = todoStore.getTodos(todoStore.getCurrentFilter());
    renderTodos(ElementIDs.TodoList, todos);
    updatePendingCount();
  };

  // Actualiza el contador de pendientes
  const updatePendingCount = () => {
    renderPending(ElementIDs.PendingCountLabel);
  };

  // Inicializa el store
  (() => {
    const app = document.createElement("div");
    app.innerHTML = html;
    document.querySelector(elementId).append(app);
    displayTodos();
  })();

  // Referencias HTML
  const newDescriptionInput = document.querySelector(ElementIDs.NewTodoInput);
  const todoListUl = document.querySelector(ElementIDs.TodoList);
  const clearCompletedButton = document.querySelector(
    ElementIDs.ClearCompletedButton,
  );
  const filtersList = document.querySelectorAll(ElementIDs.TodoFilters);

  // Agregar Todo
  newDescriptionInput.addEventListener("keyup", (event) => {
    if (event.keyCode !== 13) return;
    if (event.target.value.trim().length === 0) return;

    todoStore.addTodo(event.target.value);
    displayTodos();
    event.target.value = "";
  });

  // Cambiar estado de Todo
  todoListUl.addEventListener("click", (event) => {
    const element = event.target.closest("[data-id]");
    todoStore.toggleTodo(element.getAttribute("data-id"));
    displayTodos();
  });

  // Eliminar Todo
  todoListUl.addEventListener("click", (event) => {
    if (!event.target.classList.contains("destroy")) return;
    const element = event.target.closest("[data-id]");
    todoStore.deleteTodo(element.getAttribute("data-id"));
    displayTodos();
  });

  // Eliminar completados
  clearCompletedButton.addEventListener("click", () => {
    todoStore.deleteCompleted();
    displayTodos();
  });

  // Filtros
  filtersList.forEach((element) => {
    element.addEventListener("click", (event) => {
      filtersList.forEach((el) => el.classList.remove("selected"));
      event.target.classList.add("selected");

      switch (event.target.text) {
        case "Todos":
          todoStore.setFilter(Filter.All);
          break;
        case "Pendientes":
          todoStore.setFilter(Filter.Pending);
          break;
        case "Completados":
          todoStore.setFilter(Filter.Completed);
          break;
      }
      displayTodos();
    });
  });
};
