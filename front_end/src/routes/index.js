  
import React from 'react';
import { BrowserRouter, Router, Switch} from 'react-router-dom';
import  Menu from '../pages/Menu/menu';
import Login from '../pages/Login/index';
import Route from './Route';
import Cadastro from '../pages/Cadastro/index';


export default function Routes() {
    return (
        <BrowserRouter>
        <Switch>
           <Route  path="/login" component={Login} />
           <Route path="/cadastro" component={Cadastro}/>
           <Route path="/menu" component={Menu}/>
           <> 
              <Route  path="/" component={Login} />
           </>
           <>
            </>
        </Switch>
     </BrowserRouter>

    );
}