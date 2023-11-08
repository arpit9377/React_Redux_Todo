const initialState = {
  todos: [],
  completedTodos: [],
};

const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        todos: [...state.todos, action.payload],
        completedTodos: state.completedTodos,
      };

    case 'EDIT_TODO':
      const updatedTodos = [...state.todos];
      updatedTodos[action.payload.index] = action.payload.text;
      return {
        todos: updatedTodos,
        completedTodos: state.completedTodos,
      };

    case 'COMPLETE_TODO':
      const completedTodo = state.todos[action.payload];
      return {
        todos: state.todos.filter((currtodo, index) => index !== action.payload),
        completedTodos: [...state.completedTodos, completedTodo],
      };

    default:
      return state;
  }
};

export default todoReducer;
