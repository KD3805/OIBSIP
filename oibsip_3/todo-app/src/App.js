import { React, useEffect, useState } from "react";
import "./App.css";
import { MdDelete } from "react-icons/md";
import { FaCheck } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import Swal from 'sweetalert2'


function App() {
  const [isActiveScreen, setIsActiveScreen] = useState(true);
  const [todos, setTodos] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [completedTodos, setCompletedTodos] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [idToEdit, setIdToEdit] = useState(-1);
  const Swal = require('sweetalert2')

  // Add new to-do task

  const handleAddTodo = () => {
    if (newTitle === "") {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please add title to your list!",
      });
      return;
    }

    let newTodoItem = {
      title: newTitle,
      desc: newDesc,
    };
    setNewTitle("");
    setNewDesc("");

    let updatedTodo = [...todos];
    updatedTodo.push(newTodoItem);
    setTodos(updatedTodo);

    // save todo-list data to the localstorage
    localStorage.setItem("todolist", JSON.stringify(updatedTodo));
  };


  // Set properties for update a specific Todo item
  
  const setForEditTodo = (index) => {
    let filteredItem = todos[index];
    
    setNewTitle(filteredItem.title);
    setNewDesc(filteredItem.desc);

    setIdToEdit(index);
    setEditMode(true);
  }
  
  // Edit a specific Todo Item

  const handleEditTodo = () => {
    let editedItem = {
      title: newTitle,
      desc: newDesc,
    };

    let filteredItem = todos[idToEdit];
    todos[idToEdit] = editedItem;
    
    if (newTitle !== filteredItem.title || newDesc !== filteredItem.desc){
      setTodos([ ...todos.slice(0, idToEdit), editedItem, ...todos.slice(idToEdit +1)]);
    }
    
    setNewTitle("");
    setNewDesc("");

    setIdToEdit(-1);
    setEditMode(false);

    // Save the updated list of tasks in the browser's local storage
    localStorage.setItem('todolist', JSON.stringify(todos))
  }


  // Delete a specific Todo Item

  const handleDeleteTodo = (index) => {
    let reducedTodo = [...todos];
    reducedTodo.splice(index, 1);

    setTodos(reducedTodo);
    localStorage.setItem("todolist", JSON.stringify(reducedTodo));
  };


  // Handle completed to-do tasks section

  const handleCompletion = (index) => {
    let now = new Date();
    let dd = now.getDate();
    let mm = now.getMonth() + 1;
    let yyyy = now.getFullYear();
    let h = now.getHours();
    let m = now.getMinutes();
    let s = now.getSeconds();
    let completedOn =
      dd + "-" + mm + "-" + yyyy + " at " + h + " : " + m + " : " + s;

    let filteredItem = {
      ...todos[index],
      completedOn: completedOn,
    };

    let updatedCompletedArr = [...completedTodos];
    updatedCompletedArr.push(filteredItem);

    setCompletedTodos(updatedCompletedArr);
    handleDeleteTodo(index);

    localStorage.setItem("completedList", JSON.stringify(updatedCompletedArr));
  };


  // Delete a specific Todo Item from completed task section

  const handleDeleteCompletedTodo = (index) => {
    let updatedCompTodos = [...completedTodos];
    updatedCompTodos.splice(index, 1);

    setCompletedTodos(updatedCompTodos);
    localStorage.setItem('completedList', JSON.stringify(updatedCompTodos));
  }


  // Get saved tasks on first rendering of page

  useEffect(() => {
    let savedTodo = JSON.parse(localStorage.getItem("todolist"));
    let savedCompletedList = JSON.parse(localStorage.getItem("completedList"));

    if (savedTodo) {
      setTodos(savedTodo);
    }
    if(savedCompletedList) {
      setCompletedTodos(savedCompletedList);
    }
  }, []);




  return (
    <div className="App">
      <h1 className="title">My Todos</h1>

      <div className="todo-wrapper">
        <div className="todo-input">
          <div className="todo-input-items">
            <label htmlFor="task-title">Title </label>
            <input
              type="text"
              id="task-title"
              name="taskTitle"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="What needs to be done?"
            />
          </div>

          <div className="todo-input-items">
            <label htmlFor="task-desc">Description</label>
            <input
              type="text"
              id="task-desc"
              name="taskDesc"
              value={newDesc}
              onChange={(e) => setNewDesc(e.target.value)}
              placeholder="Description"
            />
          </div>

          <div className="todo-input-items">
            {editMode === false &&
              (
                <button
                type="Button"
                onClick={handleAddTodo}
                className="primary-btn"
                >
                  Add
                </button>
              )
            }

            {editMode === true &&
              (
                <button
                type="Button"
                onClick={handleEditTodo}
                className="primary-btn"
                >
                  Edit
                </button>
              )
            }
          </div>
        </div>

        <div className="division-btns">
          <button
            className={`secondary-btns ${isActiveScreen === true && "active"}`}
            id="todo-btn"
            onClick={() => setIsActiveScreen(true)}
          >
            To-do
          </button>
          <button
            className={`secondary-btns ${isActiveScreen === false && "active"}`}
            id="completed-btn"
            onClick={() => setIsActiveScreen(false)}
          >
            Completed
          </button>
        </div>

        <div className="todo-list">
          {/* Pending to-do list */}

          {isActiveScreen === true && 
            (
              todos.length === 0 ? 
              (
                <p className="no-record">No todos found! Please add a new one!!</p>
              ) : (
                todos.map((item, index) => (
                  <div className="todo-list-items" key={index}>
                    <div className="list-details">
                      <h3 className="list-name">{item.title}</h3>
                      <p className="list-desc">{item.desc}</p>
                    </div>

                    <div className="action-btns">
                      <MdDelete
                        className="del-icon"
                        onClick={() => handleDeleteTodo(index)}
                        title="Delete?"
                      />
                      <FaEdit
                        className="edit-icon"
                        onClick={() => setForEditTodo(index)}
                        title="Edit?"
                      />
                      <FaCheck
                        className="check-icon"
                        onClick={() => handleCompletion(index)}
                        title="Complete?"
                      />
                    </div>
                  </div>
                ))
              )
            )
          }

          {/* Completed to-do list */}

          {isActiveScreen === false && 
            (
              completedTodos.length === 0 ? 
              (
                <p className="no-record">No completed todos found!!</p>
              ) : 
              (
                completedTodos.map((item, index) => (
                  <div className="todo-list-items" key={index}>
                    <div className="list-details">
                      <h3 className="list-name">{item.title}</h3>
                      <p className="list-desc">{item.desc}</p>
                      <p className="list-time">Completed on : {item.completedOn}</p>
                    </div>

                    <div className="action-btns">
                      <MdDelete
                        className="del-icon"
                        onClick={() => handleDeleteCompletedTodo(index)}
                        title="Delete?"
                      />
                    </div>
                  </div>
                ))
              )
            )
          }
        </div>
      </div>
    </div>
  );
}

export default App;