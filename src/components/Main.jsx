import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTodo, editTodo, completeTodo } from './Action';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Main.css';

function Main() {
  const [newTodo, setNewTodo] = useState('');
  const [editTodoText, setEditTodoText] = useState('');
  const [editIndex, setEditIndex] = useState(-1);
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos);
  const completedTodos = useSelector((state) => state.completedTodos);

  const handleAddTodo = () => {
    if (newTodo.trim() !== '') {
      dispatch(addTodo(newTodo));
      setNewTodo('');
    }
  }

  const handleEdit = (index) => {
    setEditIndex(index);
    setEditTodoText(todos[index]);
  }

  const handleSaveEdit = () => {
    if (editTodoText.trim() !== '') {
      dispatch(editTodo(editIndex, editTodoText));
      setEditIndex(-1);
      setEditTodoText('');
    }
  }

  const handleComplete = (index) => {
    dispatch(completeTodo(index));
  }

  return (
    <div className="container mt-4">
      <h1>Todo List</h1>
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        className="form-control mb-2"
        placeholder="Enter a new todo"
      />
      <button onClick={handleAddTodo} className="btn btn-primary mb-2">Add</button>
      <ul className="list-group">
        {todos.map((todo, index) => (
          <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
            {editIndex === index ? (
              <div className="w-100">
                <input
                  type="text"
                  value={editTodoText}
                  onChange={(e) => setEditTodoText(e.target.value)}
                  className="form-control mb-2"
                />
                <div className="d-flex justify-content-end">
                  <button onClick={handleSaveEdit} className="btn btn-success mr-2" disabled={!editTodoText.trim()}>Save</button>
                  <button className="btn btn-danger ml-2" disabled>Done</button>
                </div>
              </div>
            ) : (
              <div className="w-100 d-flex justify-content-between align-items-center">
                <span>{todo}</span>
                <div>
                  <button onClick={() => handleEdit(index)} className="btn btn-secondary ml-4">Edit</button>
                  <button onClick={() => handleComplete(index)} className="btn btn-danger ml-4" disabled={editIndex !== -1}>Done</button>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
      <h2>Completed Tasks</h2>
      <ul className="list-group">
        {completedTodos.map((completedTodo, index) => (
          <li key={index} className="list-group-item">
            <del>{completedTodo}</del>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Main;
