import React from 'react';
import styled from 'styled-components';
import TodoItem from './TodoItem';
import { useTodoState } from './TodoContext';

const TodoListBlock = styled.div`
    flex: 1;
    padding: 20px 32px;
    padding-bottom: 48px;
    overflow-y: auto; /* 수직 스크롤 생성 */
`;

function TodoList(){
    const todos = useTodoState(); // 목록을 불러옴
    return (
        <TodoListBlock>
            { todos.map( todo =>
                <TodoItem
                    key={todo.id}
                    {...todo}
                />)
            }

        </TodoListBlock>
    );
}

export default TodoList;