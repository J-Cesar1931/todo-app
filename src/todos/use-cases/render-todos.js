import { createTodoHtml } from "./create-todo-html.js";

let element;

export const renderTodos = (elementId, todos = []) => {
  if (!element) element = document.querySelector(elementId);
  if (!element) throw new Error(`The element ${elementId} does not exist`);
  if (!todos) throw new Error("Todos is required");

  element.innerHTML = "";
  todos.forEach((todo) => {
    element.append(createTodoHtml(todo));
  });
};
