import React from 'react';
import styled from 'styled-components';

// 스타일 요소
const TodoTemplateBlock = styled.div`
    width: 512px;
    height: 768px;

    position: relative; /* 하단의 추가 버튼을 맞추기 위함 */
    background: white;
    border-radius: 16px;
    box-shadow: 0 0 8px rgba(0,0,0, 0.04); /* 그림자 */

    margin: 0 auto;
    margin-top: 96px;
    margin-bottom: 32px;
    
    display: flex;
    flex-direction: column;
`;

function TodoTemplate({ children }){
    return (
        <TodoTemplateBlock>{ children }</TodoTemplateBlock>
    );
}

export default TodoTemplate;