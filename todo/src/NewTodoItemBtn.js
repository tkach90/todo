import React from 'react';
import styled from 'styled-components';

const BtnNewItem = styled.button`
    //display: flex;
    //align-self: flex-end;
    //background-color: aqua;   
    //margin: 2rem 0;     
     width: 50px;
     height: 50px;
     border-radius: 50%;
     background-color: red;
     position: absolute;
     right: 10px;
     top: 65px;
     cursor: pointer;
     transition: box-shadow 0.2s ease, font-size 0.3s ease;
     
        &::after {
          content: "\\002B";
          left: 50%;
          top: 50%;
          font-size: 24px;
          position: absolute;
          transform: translate(-50%, -50%);
          color: #fff;
        }
        
        &:hover {
          box-shadow: 0px 0px 7px 8px rgba(0, 0, 0, 0.1);
          &::after {
            font-size: 26px;
          }
        }
`;

function NewTodoItemBtn(props) {

    return(
        <BtnNewItem
            type='submit'
        >
            {/*Add new todo item*/}
        </BtnNewItem>
    )
}

export default NewTodoItemBtn;