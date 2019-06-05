import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { Scrollbars } from 'react-custom-scrollbars';

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
  //overflow-y: auto;
  //-webkit-overflow-scrolling: touch;
  
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
            top: 0
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

    handlerFilterDone = () => this.setState({completed: !this.state.completed});

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
            backgroundImage: `-webkit-linear-gradient(90deg,
            rgba(0, 0, 0, 1) 0%,
            rgba(0, 0, 0, 1) 25%,
            transparent 100%,
            rgba(0, 0, 0, 1) 75%,
            transparent)`,
        };
        return (
            <div
                style={{ ...style, ...thumbStyle }}
                {...props}/>
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
        }

        return (

            <TodoWrapper>
                <Scrollbars
                    style={{ height: 380 }}
                    renderView={this.renderView}
                    renderThumbVertical={this.renderThumb}
                    onUpdate={this.handleUpdate}
                    {...this.props}
                >
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
                    </form>
                </Scrollbars>
            </TodoWrapper>
        )
    }
}

export default TodoContainer;