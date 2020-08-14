import React from 'react';
import styled, { css } from 'styled-components';
import { MdDone, MdDelete } from 'react-icons/md';
import { useTodoDispatch } from './TodoContext';

// 체크 버튼
const CheckCircle = styled.div`
    width: 32px;
    height: 32px;
    border-radius: 50%;
    border: 1px solid #ced4da;
    font-size: 24px;

    display:flex;
    align-items: center;
    justify-content: center;
    margin-right: 20px;
    cursor: pointer;

    /* 속성값에 done 이 있다면 테두리 굵기, 색상 변경 */
    ${ props => props.done && css`
       border: 1px solid #38d9a9;
       color: #38d9a9;
    `}
`;
    
const Text = styled.div`
    flex: 1;
    font-size: 21px;
    color: #495057;

    /* 속성값에 done 이 있다면 색상 변경 */
    ${props => props.done && css`
        color: #ced4da;
    `}
`;

// 지우기 버튼
const Remove = styled.div`
    opacity: 0; /* 평소엔 안보이는 상태 (투명) */

    display: flex;
    align-items: center;
    justify-content: center;
    color: #dee2e6;
    font-size: 24px;
    cursor: pointer; /* 마우스를 클릭 형태로 */
    &:hover { /* 마우스 호버시, 빨간색 */
        color: #ff6b6b;
    }
`;

const TodoItemBlock = styled.div`
    display: flex;
    align-items: center;
    padding-top: 12px;
    padding-bottom: 12px;

    &:hover { /* 호버시, 내부의 Remove 객체를 보여줌 */
        ${Remove} {
            opacity: 1;
        }
    }
`;

function TodoItem({ id, done, text }) {
    // 완료 체크
    const dispatch = useTodoDispatch();
    const onToggle = () =>
        dispatch({
            type: 'TOGGLE',
            id,
        });
    // 삭제
    const onRemove = () =>
        dispatch({
            type: 'REMOVE',
            id,
        });
        
    return (
        <TodoItemBlock>
            <CheckCircle
                done={done}
                onClick={ onToggle }>
                { done && <MdDone /> }
            </CheckCircle>
            <Text done={done}>{ text }</Text>
            <Remove onClick={ onRemove }>
                <MdDelete />
            </Remove>
        </TodoItemBlock>
    );
}

export default React.memo(TodoItem);