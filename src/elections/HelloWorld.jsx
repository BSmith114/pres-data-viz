import React from 'react'
import ReactDom from 'react-dom'

class HelloWorld extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: 'Geoff'
        }
    }
    render() {
        return (
            <div>Hello {this.state.name}!</div>
        )
    }
}

export default HelloWorld;