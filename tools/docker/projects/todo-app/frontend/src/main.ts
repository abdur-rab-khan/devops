const API_BASE_URL = "http://localhost:3000/todo";

const todoInput = document.getElementById("todo-input") as HTMLInputElement;
const addTodoBtn = document.querySelector(".add-btn") as HTMLButtonElement;
const todoContainer = document.querySelector(
  ".todo-container"
) as HTMLDivElement;

interface Todo {
  _id: string;
  title: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}

const getTodoElement = (id: string, task: string, completed = false) => {
  return `<div data-id="${id}" class="todo">
            <label for="done-checkbox-${id}">
              <div class="content">
                <input ${
                  completed ? "checked" : ""
                } id="done-checkbox-${id}" type="checkbox" />
                <div>
                  <p>${task}</p>
                </div>
              </div>
            </label>
            <div>
              <button>Delete</button>
            </div>
          </div>`;
};

const loadTodos = async (): Promise<void> => {
  try {
    const response = await fetch(API_BASE_URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch todos");
    }

    const data = await response.json();
    const todos: Todo[] = data.todos || [];

    // Clear existing todos
    todoContainer.innerHTML = "";

    // Render todos
    todos.forEach((todo) => {
      const todoHTML = getTodoElement(todo._id, todo.title, todo.completed);
      todoContainer.insertAdjacentHTML("beforeend", todoHTML);
    });
  } catch (error) {
    console.error("Error loading todos:", error);
  }
};

const addTodo = async (): Promise<void> => {
  const task = todoInput.value || "";

  if (task.trim().length !== 0) {
    try {
      // CALLING API TO ADD TASK
      const response = await fetch(API_BASE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ task }),
      });

      if (!response.ok) {
        throw new Error("Failed to create todo");
      }

      // Fetch updated todos to get the new todo with ID
      await loadTodos();

      // Cleaning Input
      todoInput.value = "";
    } catch (error) {
      console.error("Error adding todo:", error);
      alert("Failed to add todo. Please try again.");
    }
  }
};

// Handling Add Todo
todoInput?.addEventListener("keypress", async (e) => {
  if (e.key.toLowerCase() === "enter") {
    await addTodo();
  }
});

addTodoBtn?.addEventListener("click", addTodo);

// Handling Delete Todo
todoContainer?.addEventListener("click", async (e) => {
  const target = e.target as HTMLElement;

  if (target.tagName === "BUTTON") {
    const todoElement = target.closest(".todo") as HTMLDivElement;
    const todoId = todoElement?.dataset.id;

    if (todoId) {
      try {
        const response = await fetch(`${API_BASE_URL}/${todoId}`, {
          method: "DELETE",
        });

        if (!response.ok) {
          throw new Error("Failed to delete todo");
        }

        // Remove from UI
        todoElement?.remove();
      } catch (error) {
        console.error("Error deleting todo:", error);
        alert("Failed to delete todo. Please try again.");
      }
    }
  }

  if (target.tagName === "INPUT") {
    const todoElement = target.closest(".todo") as HTMLDivElement;
    const todoId = todoElement?.dataset.id;
    const checkbox = target as HTMLInputElement;

    if (todoId) {
      try {
        const response = await fetch(`${API_BASE_URL}/${todoId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ completed: checkbox.checked }),
        });

        if (!response.ok) {
          throw new Error("Failed to update todo");
        }
      } catch (error) {
        console.error("Error updating todo:", error);
        // Revert checkbox state on error
        checkbox.checked = !checkbox.checked;
        alert("Failed to update todo. Please try again.");
      }
    }
  }
});

// Load todos when page loads
loadTodos();
