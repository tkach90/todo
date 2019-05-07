import React, { PureComponent } from 'react';
import styled from 'styled-components';

import TodoItem from './TodoItem';
import TodoData from './TodoData';
import NewTodoItemBtn from './NewTodoItemBtn';
// import Search from './SearchInput';

const TodoWrapper = styled.div`
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
  max-width: 340px;
  max-height: 380px;
  width: 100%;
  height: 100%;
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, 50%);
  color: #fff;
  border-radius: 10px;
  box-shadow: 0px 0px 7px 13px rgba(0, 0, 0, 0.1);
  
  form {
    border-bottom: 1px solid #d0d0e1;
    padding: 25px 20px;
    background: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: sticky;
    top: 0;
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
                    <input
                        placeholder='add me;)!'
                        value={this.state.text}
                        onChange={this.handleInput}
                    />
                    <NewTodoItemBtn />
                    <label>
                        Search
                        <input
                            type="text"
                            placeholder='search the todo item'
                            onChange={this.filterTodo}
                        />
                    </label>
                    {/*<Search*/}

                    {/*/>*/}
                </form>
            </TodoWrapper>
        )
    }
}

export default TodoContainer;