import PlayLists from './models/playlists';
import {types} from "mobx-state-tree";

describe('mobx state tree tests', () => {
    const initialState = {
        list: [],
        page: 0,
        tracks: []
    };
    const playlistStore = PlayLists.create(initialState);
    test('Playlists should be empty array upon store initalizing', () => {
        expect(playlistStore.list).toEqual([])
    });

    test('Playlist should have value after action', () => {
        expect(playlistStore.list).toEqual([]);
        const mockItems = [
            {
                name: 'playlist1',
                id: 'aaa',
                image: 'a',
                owner: ''
            }, {
                name: 'playlist2',
                id: 'aaa1',
                image: 'a',
                owner: ''
            }, {
                name: 'playlist3',
                id: 'aaa313',
                image: 'a',
                owner: ''
            },
        ];
        playlistStore.addList(mockItems);
        expect(playlistStore.list.length).toBe(3)
    });
    test('should increment page', () => {
        playlistStore.incrementPage();
        playlistStore.incrementPage();
        expect(playlistStore.page).toBe(2);
    })
    test('should load tracks', () => {
        const mockTracks = [{
            id: 'asdasd',
            name: 'track1',
            type: 'track',
        }, {
            id: 'as22dasd',
            name: 'track12',
            type: 'track',
        }, {
            id: 'asda111sd',
            name: 'track13',
            type: 'track',
        }];
        playlistStore.loadTracks(mockTracks);
        expect(playlistStore.tracks).toEqual(mockTracks);
        expect(playlistStore.tracks.length).toBe(3);
    })
});

