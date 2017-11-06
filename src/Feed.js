import React, {Component} from 'react';
import Postagem from './components/Post';
import $ from 'jquery';

export default class Feed extends Component {
    
    constructor() {
        super();
        this.state = {posts:[]};
    }

    componentDidMount(){
        //fetch('https://helptccapi.herokuapp.com/v1/feed?' + $.param({token:localStorage.getItem("auth-token")}))
        fetch('http://localhost:4030/v1/in/feed?' + $.param({token: localStorage.getItem('auth-token')}))
        .then(response =>response.json())
        .then(postagens => {
            
            this.setState({posts:postagens})
        }).catch(error => console.log(error));
    }

    render() {
        return(
            <div>
                <h1>Feed</h1>
                {
                    this.state.posts.map(post =><Postagem key={post._id} post={post}/> )
                }
            </div>
        )
    }
}
