import React from 'react';
import styled from 'styled-components';

const Item = styled.label`
    display: flex;
    align-items: center;
    margin: 1rem;
    padding: 1rem;
    background: linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(2,0,36,1) 0%, rgba(9,21,121,1) 30%, rgba(255,255,255,1) 100%);
    color: #fff;
    
    input {
      margin-right: 5px;
    }
`;

function TodoItem(props) {
    const completeStyle = {
        color: '#00dd00',
        fontStyle: 'italic',
        textDecoration: 'line-through',
    };

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