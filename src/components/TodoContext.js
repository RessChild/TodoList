import React, { useReducer, createContext, useContext, useRef } from 'react';
// Context API 활용

// 리스트 정보
const initalTodos = [
    {
        id: 1,
        text: '프로젝트 생성하기',
        done: true,
    },
    {
        id: 2,
        text: '디버깅',
        done: true,
    },
    {
        id: 3,
        text: '구현',
        done: false,
    },
    {
        id: 4,
        text: '테스트',
        done: false,
    }
];

/* CREATE , TOGGLE , REMOVE */
function todoRecuder(state, action) {
    switch(action.type){
        case 'CREATE':
            return state.concat(action.todo);
        case 'TOGGLE':
            return state.map(
                todo => todo.id === action.id ? { ...todo, done: !todo.done } : todo
            );
        case 'REMOVE':
            return state.filter( todo => todo.id !== action.id );
        default:
            throw new Error(`Unhandled action type : ${action.type}`)
    }
}

const TodoStateContext = createContext(); // 목록 정보
const TodoDispatchContext = createContext(); // 목록 수정 함수
const TodoNextIdContext = createContext(); // id 값

export function TodoProvider({ children }) {
    const [ state, dispatch ] = useReducer( todoRecuder, initalTodos );
    const nextId = useRef(5);
    // context 를 분할하여 만든 이유는 렌더링 최적화를 위함
    return (
        <TodoStateContext.Provider value={state}>
            <TodoDispatchContext.Provider value={dispatch}>
                <TodoNextIdContext.Provider value={nextId}>
                    { children }
                </TodoNextIdContext.Provider>
            </TodoDispatchContext.Provider>
        </TodoStateContext.Provider>
    );
}

// 정보 반환 목적의 커스텀 훅
export function useTodoState() {
    const context = useContext(TodoStateContext);
    if (!context) throw new Error('Cannot find TodoProvider');
    return context;
}
export function useTodoDispatch() {
    const context = useContext(TodoDispatchContext);
    if (!context) throw new Error('Cannot find TodoProvider');
    return context;
}
export function useTodoNextId() {
    const context = useContext(TodoNextIdContext);
    if (!context) throw new Error('Cannot find TodoProvider');
    return context;
}