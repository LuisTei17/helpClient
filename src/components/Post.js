import React, {Component} from 'react';

export default class Postagem extends Component {
    render() {
        return (
            <div className="container">
                <h1>{this.props.titulo}</h1>
                <p>{this.props.text}</p>
                <h4>{this.props.autor}</h4>
            </div>
        );
    }
}