import React, {Component} from 'react';
import './../css/post.css';
export default class Postagem extends Component {
    render() {
        return (
            <div className="container">
                <div className="jumbotron">
                    <h1>{this.props.post.titulo}</h1>
                    <p>{this.props.post.texto}</p>
                    <p className="autor">{this.props.post.autor}</p>

                </div>
            </div>
        );
    }
}