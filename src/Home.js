import React, { Component } from 'react';
import './css/home.css';
export default class Home extends Component {
    render() {
        return (
            <div>
                <div className="header">
                    <h1>Bem vindo a plataforma Help</h1>
                </div>
                <div className="content" id="content">
                    <p> 
                        Ai você fala o seguinte: "- Mas vocês acabaram isso?" Vou te falar: -"Não, está em andamento!" Tem obras que "vai" durar pra depois de 2010. Agora, por isso, nós já não desenhamos, não começamos a fazer projeto do que nós "podêmo fazê"? 11, 12, 13, 14... Por que é que não?
                        No meu xinélo da humildade eu gostaria muito de ver o Neymar e o Ganso. Por que eu acho que.... 11 entre 10 brasileiros gostariam. Você veja, eu já vi, parei de ver. Voltei a ver, e acho que o Neymar e o Ganso têm essa capacidade de fazer a gente olhar.
                        A população ela precisa da Zona Franca de Manaus, porque na Zona franca de Manaus, não é uma zona de exportação, é uma zona para o Brasil. Portanto ela tem um objetivo, ela evita o desmatamento, que é altamente lucravito. Derrubar arvores da natureza é muito lucrativo!
                        Se hoje é o dia das crianças... Ontem eu disse: o dia da criança é o dia da mãe, dos pais, das professoras, mas também é o dia dos animais, sempre que você olha uma criança, há sempre uma figura oculta, que é um cachorro atrás. O que é algo muito importante!
                    </p>
                    <a className="pure-button pure-button-primary btInicio" href="/login">login</a>
                    <a className="pure-button pure-button-primary btInicio" href="/registro">Registre-se</a>

              </div>

            </div>

        );
    }
}