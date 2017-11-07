import React, {Component} from 'react';
import $ from 'jquery';
import './css/perfil.css'
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

    modificaForm() {
        $('.form-muda-senha').toggle();
    }
   
    componentDidMount() {
        this.buscaPerfil()
        $('.form-muda-senha').hide();
        $('.mudarSenha').click(this.modificaForm)

    }
    render() {
        return(
            <div className="container">
                <img src="/img/perfil.png"/>
                <ul className="lista-insignias">   
                    <li>INsignia 1</li>
                    <li>Insignia 2</li>
                    <li>Insignia 3</li>
                </ul>
                <h2>{this.state.perfil.nome}</h2>
                <h3>{this.state.perfil.email}</h3>
                { //console.log(this.state.perfil.categorias)
                    this.state.categorias.map((categoria, index) => {
                        return (
                            <h4 key={index}>{categoria}</h4>       
                        )
                    })
                }

                <p className="introducao">
                    No meu xinélo da humildade eu gostaria muito de ver o Neymar e o Ganso. Por que eu acho que.... 11 entre 10 brasileiros gostariam. Você veja, eu já vi, parei de ver. Voltei a ver, e acho que o Neymar e o Ganso têm essa capacidade de fazer a gente olhar.
                    Todos as descrições das pessoas são sobre a humanidade do atendimento, a pessoa pega no pulso, examina, olha com carinho. Então eu acho que vai ter outra coisa, que os médicos cubanos trouxeram pro brasil, um alto grau de humanidade.
                </p>

                <a className="mudarSenha btn btn primary senha">Mudar senha</a>                 

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
        );
    }
}