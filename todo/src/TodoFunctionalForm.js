import React, {PureComponent} from 'react';
import styled from 'styled-components';
import { Scrollbars } from 'react-custom-scrollbars';

import TodoData from "./TodoData";
import TodoItem from "./TodoItem";
import NewTodoItemBtn from "./NewTodoItemBtn";

const TodoForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const Wrapper = styled.div`
  position: relative;
  display: flex;
  
  input {
    margin: 0 1rem;
    padding: 1rem;
    width: 100%;
    color: palevioletred;
    background: papayawhip;
    border: none;
    border-top-right-radius: 25px;
    border-bottom-right-radius: 25px;
    box-shadow: 0 3px 5px 0 rgba(0,0,0,0.1);
    transition: box-shadow 0.3s ease-in-out;
    
    &:hover {
      box-shadow: 0 5px 15px 2px rgba(0, 0, 0, 0.8);
    }
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
  color: #091579;
  
  input {
    padding: 0.5rem;
    margin: 0.5rem;
    color: palevioletred;
    background: papayawhip;
    border: none;
    border-radius: 10px;
    box-shadow: 0 3px 5px 0 rgba(0,0,0,0.1);
    transition: box-shadow 0.3s ease-in-out;
    
    &:hover {
      box-shadow: 0 5px 15px 2px rgba(0, 0, 0, 0.8);
    }
  }
`;

class TodoFunctionalForm extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            todoArr: TodoData,
            text: '',
            search: '',
            completed: false,
            filteredItems: [],
            top: 0
        };
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

    componentWillReceiveProps(nextProps) {
        this.setState({
            todoArr: nextProps.todoArr,
        })
    }

    filterTodo = (event) => {
        const search = event.target.value;
        this.setState({search});
    };

    handlerFilterDone = () => this.setState({
        completed: !this.state.completed
    });

    handleUpdate = (values) => {
        const { top } = values;
        this.setState({ top });
    }

    renderView = ({ style, ...props }) => {
        const viewStyle = {
            // padding: 15,
        };
        return (
            <div
                className="box"
                style={{ ...style, ...viewStyle }}
                {...props}/>
        );
    }

    renderThumb = ({ style, ...props }) => {
        const thumbStyle = {
            backgroundColor: `#FFF`,
            backgroundImage: `linear-gradient(360deg, rgba(2,0,36,1) 0%, 
            rgba(2,0,36,1) 0%, 
            rgba(9,21,121,1) 50%, 
            rgba(255,255,255,1) 100%)`,
        };
        return (
            <div
                style={{ ...style, ...thumbStyle }}
                {...props}
            />
        );
    }

    render() {
        let arr = [].concat(this.state.todoArr);

        if (this.state.search !== '' && !this.state.completed) {
            arr = arr.filter(
                el => el.text.includes(this.state.search)
            );
        } else if (this.state.search !== '' && this.state.completed) {
            arr = arr.filter(
                el => el.text.includes(this.state.search)
            );

            arr = arr.filter(
                item => !item.completed
            );
        } else if (this.state.completed) {
            arr = arr.filter(
                item => !item.completed
            );
        } else if (arr.length === 0) {
            return <span>No Results Found</span>
        }

        return (
            <>
                <Scrollbars
                    style={{ height: 380 }}
                    renderView={this.renderView}
                    renderThumbVertical={this.renderThumb}
                    onUpdate={this.handleUpdate}
                    {...this.props}
                >
                    <TodoForm onSubmit={this.addItem}>
                        <Search>
                            Search
                            <input
                                type="text"
                                placeholder='search the todo item'
                                onChange={this.filterTodo}
                                value={this.state.search}
                            />
                        </Search>
                        <Search>
                            Undone items
                            <input
                                type="checkbox"
                                onChange={this.handlerFilterDone}
                                value={this.state.completed}
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
                    </TodoForm>
                </Scrollbars>
            </>
        )
    }

}

export default TodoFunctionalForm;