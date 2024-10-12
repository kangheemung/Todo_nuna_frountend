import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from 'react';
import TodoBoard from './components/TodoBoard';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';


import LoginPage from "./pages/LoginPage";
import TodoPage from "./pages/TodoPage";
import RegisterPage from "./pages/RegisterPage";
import api from './utils/api';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

function App() {
    //저장 스테이트
    const [todoList, setTodoList] = useState([]);
    const [todoValue, setTodoValue] = useState([]);

    const getTasks = async () => {
        try {
            const res = await api.get('/task');
            setTodoList(res.data.data);
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };
    const addTask = async () => {
        try {
            const res = await api.post('/task', {
                task: todoValue,
                isComplete: false,
            });
            if (res.status === 200) {
                console.log('성공');
                //입력한 값이 안사라짐
                setTodoValue('');
                //추가한 값이 안보임
                getTasks();
            }
        } catch (err) {
            console.error('Error adding task:', err);
        }
    };

    const deleteTask = async (taskId) => {
        try {
            const response = await api.delete(`/task/${taskId}`);
            if (response.status === 200) {
                getTasks();
            }
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };
    const updateTask = async (taskId, isComplete) => {
        try {
            const response = await api.put(`/task/${taskId}`, { isComplete: isComplete });
            if (response.status === 200) {
                getTasks();
                console.log('タスクの更新に成功しました');
            } else {
                console.error('タスクの更新に失敗しました - ステータス:', response.status);
            }
        } catch (error) {
            console.error('タスクの更新中にエラーが発生しました:', error);
        }
    };
    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && todoValue.trim() !== '') {
            e.preventDefault();
            addTask();
        }
    };


    useEffect(() => {
        getTasks();
    }, []);
    return (
        <>
            <Router>
                <Routes>
                    <Route path="/" element={<TodoPage />} />
                    <Route path="/user" element={<RegisterPage />} />
                    <Route path="/login" element={<LoginPage />} />
                </Routes>
            </Router>

        <Container>
            <Row className="add-item-row">
                <Col xs={12} sm={10}>
                <input
                    type="text"
                    placeholder="할일을 입력하세요"
                    className="input-box"
                    value={todoValue}
                    onChange={(e) => setTodoValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                />

                </Col>
                <Col xs={12} sm={2}>
                    <button className="button-add" onClick={addTask}>
                        추가
                    </button>
                </Col>
            </Row>
            <TodoBoard todoList={todoList} deleteTask={deleteTask} updateTask={updateTask} />
        </Container>
        </>
    );
}

export default App;
