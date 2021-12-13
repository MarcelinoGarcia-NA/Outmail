import '../../materialize/css/materialize.css';
import React, { useState, useEffect, Component } from 'react';
import '../Cadastro/style.css';
import api from '../../services/api';
import { login } from '../../services/auth';
import { Link } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

export default function Cadastro({ history }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");

    async function cadastrar(event) {
        event.preventDefault();
    
        if ((email!=="") && (password !=="") &&(name!=="")) {
            
            
            try {
                const user = {
                    email,
                    password,
                    name
                };
                    const response = await api.post("/users", user);
                    const { token, user: userData } = response.data;
                    login(token, userData);
                    history.push("/");
                
                
            } catch (erro) {
                confirmAlert({
                    title: 'Atenção!',
                    message: 'Ocorreu um erro no cadastro!',
                    buttons: [
                      {
                        label: 'ok'
                       
                      }
                    ]
                  })
            }
        } else confirmAlert({
            title: 'Atenção!',
            message: 'Existe campos vazios!',
            buttons: [
              {
                label: 'ok'
               
              }
            ]
          })
    }
    return (
        <div class="container-perfil">
            <form class="form-cadastro-perfil" onSubmit={cadastrar}>
                <h1>Email</h1>
                <div class="container-form">
                    <label for="email_inline" >Email</label>
                    <input id="email_inline" type="email" class="validate" onChange={event => setEmail(event.target.value)}></input>

                    <label for="password_inline">Password</label>
                    <input id="password_inline" type="password" class="validate" onChange={event => setPassword(event.target.value)}></input>

                    <label for="nome_inline">Nome </label>
                    <input id="nome_inline" type="text" class="validate" onChange={event => setName(event.target.value)}></input>

                    <div class="cadastro-container-buttons">
                        <button id="btn-cadastrar" class="btn waves-effect waves-light" type="submit" name="action">Cadastrar
                        </button>
                        <Link to="/">
                            <button id="btn-cancelar" class="btn waves-effect waves-light" type="cancel" name="action">Cancelar
                            </button>
                        </Link>
                     </div>   
                   

                </div>
            </form>
        </div>
    );
}

