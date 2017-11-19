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
        fetch("http://localhost:4030/v1/in/perfil?" + $.param({"token":localStorage.getItem('auth-token')}))
        //fetch("https://helptccapi.herokuapp.com/v1/in/perfil?" + $.param({"token":localStorage.getItem('auth-token')}))
            .then(response => 
                response.json()
            ).then(perfil =>
                this.setState({perfil:JSON.parse(perfil), categorias:JSON.parse(perfil).categorias })
            ).catch(error =>
                browserHistory.push("/login?msg=erro ao validar usuario")
            )
    }
   
    componentDidMount() {
        this.buscaPerfil()

        this.pegaFraseRacionais();

    }

    pegaFraseRacionais() {
        fetch("https://racionaismc.herokuapp.com/1")
        .then(res => res.json())
        .then(paragrafo => {
            this.setState({frase:paragrafo.paragrafos[0]})
            
        }
        ).catch(err => {
        })
    } 

    render() {
        return(
            <div className="container perfil">
                <div className="info">
                    <img className="img-perfil img img-responsive" src={require("./img/perfil.png")} alt="foto de perfil"/>
                   
                </div>
                <div className="introducao">
                    <h1>{this.state.perfil.username}</h1>
                    <p className="introducao">
                        {
                            this.state.frase
                        }<br></br>
                        <button className="mudarSenha btn btn primary senha"  data-toggle="modal" data-target="#myModal">Mudar senha</button>                 
                    </p>
                    

                    <div className="modal fade" id="myModal" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel">
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                                    <h4 className="modal-title" id="myModalLabel">Mudar senha</h4>
                                </div>
                                <div className="modal-body">
                                    <form className="form-muda-senha">
                                        <div className="form-group form-div">
                                            <label htmlFor="senhaAtual">Senha atual</label>
                                            <input className="form-control" id="senhaAtual" name="senhaAtual" placeholder="Senha atual"></input>
                                        </div>
                                        <div className="form-group form-div">
                                            <label htmlFor="novaSenha">Nova senha</label>
                                            <input className="form-control" id="novaSenha" name="novaSenha" placeholder="Nova senha"></input>
                                        </div>
                                        <div className="form-group form-div">
                                            <label htmlFor="novaSenha2">Confirme a senha</label>
                                            <input className="form-control" id="novaSenha2" name="novaSenha2" placeholder="Confirme a senha"></input>
                                        </div>
                                        <button type="submit" className="btn btn-warning">Enviar</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
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
                
                    { /* 
                        this.state.categorias.map((categoria, index) => {
                            return (
                                <h4 key={index}>{categoria}</h4>       
                            )
                        })
                    }
                */}

            </div>
        );
    }
}