import React, {Fragment, PureComponent} from 'react';

import TodoData from "./TodoData";
import TodoItem from "./TodoItem";

class FilterTodo extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            TodoData,
            result: TodoData,
        }

        this.filterTodo = this.filterTodo.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            TodoData: nextProps.TodoData,
        })
    }

    filterTodo(event) {
        let value = event.target.value;
        let FilteredData = this.state.TodoData, result = [];
        result = FilteredData.filter((todoItem) => {
            return todoItem.text.toLowerCase().search(value) !== -1;
        });

        this.setState({result});
    }

    render() {


        return (
            <Fragment>
                <label>
                    Search
                    <input
                        type="text"
                        placeholder='search the todo item'
                        onChange={this.filterTodo}
                    />
                </label>

                {!!this.state.result &&
                    this.state.result.map(item =>
                        <TodoItem
                            key={item.id}
                            item={item}
                            handleChange={this.handleChange}
                        />
                    )
                }
            </Fragment>
        )
    }

}

export default FilterTodo;