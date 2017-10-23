import React, {Component} from 'react';
import Postagem from './components/Post';
import $ from 'jquery';

export default class Feed extends Component {
    
    constructor() {
        super();
        this.state = {posts:[{id: 1, titulo:"oi", texto:"texto", autor:"joao"}]};
    }

    componentDidMount(){
        //https://helptccapi.herokuapp.com/v1/feed?token=${localStorage.getItem("auth-token")}
        fetch('http://localhost:4030/v1/in/feed?' + $.param({token: localStorage.getItem('auth-token')}))
        .then(response => console.log(response))
        .then(postagens => {
            console.log(postagens);
            //this.setState({posts:postagens});
        });
    }

    render() {
        return(
            <div>
                <h1>Feed</h1>
                {
                    this.state.posts.map(post =><Postagem key={post.id} post={post}/> )
                }
            </div>
        )
    }
}
