
import '../../materialize/css/materialize.css'
import '../Menu/style.css';
import api from '../../services/api';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { logout, userLocal } from '../../services/auth';
import { confirmAlert } from 'react-confirm-alert';
import profile_user_icon from '../../images/admin.png';
import aviao from '../../images/aviao.png';

export default function Menu() {
    const [email_recipient, setEmail_recipient] = useState("");
    const [title, setTitle] = useState("");
    const [message, setMessage] = useState("");
    const [nameSender, setNameSender] = useState("");
    const [view, setView] = useState("inicio");
    const TOKEN_KEY = "@PROJECTEMAIL/token";
    const USER = "@PROJECTEMAIL:user";
    const USER_LOCALSTORE= JSON.parse(localStorage.getItem(USER));
    const name= USER_LOCALSTORE.name;
    const name_sender= USER_LOCALSTORE.name;

    const email_sender= USER_LOCALSTORE.email;
  

    const [list, setList] = useState([]);
    useEffect(() => {
        async function loadList() {
            const response = await api.get("/message/"+email_sender);
            setList(response.data);
        }
        loadList();
      },list);

      const [listSender, setListSender] = useState([]);
      useEffect(() => {
          async function loadList() {
              const response = await api.get("/message/sender/"+email_sender);
              setListSender(response.data);
          }
          loadList();
        },listSender);

    async function submitMessage(event) {
        event.preventDefault();      
        const messagem = {
            email_sender,
            email_recipient,
            title,
            name_sender,
            message
        };
            try {
                await confirmAlert({
                    title: 'Atenção!',
                    message: 'Realmente deseja enviar a messagem?',
                    buttons: [
                      {
                        label: 'SIM',
                        onClick: () => api.post("/message", messagem)
                      },
                      {
                        label: 'NÃO'
                       
                      }
                    ]

                  })
            } catch (erro) {
                    alert("erro ao enviar mensagem");
            }
            setView("enviadas");

        }
    function logoutMenu() {
        if (JSON.parse(localStorage.getItem(TOKEN_KEY) != null)) {
            logout();
        }
    }
    if(view==="inicio"){
        return (
            <div >
                <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"></link>
                <nav>
                    <div class="nav-wrapper">
                        <a href="#" class="brand-logo">
                            <Link to="/">
                                <img class="logo"alt="" />
                            </Link>
                        </a>
                      
                        <ul id="nav-mobile" class="right hide-on-med-and-down">
                            <li id="name-login">
                                <img class="icon_user" src={profile_user_icon}></img>
                                {name.toUpperCase()}
                            </li>
                            <li>
                                <Link to="/login">
                                    <a id="btn-login-menu" class="waves-effect waves-light btn-small" onClick={logoutMenu}>
                                        <i class="large material-icons">exit_to_app</i>
                                    </a>
                                </Link>
                            </li>
                        </ul>
    
                    </div>
                </nav>
                <div >    
                <button  id="btn-escrever" class="btn waves-effect waves-light" onClick={event => setView("escrever")}>Escrever</button>
                <button  id="btn-enviadas" class="btn waves-effect waves-light" onClick={event => setView("enviadas")}>Enviadas</button>
                <button  id="btn-recebidas" class="btn waves-effect waves-light" onClick={event => setView("recebidas")}>Recebidas</button>
                </div>
                <h1 class="outmail">Outmail</h1>
                <div class="container-img-aviao">
                    <img class="img-aviao"src={aviao}></img>
                </div>
            </div>
        );
    }else if(view=="escrever"){
        return( 
        <div >
            <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"></link>
            <nav>
                <div class="nav-wrapper">
                    <a href="#" class="brand-logo">
                        <Link to="/">
                            <img class="logo"alt="" />
                        </Link>
                    </a>

                    <ul id="nav-mobile" class="right hide-on-med-and-down">
                        <li id="name-login">
                        <img class="icon_user" src={profile_user_icon}></img>
                            {name.toUpperCase()}
                        </li>
                        <li>
                            <Link to="/login">
                                <a id="btn-login-menu" class="waves-effect waves-light btn-small" onClick={logoutMenu}>
                                    <i class="large material-icons">exit_to_app</i>
                                </a>
                            </Link>
                        </li>
                    </ul>

                </div>
            </nav>
            <div >    
                <button  id="btn-escrever" class="btn waves-effect waves-light" onClick={event => setView("escrever")}>Escrever</button>
                <button  id="btn-enviadas" class="btn waves-effect waves-light" onClick={event => setView("enviadas")}>Enviadas</button>
                <button  id="btn-recebidas" class="btn waves-effect waves-light" onClick={event => setView("recebidas")}>Recebidas</button>
            </div>
            <div class="container-submit-message">
            <form class="form-cadastro-perfil" onSubmit={submitMessage}>
                <h3 class="title-submit-messagem">Escrever Messagem</h3>
                <div class="container-form">
                    <label for="email_inline" >Email-Destinatário</label>
                    <input id="email_inline" type="email" class="validate" onChange={event => setEmail_recipient(event.target.value)}></input>
                    <label for="email_inline" >Titulo</label>
                    <input id="title_inline" type="text" class="validate" onChange={event => setTitle(event.target.value)}></input>
                    <label for="textarea_inline" >Menssagem á enviar</label>
                    <textarea onChange={event => setMessage(event.target.value)}></textarea>
                    
                    <div class="cadastro-container-buttons">
                        <button id="btn-enviar" class="btn waves-effect waves-light" type="submit" name="action">Enviar</button>
                     </div>   
                   

                </div>
            </form>
            </div>
        </div>);
    }else if(view=="recebidas"){
        return( 
        <div >
            <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"></link>
            <nav>
                <div class="nav-wrapper">
                    <a href="#" class="brand-logo">
                        <Link to="/">
                            <img class="logo"alt="" />
                        </Link>
                    </a>

                    <ul id="nav-mobile" class="right hide-on-med-and-down">
                        <li id="name-login">
                        <img class="icon_user" src={profile_user_icon}></img>
                            {name.toUpperCase()}
                        </li>
                        <li>
                            <Link to="/login">
                                <a id="btn-login-menu" class="waves-effect waves-light btn-small" onClick={logoutMenu}>
                                    <i class="large material-icons">exit_to_app</i>
                                </a>
                            </Link>
                        </li>
                    </ul>

                </div>
            </nav>
            <div >    
                <button  id="btn-escrever" class="btn waves-effect waves-light" onClick={event => setView("escrever")}>Escrever</button>
                <button  id="btn-enviadas" class="btn waves-effect waves-light" onClick={event => setView("enviadas")}>Enviadas</button>
                <button  id="btn-recebidas" class="btn waves-effect waves-light" onClick={event => setView("recebidas")}>Recebidas</button>
            </div>
            <div class="container-received-message">
                { list && list.map(lista=>
                    <ul class="lista-received">
                        <li class="title-received">{lista.title}</li>
                        <hr></hr>
                        <li class="email-sender">De: {lista.name_sender}</li>
                        <hr></hr>
                        <li class="email-sender">Envidado por e-mail: {lista.email_sender}</li>
                        <label class="label-received">Mensagem:</label>
                        <li class="message-received">{lista.message}</li>
                    </ul>
                    )}
            </div>
        </div>);
    }else if(view=="enviadas"){
        return( 
        <div >
            <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"></link>
            <nav>
                <div class="nav-wrapper">
                    <a href="#" class="brand-logo">
                        <Link to="/">
                            <img class="logo"alt="" />
                        </Link>
                    </a>

                    <ul id="nav-mobile" class="right hide-on-med-and-down">
                        <li id="name-login">
                        <img class="icon_user" src={profile_user_icon}></img>
                            {name.toUpperCase()}
                        </li>
                        <li>
                            <Link to="/login">
                                <a id="btn-login-menu" class="waves-effect waves-light btn-small" onClick={logoutMenu}>
                                    <i class="large material-icons">exit_to_app</i>
                                </a>
                            </Link>
                        </li>
                    </ul>

                </div>
            </nav>
            <div >    
                <button  id="btn-escrever" class="btn waves-effect waves-light" onClick={event => setView("escrever")}>Escrever</button>
                <button  id="btn-enviadas" class="btn waves-effect waves-light" onClick={event => setView("enviadas")}>Enviadas</button>
                <button  id="btn-recebidas" class="btn waves-effect waves-light" onClick={event => setView("recebidas")}>Recebidas</button>
            </div>
            <div class="container-received-message">
                { listSender && listSender.map(lista=>
                    <ul class="lista-received">
                        <li class="title-received">{lista.title}</li>
                        <hr></hr>
                        <li class="email-sender">De: {lista.name_sender}</li>
                        <hr></hr>
                        <li class="email-sender">Envidado para: {lista.email_recipient}</li>
                        <label class="label-received">Mensagem:</label>
                        <li class="message-received">{lista.message}</li>
                    </ul>
                    )}
            </div>
        </div>);
    }
}

