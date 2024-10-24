import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import TodoBoard from '../components/TodoBoard';
import api from '../utils/api';
// import { useParams } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

const TodoPage = ({ user, setUser }) => {
    // const { id } = useParams();
    //저장 스테이트
    const [todoList, setTodoList] = useState([]);
    const [todoValue, setTodoValue] = useState('');

    const getTasks = async () => {
        const response = await api.get('/task');
        console.log(response.data.data);
        setTodoList(response.data.data);
    };
    useEffect(() => {
        getTasks();
    }, []);
    const addTask = async () => {
        try {
            const res = await api.post('/task', {
                task: todoValue,
                isComplete: false,
            });
            if (res.status === 200) {
                console.log('성공');
                //추가한 값이 안보임
                getTasks();
            }
            //입력한 값이 안사라짐
            setTodoValue('');
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
    useEffect(() => {
        getTasks();
    }, []);
    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && todoValue.trim() !== '') {
            e.preventDefault();
            addTask();
        }
    };
    return (
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
    );
};

export default TodoPage;
