import React, {Component} from 'react';
import $ from 'jquery';
import {browserHistory} from 'react-router';
import './css/perfil.css'
export default class Perfil extends Component {
    constructor() {
        super();
        this.state = {perfil:{}, categorias:[], frase: ''};
    }

    buscaPerfil() {
        //fetch("http://localhost:4030/v1/in/perfil?" + $.param({"token":localStorage.getItem('auth-token')}))
        fetch("https://helptccapi.herokuapp.com/v1/in/perfil?" + $.param({"token":localStorage.getItem('auth-token')}))
            .then(response => 
                response.json()
            ).then(perfil =>
                this.setState({perfil:JSON.parse(perfil), categorias:JSON.parse(perfil).categorias })
            ).catch(error =>
                browserHistory.push("/login?msg=erro ao validar usuario")
            )
    }

    modificaForm() {
        $('.form-muda-senha').toggle();
    }
   
    componentDidMount() {
        this.buscaPerfil()
        $('.form-muda-senha').hide();
        $('.mudarSenha').click(this.modificaForm)
        this.pegaFraseRacionais();

    }

    pegaFraseRacionais() {
        fetch("https://racionaismc.herokuapp.com/1")
        .then(res => res.json())
        .then(paragrafo => {
            console.log(this.state.perfil)
            this.setState({frase:paragrafo.paragrafos[0]})
            
        }
        )
    } 

    render() {
        return(
            <div className="container perfil">
                <div className="info">
                    <img className="img-perfil" src={require("./img/perfil.png")} alt="foto de perfil"/>
                    <h1>{this.state.perfil.username}</h1>
                </div>
                <div className="info-tipo">
                    {(() => {
                        if(this.state.perfil.tipo !== "instituicao") {
                            return (
                                <ul className="lista-insignias">   
                                    <li className="col-xs-12">Insignia 1</li>
                                    <li className="col-xs-12">Insignia 2</li>
                                    <li className="col-xs-12">Insignia 3</li>
                                </ul>
                            )
                        } else {
                            return (
                                <div>
                                    <button className="doar btn btn-primary">Doar</button>
                                    <button className="trabalho btn btn-primary">Trabalho voluntário</button>
                                </div>
                            )
                        }
                    } 
                    )()}
                </div>{/*FIm da linha da classe info*/}
                <div className="info-2">
                   
                    { /* 
                        this.state.categorias.map((categoria, index) => {
                            return (
                                <h4 key={index}>{categoria}</h4>       
                            )
                        })
                    }
                */}

                    <p className="introducao">
                        {
                            this.state.frase
                        }
                        <a className="mudarSenha btn btn primary senha">Mudar senha</a>                 
                    </p>


                    <form className="form-muda-senha">
                        <div className="form-group">
                            <label htmlFor="senhaAtual">Senha atual</label>
                            <input className="form-control" id="senhaAtual" name="senhaAtual" placeholder="Senha atual"></input>
                        </div>
                        <div className="form-group">
                            <label htmlFor="novaSenha">Nova senha</label>
                            <input className="form-control" id="novaSenha" name="novaSenha" placeholder="Nova senha"></input>
                        </div>
                        <div className="form-group ">
                            <label htmlFor="novaSenha2">Confirme a senha</label>
                            <input className="form-control" id="novaSenha2" name="novaSenha2" placeholder="Confirme a senha"></input>
                        </div>
                        <input type="submit" className="btn btn-warning"/>
                        <a className="mudarSenha">Cancelar</a>
                    </form>
                </div>
            </div>
        );
    }
}