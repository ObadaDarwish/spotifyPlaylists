import {types} from 'mobx-state-tree';


const PlayList = types.model({
    id: types.string,
    image: types.string,
    name: types.string,
    owner: types.string
});


export default PlayList;
