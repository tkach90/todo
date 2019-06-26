import React, { PureComponent } from 'react';
import styled from 'styled-components';

import TodoFunctionalForm from './TodoFunctionalForm';

const TodoWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  height: 100%;
  max-width: 340px;
  max-height: 380px;
  color: #000;
  border-radius: 10px;
  box-shadow: 0px 0px 7px 13px rgba(0, 0, 0, 0.1);
  transform: translate(-50%, -50%);
`;

class TodoContainer extends PureComponent {
    render() {
        return (
            <TodoWrapper>
                <TodoFunctionalForm/>
            </TodoWrapper>
        )
    }
}

export default TodoContainer;