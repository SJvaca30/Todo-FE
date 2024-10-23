import React from "react";
import TodoItem from "./TodoItem";

const TodoBoard = ({ todoList, deleteItem, toggleComplete }) => {
  return (
    <div>
      <br />
      {todoList.length > 0 &&
        todoList.map((item, index) => (
          <TodoItem
            item={item}
            key={index}
            deleteItem={deleteItem}
            toggleComplete={toggleComplete}
          />
        ))}
    </div>
  );
};

export default TodoBoard;
