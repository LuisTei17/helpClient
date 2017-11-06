import React, { Component } from 'react';
import './css/home.css';
export default class Home extends Component {
    render() {
        return (
            <div>
                <div className="container" id="content">
                    <div id="carousel-example-generic" className="carousel slide" data-ride="carousel">
                        <ol className="carousel-indicators">
                            <li data-target="#carousel-example-generic" data-slide-to="0" className="active"></li>
                            <li data-target="#carousel-example-generic" data-slide-to="1"></li>
                            <li data-target="#carousel-example-generic" data-slide-to="2"></li>
                        </ol>

                        <div className="carousel-inner" role="listbox">
                            <div className="item active">
                                <img src={'/img/pobreza-1.jpg'} alt="Imagem de pessoa com poucos recursos financeiros"/>
                                <div className="carousel-caption">
                                </div>
                            </div>
                            <div className="item">
                                <img src="/img/pobreza-2.jpg" alt="Coração de pedra em uma mão"/>
                                <div className="carousel-caption">
                                </div>
                            </div>
                            <div className="item">
                                <img src="/img/pobreza-3.jpg" alt="Mãos abertas"/>
                                <div className="carousel-caption">
                                </div>
                            </div>
                        </div>

                        <a className="left carousel-control" href="#carousel-example-generic" role="button" data-slide="prev">
                            <span className="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
                            <span className="sr-only">Previous</span>
                        </a>
                        <a className="right carousel-control" href="#carousel-example-generic" role="button" data-slide="next">
                            <span className="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
                            <span className="sr-only">Next</span>
                        </a>
                    </div><br></br>
                    <div className="jumbotron">
                        <h1>HELP!</h1>
                        <p>
                            Eu dou dinheiro pra minha filha. Eu dou dinheiro pra ela viajar, então é... é... Já vivi muito sem dinheiro, já vivi muito com dinheiro. -Jornalista: Coloca esse dinheiro na poupança que a senhora ganha R$10 mil por mês. -Dilma: O que que é R$10 mil?
                            A única área que eu acho, que vai exigir muita atenção nossa, e aí eu já aventei a hipótese de até criar um ministério. É na área de... Na área... Eu diria assim, como uma espécie de analogia com o que acontece na área agrícola.
                            Todos as descrições das pessoas são sobre a humanidade do atendimento, a pessoa pega no pulso, examina, olha com carinho. Então eu acho que vai ter outra coisa, que os médicos cubanos trouxeram pro brasil, um alto grau de humanidade.
                        </p>
                        <p><a className="btn btn-primary" href="/login" role="button">Entre para ajudar uma criança</a></p>
                    </div>

              </div>

            </div>

        );
    }
}