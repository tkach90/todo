import React, { PureComponent } from 'react';

import TodoData from "./TodoData";

class FilterTodo extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            TodoData,
            filterData: [],
        }

        this.filterTodo = this.filterTodo.bind(this)
    }

    filterTodo(event) {
        this.setState({filterData: updateData});
    }

    render() {
        let filteredTodo = this.props.

        return (
            <label>
                Search
                <input
                    type="text"
                    // value={}
                    placeholder='search the todo item'
                    onChange={this.filterTodo}
                />
            </label>
        )
    }

}

export default FilterTodo;