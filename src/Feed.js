import React, {Component} from 'react';
import Postagem from './components/Post';

class Posts extends Component {
    constructor() {
        super();
        this.state = {posts: {"titulo":"oi", "texto":"caraca", "autor":"pedro"}};
    }

    componentDidMount(){
        //https://helptccapi.herokuapp.com/v1/feed?token=${localStorage.getItem("auth-token")}
        fetch('http://localhost:4030/v1/in/feed?token=${localStorage.getItem("auth-token")')
         .then(response => console.log(response)    
        )
         .catch(error =>
            console.log(error)
        )
         .then(posts => {
            console.log(posts)
           this.setState({posts:posts});
         });
    }

    render() {
        return(
            <div>
                <h1>Posts</h1>
                {
           //         this.state.posts.map(post => <Postagem key={post.id} post={post}/>)
                }
            </div>
        )
    }
}


export default class Feed extends Component {
    render() {
        return (
            <div>
                <h1>Feed</h1>
            </div>     
        );
    }
}