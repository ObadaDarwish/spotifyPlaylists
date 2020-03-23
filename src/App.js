import React from 'react';
import Playlists from './components/Playlists/Playlists'
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Artists from "./components/Artists/Artists";

const App = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path='/' exact component={Playlists}/>
                <Route path='/playlist/:name/:code' exact component={Artists}/>
            </Switch>
        </BrowserRouter>
    );
};

export default App;
