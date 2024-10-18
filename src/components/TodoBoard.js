import React from 'react';
import TodoItem from './TodoItem';
const TodoBoard = ({ todoList, deleteTask, completeTask }) => {
  return (
    <div>
      <h2>Todo List</h2>
      {todoList.length > 0
        ? todoList.map(item => (
            <TodoItem
              key={item._id}
              item={item}
              deleteTask={deleteTask}
              completeTask={completeTask}
            />
          ))
        : 'There is no Item to show'}
      {/* <TodoItem/> will be here once we get the todoList */}
    </div>
  );
};

export default TodoBoard;
