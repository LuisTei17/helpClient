import React, {Component} from 'react';
import $ from 'jquery';
export default class Perfil extends Component {
    constructor() {
        super();
        this.state = {perfil:{}, categorias:[]};
    }

    buscaPerfil() {
        fetch("http://localhost:4030/v1/in/perfil?" + $.param({"token":localStorage.getItem('auth-token')}))
        //fetch("https://helptccapi.herokuapp.com/v1/in/perfil?" + $.param({"token":localStorage.getItem('auth-token')}))
            .then(response =>
                response.json()
            ).then(perfil =>
                this.setState({perfil:JSON.parse(perfil), categorias:JSON.parse(perfil).categorias })
            )
    }

   
    componentDidMount() {
        this.buscaPerfil()
        $('.formMudaSenha').hide();
    }
    render() {
        return(
            <div className="container">
                <h1>Perfil</h1>
                <h2>{this.state.perfil.nome}</h2>
                <h3>{this.state.perfil.email}</h3>
                { //console.log(this.state.perfil.categorias)
                    this.state.categorias.map((categoria, index) => {
                        return (
                            <h4 key={index}>{categoria}</h4>       
                        )
                    })
                }
                <a className="mudarSenha btn btn primary senha">Mudar senha</a>                 

                <form className="mudaSenha">
                    <div className="form-group">
                        <label for="senhaAtual">Senha atual</label>
                        <input className="form-control" id="senhaAtual" name="senhaAtual" placeholder="Senha atual"></input>
                    </div>
                    <div className="form-group">
                        <label for="novaSenha">Nova senha</label>
                        <input className="form-control" id="novaSenha" name="novaSenha" placeholder="Nova senha"></input>
                    </div>
                    <div className="form-group ">
                        <label for="novaSenha2">Confirme a senha</label>
                        <input className="form-control" id="novaSenha2" name="novaSenha2" placeholder="Confirme a senha"></input>
                    </div>
                    <input type="submit" className="btn btn-warning"Enviar></input>
                    <a className="">Cancelar</a>
                </form>
            </div>
        );
    }
}