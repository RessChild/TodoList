import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { MdAdd } from 'react-icons/md';
import { useTodoDispatch, useTodoNextId } from './TodoContext';

const CircleButton = styled.button`
    width: 80px;
    height: 80px;
    cursor: pointer;

    background: #38d9a9;
    &:hover { /* 마우스 호버 */
        background: #63e6be;
    }
    &:active{ /* 클릭 */
        background: #20c997;
    }
    z-index: 5;

    display:flex;
    align-items: center;
    justify-content: center;

    position: absolute;
    left: 50%;
    bottom: 0px; /* 하단 정 중앙에 아래를 맞춤 */
    transform: translate(-50%, 50%); /* 세밀한 위치조정 */

    font-size: 60px;
    color: white;
    border-radius: 50%;

    border: none;
    outline: none;

    /* 팝업이 열린 상태 */
    ${props=> props.open && css`
        background: #ff6b6b;
        /* 빨간색으로 변경 */
        &:hover {
            background: #ff8787;
        }
        &:active {
            background: #fa5252;
        }
        transform: translate(-50%, 50%) rotate(45deg);
        /* 위치는 동일하게 유지하되, 45도 회전 */
    `}
    transition: 0.125s all ease-in; /* 애니메이션 효과 */
`;

/* 입력 공간 */
const InsertFormPositioner = styled.div`
    width: 100%; /* 가로는 전부 사용 */
    position: absolute;
    bottom: 0;
    left: 0; /* 상위 relation 부모를 기준으로 좌측 하단에 딱 붙임 */
`;

const InsertForm = styled.form`
    background: #f8f9fa;
    padding: 32px;
    padding-bottom: 72px;
    border-bottom-left-radius: 16px;
    border-bottom-right-radius: 16px;
    border-top: 1px solid #e9ecef;
`;

const Input = styled.input`
    padding: 12px;
    border-radius: 4px;
    border: 1px solid #dee2e6;
    width: 100%;
    outline: none;
    font-size: 18px;
    box-sizing: border-box; /* 테두리를 포함하여 크기를 결정 */
`;

function TodoCreate(){
    const [ open, setOpen ] = useState(false);
    const [ value, setValue ] = useState('');

    const dispatch = useTodoDispatch();
    const nextId = useTodoNextId();

    const onToggle = () => setOpen(!open);
    const onChange = e => setValue(e.target.value);
    const onSubmit = e => {
        e.preventDefault();
        // form 객체는 onSubmit 시 기본으로 새로고침이 발생
        // 이를 방지하는 명령
        dispatch({
            type:'CREATE',
            todo: {
                id: nextId.current,
                text: value,
                done: false,
            }
        });
        setValue(''); // 초기화
        setOpen(false); // 입력창 닫기
        nextId.current += 1; // 아이디 값 증가
    };

    return (
        <>
            { open && /* 열린 상태라면 화면에 구성 */
                <InsertFormPositioner>
                    <InsertForm onSubmit={ onSubmit }>
                        <Input
                            placeholder="할 일을 입력 후, Enter 를 누르세요"
                            autoFocus // 자동 포커싱 옵션
                            onChange={ onChange }
                            value={ value }
                        />
                    </InsertForm>
                </InsertFormPositioner>
            }
            <CircleButton onClick={onToggle} open={open}>
                <MdAdd />
            </CircleButton>
        </>
    );
}

export default React.memo(TodoCreate);