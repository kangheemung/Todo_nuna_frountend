import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from 'react';
import TodoBoard from './components/TodoBoard';
import api from './utils/api';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

function App() {
    //저장 스테이트
    const [todoList, setTodoList] = useState([]);

    const getTasks = async () => {
        const responese = await api.get('/tasks');
        console.log('rrrrrrr', responese);
        setTodoList(responese.data.data);

        //정의
    };
    useEffect(() => {
        getTasks();
    }, []);
    return (
        <Container>
            <Row className="add-item-row">
                <Col xs={12} sm={10}>
                    <input type="text" placeholder="할일을 입력하세요" className="input-box" />
                </Col>
                <Col xs={12} sm={2}>
                    <button className="button-add">추가</button>
                </Col>
            </Row>

            <TodoBoard />
        </Container>
    );
}

export default App;
