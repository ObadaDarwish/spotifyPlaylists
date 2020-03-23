
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

describe('fetchTracks', () => {
    var mock = new MockAdapter(axios);
    const data = {
        items: [{
            track: {name: 'test1', type: 'track', id: '111', images: [{height: 0, url: 'url', width: 0}]},
        }, {
            track: {name: 'test2', type: 'track', id: '123', images: [{height: 0, url: 'url', width: 0}]}
        }, {track: {name: 'test3', type: 'track', id: '124', images: [{height: 0, url: 'url', width: 0}]}}]
    };
    const err = {
        code: 500,
        message: 'Failed to fetch data'
    };
    it('returns tracks when page is loaded', () => {

        mock.onGet(`https://api.spotify.com/v1/browse/featured-playlists?country=SE&limit=30`).reply(200, data);


        axios.get(`https://api.spotify.com/v1/browse/featured-playlists?country=SE&limit=30`).then(res => {
            expect(res.data).toEqual(data);
            expect(res.data.items.length).toBe(3);
        })
    });
    it('Failed to retrieve data', () => {

        mock.onGet(`https://api.spotify.com/v1/browse/featured-playlists?country=SE&limit=30`).reply(500, err);


        axios.get(`https://api.spotify.com/v1/browse/featured-playlists?country=SE&limit=30`).catch(error => {
            expect(error.response.data).toEqual(err);
            expect(error.response.status).toBe(500)
        })
    });
});
