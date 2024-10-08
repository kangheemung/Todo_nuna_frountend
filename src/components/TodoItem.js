import React from 'react';
import { Col, Row } from 'react-bootstrap';
import './Todoltem.style.css';

const TodoItem = ({ item, deleteTask, updateTask }) => {
    const handleDelete = () => {
        deleteTask(item._id);
    };
    const handleDone = () => {
        const updatedIsComplete = !item.isComplete; // Update to access item.isComplete property
        updateTask(item._id, updatedIsComplete);
        console.log('끝남');
    };
    return (
        <Row>
            <Col xs={12}>
                <div className={`todo-item ${item.isComplete ? 'completed' : ''}`}>
                    <div className="todo-content">{item.task}</div>

                    <div>
                        <button
                            className={`button-delete ${item.isComplete ? 'completed-button' : ''}`}
                            onClick={handleDelete}>
                            삭제
                        </button>
                        <button
                            className={`button-delete ${item.isComplete ? 'completed-button' : ''}`}
                            onClick={handleDone}>
                            {item.isComplete ? '취소' : '끝남'}
                        </button>
                    </div>
                </div>
            </Col>
        </Row>
    );
};

export default TodoItem;
