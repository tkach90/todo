import React, {Fragment, PureComponent} from 'react';

import TodoItem from './TodoItem';
import TodoData from './TodoData';
import NewTodoItemBtn from './NewTodoItemBtn';
import Search from './SearchInput';

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
            <Fragment>
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
                </form>
            </Fragment>
        )
    }
}

export default TodoContainer;