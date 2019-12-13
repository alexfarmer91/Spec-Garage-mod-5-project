import React from 'react';

export default class CommentFilter extends React.Component{

    state = {
        query: ""
    }

    handleChange = (e) => {
        this.props.commentSearch(e.target.value)
        this.props.filterComments(e.target.value)
        this.setState({
            query: e.target.value
        })
    }
    render(){
        return(<form>
            <label for="search">Search: </label>
            <input onChange={this.handleChange} type="text" placeholder="search" name="search" id="search" value={this.state.query}/>
        </form>)
    }
}