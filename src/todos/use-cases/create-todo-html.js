export const createTodoHtml = (todo) => {
  if (!todo) throw new Error("Todo is required");
  const { done, description, id } = todo;
  const html = `
    <div class="view">
      <input class="toggle" type="checkbox" ${done ? "checked" : ""}>
        <label>${description}</label>
        <button class="destroy"></button>
    </div>
    <input class="edit" value="Create a Todo MVC template">
    `;
  const listElement = document.createElement("li");
  listElement.innerHTML = html;
  listElement.setAttribute("data-id", id);
  if (todo.done) listElement.classList.add("completed");
  return listElement;
};
