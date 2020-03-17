import {types} from 'mobx-state-tree';


const Track = types.model({
    id: types.string,
    name: types.string,
    type: types.string,
});


export default Track;
