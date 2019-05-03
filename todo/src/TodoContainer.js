import React, {Fragment, PureComponent} from 'react';

import TodoItem from './TodoItem';
import TodoData from './TodoData';
import NewTodoItemBtn from './NewTodoItemBtn';
import Search from './searchInput';

class TodoContainer extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            todoArr: TodoData,
            text: ''
        };

        this.handleChange = this.handleChange.bind(this);
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
                    id: (new Date).getTime().toFixed(4),
                    text: this.state.text,
                    completed: false
                }],
                text: ''
            })
        }
    };

    updateData(config) {
        this.setState(config);
    }

    render() {
        return (
            <Fragment>
                <form onSubmit={this.addItem}>
                    {!!this.state.todoArr &&
                    this.state.todoArr.map(item =>
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
                    <Search
                        text={this.state.stringSearch}
                        data={this.state.todoArr}
                        update={this.updateData.bind(this)}
                    />
                </form>
            </Fragment>
        )
    }
}

export default TodoContainer;