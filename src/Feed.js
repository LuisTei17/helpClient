import React, {Component} from 'react';
import $ from 'jquery';

export default class Feed extends Component {
    
    constructor(props) {
        super(props);
        this.state = {posts:[], user:{}};
    }
    
    componentDidMount(){
       this.atualizaFeed();
    }

    enviaForm(event) {
        event.preventDefault();
        const requestInfo = {
            method: 'POST',
            body: JSON.stringify({
                titulo:this.titulo.value,
                texto:this.texto.value,
                autor: this.autor.value
            }),
            headers: new Headers({
                'Content-type':'application/json'
            })
        };
        fetch("http://localhost:4030/v1/in/post?" + $.param({token:localStorage.getItem('auth-token')}), requestInfo)
            .then(resp =>
                this.atualizaFeed()
            )
            $('.modal').toggle();
            $('.modal-backdrop').toggle();
            $('body').removeClass('modal-open');
    }

    excluir() {
        const requestInfo = {
            method: "DELETE"
        }
        var id = this.id.value;
        console.log(this.id)
  
        fetch("http://localhost:4030/v1/in/post?" + $.param({token:localStorage.getItem('auth-token'), id:id}), requestInfo)
            .then(resp =>
                this.atualizaFeed()
            )
    }

    atualizaFeed() {
        //fetch('https://helptccapi.herokuapp.com/v1/in/feed?' + $.param({token:localStorage.getItem("auth-token")}))
        fetch('http://localhost:4030/v1/in/feed?' + $.param({token: localStorage.getItem('auth-token')}))
        .then(response =>response.json())
        .then(responseJson => {
            var usuario = JSON.parse(responseJson.user);
            this.setState({posts:responseJson.posts})
            this.setState({user:usuario})
        }).catch(error => console.log(error));
    }

    render() {
        return(
            
            <div className="container">
                <div data-toggle="modal" data-target="#myModal" className="nova-postagem"><span className="glyphicon glyphicon-plus"></span></div>
                <div className="modal fade" id="myModal" role="dialog" aria-labelledby="myModalLabel">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                                <h4 className="modal-title" id="myModalLabel">Mudar senha</h4>
                            </div>
                            <div className="modal-body">
                                <div className="publicacao">
                                    <form className="formulario-postagem"  onSubmit={this.enviaForm.bind(this)} method="post">
                                        <h2>Espalhe o bem</h2>
                                        <div className="form-group">
                                            <input className="form-control" placeholder="titulo" ref={(input) => this.titulo = input}></input>
                                        </div>
                                        <div className="form-group">
                                            <textarea cols="2" rows="6" className="form-control" ref={(input) => this.texto = input}></textarea>
                                        </div>
                                        <input type="hidden" ref={(input) => this.autor = input} value={this.state.user.username}></input>
                                        <button className="btn btn-primary">Publicar</button>

                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {
                    this.state.posts.map(post =>
                        <div key={post._id} className="container">
                            <div className="jumbotron postagem">
                                
                                <h2>{post.titulo}</h2>
                                <p>{post.texto}</p>
                                <p className="autor">{post.autor}</p>
                                <button onClick={this.excluir.bind(this)} className="excluir btn btn-warning">deletar</button>
                                <input ref={(input) => this.id = input} type="hidden" value={post._id}></input>
                            </div>
                        </div>
                     )
                }
            </div>
        )
    }
}
