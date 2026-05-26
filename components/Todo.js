// components/Todo.js

export class Todo {
  constructor(data, selector, { handleDelete, handleToggle }) {
    this._handleDelete = handleDelete;
    this._handleToggle = handleToggle;
    this._name = data.name;
    this._completed = data.completed;
    this._date = data.date;
    this._id = data.id;
    this._selector = selector;
  }

  _getTemplate() {
    const todoTemplate = document
      .querySelector(this._selector)
      .content.querySelector(".todo")
      .cloneNode(true);

    return todoTemplate;
  }

  _setEventListeners() {
    this._deleteBtn.addEventListener("click", () => {
      this._handleDelete(this._completed);
      this._todoElement.remove();
    });

    this._checkbox.addEventListener("change", () => {
      this._completed = !this._completed;
      this._handleToggle(this._completed);
    });
  }

  _generateDate() {
    const dueDate = new Date(this._date);
    if (!isNaN(dueDate)) {
      this._dateEl.textContent = `Due: ${dueDate.toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })}`;
    }
  }

  getView() {
    this._todoElement = this._getTemplate();

    this._dateEl = this._todoElement.querySelector(".todo__date");
    this._checkbox = this._todoElement.querySelector(".todo__completed");
    this._todoElement.querySelector(".todo__name").textContent = this._name;
    this._deleteBtn = this._todoElement.querySelector(".todo__delete-btn");

    const todoLabel = this._todoElement.querySelector(".todo__label");
    this._checkbox.id = `todo-${this._id}`;
    todoLabel.setAttribute("for", `todo-${this._id}`);
    this._checkbox.checked = this._completed;

    this._generateDate();
    this._setEventListeners();

    return this._todoElement;
  }
}
