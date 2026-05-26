import { v4 as uuidv4 } from "https://jspm.dev/uuid";
import { initialTodos, validationConfig } from "../utils/constants.js";
import { Todo } from "../components/Todo.js";
import { FormValidator } from "../components/FormValidator.js";
import { Section } from "../components/Section.js";
import { PopupWithForm } from "../components/PopupWithForms.js";
import { TodoCounter } from "../components/TodoCounter.js";

const addTodoButton = document.querySelector(".button_action_add");
const todoCounter = new TodoCounter(initialTodos, ".counter__text");

const generateTodo = (data) => {
  const todo = new Todo(data, "#todo-template", {
    handleDelete: (isDone) => {
      todoCounter.updateTotal(false);
      if (isDone) {
        todoCounter.updateCompleted(false);
      }
    },
    handleToggle: (isDone) => {
      todoCounter.updateCompleted(isDone);
    },
  });
  return todo.getView();
};

const todoSection = new Section({
  items: initialTodos,
  renderer: (item) => {
    const todo = generateTodo(item);
    todoSection.addItem(todo);
  },
  containerSelector: ".todos__list",
});

const addTodoPopup = new PopupWithForm(".popup", (formData) => {
  const date = new Date(formData.date);
  date.setMinutes(date.getMinutes() + date.getTimezoneOffset());
  const todo = generateTodo({
    name: formData.name,
    date,
    completed: false,
    id: uuidv4(),
  });
  todoSection.addItem(todo);
  todoCounter.updateTotal(true);
  addTodoPopup.close();
  formValidator.resetValidation();
});
addTodoPopup.setEventListeners();

const formValidator = new FormValidator(
  validationConfig,
  document.querySelector(".popup__form"),
);
formValidator.enableValidation();

addTodoButton.addEventListener("click", () => {
  addTodoPopup.open();
});

todoSection.renderItems();
