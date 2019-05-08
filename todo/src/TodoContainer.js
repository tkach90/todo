import React, { PureComponent } from 'react';
import styled from 'styled-components';

import TodoItem from './TodoItem';
import TodoData from './TodoData';
import NewTodoItemBtn from './NewTodoItemBtn';
// import Search from './SearchInput';

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
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
  
  form {
      display: flex;
      flex-direction: column;
  }
`;

const Wrapper = styled.div`
  position: relative;
  display: flex;
  
  input {
    margin: 0 1rem;
    padding: 1rem;
    width: 100%;
    border-top-right-radius: 25px;
    border-bottom-right-radius: 25px;
  }
  
  button {
    position: absolute;
    right: 16px;
  } 
`;

const Search = styled.label`
  display: flex;
  align-items: center;
  margin: 1rem;
  
  input {
    width: 100%;
    padding: 1rem;
    margin-left: 1rem;
  }
`;

class TodoContainer extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            todoArr: TodoData,
            result: TodoData,
            text: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.filterTodo = this.filterTodo.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            todoArr: nextProps.todoArr,
        })
    }

    filterTodo(event) {
        let value = event.target.value;
        let FilteredData = this.state.todoArr, result = [];
        result = FilteredData.filter((todoItem) => {
            return todoItem.text.toLowerCase().search(value) !== -1;
        });

        this.setState({result});
    }

    handleChange(id) {
        this.setState(prevState => {
                const updateState = prevState.todoArr.map(todo => {
                        if (todo.id === id) {
                            todo.completed = !todo.completed;
                        }
                        return todo;
                    });

                return {
                    todoArr: updateState
                }
            }
        )
    }

    handleInput = e => {
        const text = e.target.value;
        this.setState({
            text
        })
    };

    addItem = e => {
        e.preventDefault();

        if (this.state.text !== '') {
            this.setState({
                todoArr: [...this.state.todoArr, {
                    id: (new Date()).getTime().toFixed(4),
                    text: this.state.text,
                    completed: false
                }],
                text: ''
            })
        }
    };

    render() {
        return (
            <TodoWrapper>
                <form onSubmit={this.addItem}>
                    {!!this.state.result &&
                    this.state.result.map(item =>
                        <TodoItem
                            key={item.id}
                            item={item}
                            handleChange={this.handleChange}
                        />
                    )
                    }
                    <Wrapper>
                        <input
                            placeholder='add me;)!'
                            value={this.state.text}
                            onChange={this.handleInput}
                        />
                        <NewTodoItemBtn />
                    </Wrapper>
                    <Search>
                        Search
                        <input
                            type="text"
                            placeholder='search the todo item'
                            onChange={this.filterTodo}
                        />
                    </Search>
                    {/*<Search*/}

                    {/*/>*/}
                </form>
            </TodoWrapper>
        )
    }
}

export default TodoContainer;