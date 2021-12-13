import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import '../PerfisUsuarios/style.css';
import { Link } from 'react-router-dom';
import { userLocal } from '../../services/auth';
import icon_delete from '../../images/deletar.png';
import icon_alert from '../../images/alert.png';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

export default function Categorias() {


  const [list, setList] = useState([]);
  const [x, setX] = useState([]);
  const url_atual = window.location.href;
  const id = url_atual.substring(32);
  const id_search_style = url_atual.substring(22);
  const search_category = url_atual.substring(22, 31);
  const [deleteUser, setDeleteUser]=useState(false);

  const TOKEN_KEY = "@NOVAMUSIC/token";
  const USER = "@NOVAMUSIC:user";
  useEffect(() => {
    async function loadList() {

      if (search_category === "categoria") {
        const response = await api.get("/users/category/" + id);
        setList(response.data);
      } else if (id_search_style !== "") {
        const response = await api.get("/users/stylemusic/" + id_search_style);
        if (response != null) {
          setList(response.data);
        }
      } else {
        const response = await api.get("/users");
        setList(response.data);
      }
    }
    loadList();
  }, [list]);
  
  async function deletar(user_id) {
    
    try {
       confirmAlert({
        title: <img class="alert-icon" src={icon_alert}></img>,
        message: 'Você realmente deseja deletar o perfil do artista?',
        buttons: [
          {
            label: 'Sim',
            onClick: () => api.delete("/users/"+user_id)
          },
          {
            label: 'Não'
          }
        ]
      })

    } catch (erro) {
      confirmAlert({
        title: 'Atenção!',
        message: 'Erro ao deletar!',
        buttons: [
          {
            label: 'ok'
           
          }
        ]
      })
    }
  }

  const recebeUser = JSON.parse(localStorage.getItem(USER));
  if ((recebeUser === null) || (recebeUser.isAdmin === false)) {
    return (
      <div class="PerfisUsuarios-container-center-users">
        {list && list.map(users =>
          <Link to={"/perfilcontrato/" + users._id}>
            <div class="PerfisUsuarios-container-users">
              <img class="PerfisUsuarios-image-perfil-user" src={"https://img.youtube.com/vi/" + users.link_youtube.substring(32) + "/maxresdefault.jpg"}></img>
              <ul class="PerfisUsuarios-container-perfil-users">
                <li class="PerfisUsuarios-title">{users.name_artistic}</li>
                <li class="PerfisUsuarios-style-music">{users.style_music}</li>
              </ul>
            </div>
          </Link>
        )
        }
      </div>
    );
  } else if (recebeUser.isAdmin === true) {
    return (

      <div class="PerfisUsuarios-container-center-users">
        {list && list.map(users =>

          <div class="PerfisUsuarios-container-users">
            <Link to={"/perfilcontrato/" + users._id}>
              <img class="PerfisUsuarios-image-perfil-user" src={"https://img.youtube.com/vi/" + users.link_youtube.substring(32) + "/maxresdefault.jpg"}></img>
              <ul class="PerfisUsuarios-container-perfil-users">
                <li class="PerfisUsuarios-title">{users.name_artistic}</li>
                <li class="PerfisUsuarios-style-music">{users.style_music}</li>
              </ul>
            </Link>
              <img src={icon_delete} class="PerfisUsuarios-icon-deletar" onClick={event=>deletar(users._id)}>
              </img>
          </div>
        )
        }
      </div>
    );
  }
}

