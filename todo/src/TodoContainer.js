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
            text: '',
            search: '',
            completed: false,
            filteredItems: [],
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            todoArr: nextProps.todoArr,
        })
    }

    filterTodo = (event) => {
        const search = event.target.value;
        this.setState({search});
    };

    handleChange = (id) => {
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
    };

    handleInput = (e) => {
        const text = e.target.value;
        this.setState({
            text
        })
    };

    addItem = (e) => {
        e.preventDefault();

        if (this.state.text !== '') {
            this.setState({
                todoArr: [{
                    id: (new Date()).getTime().toFixed(4),
                    text: this.state.text,
                    completed: false
                }, ...this.state.todoArr],
                text: ''
            })
        }
    };

    handlerfilterDone = (event) => {
        // const target = event.target;
        // const name = target.name;
        // const checked = event.target.checked;
        //
        // this.setState(prevState => {
        //     // We create a new object for filters
        //     const filter = {
        //         //  We add all existing filters
        //         //  This adds them with their existing values
        //         ...prevState.completed,
        //         // This is like:
        //         //    filters[name] = checked
        //         // which just overrides the value of
        //         //    the prop that has the name of checkbox
        //         [name]: checked
        //     };
        // });

        const filteredItems = prevState.todoArr.filter(item =>
            item.checked
        );
        this.setState({filteredItems: todoArr, key: 'selected'});
    };

    render() {
        let arr = [].concat(this.state.todoArr);
        if (this.state.search !== '') {
            arr = arr.filter(el => el.text.includes(this.state.search))
        }

        return (
            <TodoWrapper>
                <form onSubmit={this.addItem}>
                    <Search>
                        Search
                        <input
                            type="text"
                            placeholder='search the todo item'
                            onChange={this.filterTodo}
                            value={this.state.search}
                        />
                        <input
                            type="checkbox"
                            onChange={this.filterDone}
                        />
                    </Search>
                    <Wrapper>
                        <input
                            placeholder='add me;)!'
                            value={this.state.text}
                            onChange={this.handleInput}
                        />
                        <NewTodoItemBtn />
                    </Wrapper>
                    {!!arr.length &&
                    arr.map(item =>
                        <TodoItem
                            key={item.id}
                            item={item}
                            handleChange={this.handleChange}
                        />
                    )}
                </form>
            </TodoWrapper>
        )
    }
}

export default TodoContainer;