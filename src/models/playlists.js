import {types} from 'mobx-state-tree';
import Playlist from './playlist'
import Track from './track'

const PlayLists = types.model('PlayLists', {
    list: types.optional(types.array(Playlist), []),
    page: types.optional(types.number, 0),
    tracks: types.optional(types.array(Track), [])
}).actions(self => (
    {
        concatItems(items) {
            self.list = self.list.concat(items);
        },
        incrementPage() {
            self.page = self.page + 1;
        },
        loadTracks(tracks) {
            self.tracks = tracks
        }
    }
));
export default PlayLists
