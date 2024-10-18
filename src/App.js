import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import api from './utils/api';

import TodoBoard from './components/TodoBoard';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

function App() {
  const [todoList, setTodoList] = useState([]);
  const [todoValue, setTodoValue] = useState('');

  const getTasks = async () => {
    const response = await api.get('/tasks');
    setTodoList(response.data.data);
  };

  const addTask = async () => {
    try {
      const response = await api.post('/tasks', {
        task: todoValue,
        isComplete: false,
      });
      if (response.status === 200) {
        setTodoValue('');
        getTasks();
      } else {
        throw new Error('Failed to add task');
      }
    } catch (err) {
      console.error(err);
    }
  };

  const deleteTask = async id => {
    const response = await api.delete(`/tasks/${id}`);
    if (response.status === 200) {
      getTasks();
    } else {
      throw new Error('Failed to delete task');
    }
  };

  const completeTask = async id => {
    try {
      const taskToUpdate = todoList.find(task => task._id === id);
      if (!taskToUpdate) {
        throw new Error('할 일을 찾을 수 없어 ㅠㅠ');
      }

      const response = await api.put(`/tasks/${id}`, {
        isComplete: !taskToUpdate.isComplete,
      });
      if (response.status === 200) {
        getTasks();
      } else {
        throw new Error('할 일 상태 변경 실패했어 ㅠㅠ');
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <Container>
      <Row className="add-item-row">
        <Col xs={12} sm={10}>
          <input
            type="text"
            placeholder="할일을 입력하세요"
            className="input-box"
            value={todoValue}
            onChange={event => setTodoValue(event.target.value)}
          />
        </Col>
        <Col xs={12} sm={2}>
          <button className="button-add" onClick={addTask}>
            추가
          </button>
        </Col>
      </Row>

      <TodoBoard
        todoList={todoList}
        deleteTask={deleteTask}
        completeTask={completeTask}
      />
    </Container>
  );
}

export default App;
