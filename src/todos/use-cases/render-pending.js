import todoStore, { Filter } from "../../store/todo.store.js";

let element;

export const renderPending = (elementId) => {
  if (!element) element = document.querySelector(elementId);
  if (!element) throw new Error(`The element ${elementId} does not exist`);

  element.innerHTML = todoStore.getTodos(Filter.Pending).length;
};
