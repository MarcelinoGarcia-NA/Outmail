import '../../materialize/css/materialize.css'
import '../Login/style.css';
import api from '../../services/api';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { login, logout } from "../../services/auth.js";
import { confirmAlert } from 'react-confirm-alert';
import aviao from '../../images/aviao.png';
import 'react-confirm-alert/src/react-confirm-alert.css';

export default function Login({ history }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


   
    async function Logar(event) {
        event.preventDefault();

        try {
            const name= await api.get("/users/"+email);
            const user = {
                email,
                password,
                name
            };
             
            const response = await api.post("/authenticate", user);
            const { token, user: userData } = response.data;
            login(token, userData);
            history.push("/menu");
        } catch (erro) {
            confirmAlert({
                title: 'Atenção!',
                message: 'Ocorreu um erro ao logar!',
                buttons: [
                  {
                    label: 'ok'
                   
                  }
                ]
              })
        }
    }

    return (
        <div>
            <h1 class="login-outmail">Outmail</h1>
            <div class="Login-container-user">
              
                <h3 class="title-login">Fazer login</h3>
                <div class="row">

                    <form id="form-login" class="col s12" onSubmit={Logar}>
                        <div id="inputEmail" class="row">
                            <label for="email_inline" >Email</label>
                            <input id="email_inline" type="email" class="validate" onChange={event => setEmail(event.target.value)}></input>
                        </div>
                        <div id="inputPassword" class="row">
                            <label for="password_inline">Password</label>
                            <input id="password_inline" type="password" class="validate" onChange={event => setPassword(event.target.value)}></input>
                        </div>
                         <Link to="/cadastro">
                            <a class="link-cadastro">Novo por aqui?</a>
                         </Link>
                        <button id="btn-login" class="btn waves-effect waves-light" type="submit" name="action">Acessar
                        </button>
                    </form>
                </div>
            </div>
            <img class="login-img-aviao"src={aviao}></img>
        </div>
    );
}

