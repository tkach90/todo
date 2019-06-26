import React from 'react';
import styled from 'styled-components';

const BtnNewItem = styled.button`    
     width: 50px;
     height: 50px;
     border-radius: 50%;
     background: linear-gradient(162deg, rgba(2,0,36,1) 0%, rgba(2,0,36,1) 0%, rgba(13,121,9,1) 0%, rgba(32,132,29,1) 42%, rgba(255,255,255,1) 100%);
     cursor: pointer;
     transition: box-shadow 0.2s ease, font-size 0.3s ease;
     
        &::after {
          content: "\\002B";
          left: 50%;
          top: 50%;
          font-size: 24px;
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

function NewTodoItemBtn() {
    return(
        <BtnNewItem
            type='submit'
        >
        </BtnNewItem>
    )
}

export default NewTodoItemBtn;