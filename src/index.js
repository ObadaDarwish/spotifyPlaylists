import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import PlayLists from './models/playlists';
import {Provider} from 'mobx-react';
// import {Provider} from './context/context'
import {onPatch} from "mobx-state-tree";
import makeInspectable from "mobx-devtools-mst";

const PlayListsState = PlayLists.create();
onPatch(PlayListsState, patch => {
    // console.log(patch); // writes in console.log every changes in the state
});
makeInspectable(PlayListsState); // MST dev tools
ReactDOM.render(
    <Provider PlayListsState={PlayListsState}>
        <App/>
    </Provider>, document.getElementById('root'));

// If you want your ap p to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
