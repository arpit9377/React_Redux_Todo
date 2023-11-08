export const addTodo = (text) => ({
  type: 'ADD_TODO',
  payload: text,
});

export const editTodo = (index, text) => ({
  type: 'EDIT_TODO',
  payload: { index, text },
});

export const completeTodo = (index) => ({
  type: 'COMPLETE_TODO',
  payload: index,
});
