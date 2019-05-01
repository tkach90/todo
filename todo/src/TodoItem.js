import React from 'react';
import styled from 'styled-components';

const Item = styled.label`
    display: flex;
    align-items: baseline;
    margin: 1rem;
    padding: 1rem;
    background: transparent;
    border-radius: 3px;
    border: 2px solid palevioletred;
    color: palevioletred;
`;

function TodoItem(props) {
    const completeStyle = {
        color: 'green',
        fontStyle: 'italic',
        textDecoration: 'line-through',
    }

    return (
        <Item style={props.item.completed ? completeStyle : null}>
            <input
                type="checkbox"
                checked={props.item.completed}
                onChange={() => props.handleChange(props.item.id)}
            />
            {props.item.text}
        </Item>
    )

}

export default TodoItem;