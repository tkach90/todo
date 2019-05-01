import React from 'react';
import styled from 'styled-components';

const BtnNewItem = styled.button`
    display: flex;
    align-self: flex-end;
    background-color: aqua;        
`;

function NewTodoItemBtn(props) {

    return(
        <BtnNewItem
            type='submit'
        >
            Add new todo item
        </BtnNewItem>
    )
}

export default NewTodoItemBtn;