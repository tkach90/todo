import React, {Fragment, PureComponent} from 'react';

import TodoItem from './TodoItem';
import TodoData from './TodoData';
import NewTodoItemBtn from './NewTodoItemBtn';

class TodoContainer extends PureComponent {
    inputElement = React.createRef();

    constructor() {
        super();
        this.state = {
            todoArr: TodoData,
            currentItem: {
                text: '',
                id: '',
            }

        };

        this.handleChange = this.handleChange.bind(this);
    }

    componentDidUpdate() {
        this.props.inputElement.current.focus();
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
        const itemText = e.target.value;
        const currentItem = { text: itemText, id: this.handleChange }

        this.setState({
            currentItem,
        })
    }

    addItem = e => {
        e.preventDefault();
        const newItem = this.state.currentItem;

        if (newItem.text !== '') {
            console.log(newItem);
            const newTodoData = [...this.state.newTodoData, newItem];
            this.setState({
                newTodoData: newTodoData,
                currentItem: {text: '', id: ''},
            })
        }
    }

    render() {
        const ContainerItems = this.state.todoArr.map(item =>
            <TodoItem
                key={item.id}
                item={item}
                handleChange={this.handleChange}
            />
        );

        return (
            <Fragment>
                <form
                    onSubmit={this.props.addItem}
                >
                    {ContainerItems}
                    <input
                        placeholder='add me;)!'
                        ref={this.props.inputElement}
                        value={this.props.currentItem.text}
                        onChange={this.props.handleInput}
                    />
                    <NewTodoItemBtn />
                </form>
            </Fragment>
        )
    }
}

export default TodoContainer;