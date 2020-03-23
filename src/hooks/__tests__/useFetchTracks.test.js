import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

describe('fetchTracks', () => {
    var mock = new MockAdapter(axios);
    const data = {
        items: [{
            track: {name: 'test1', type: 'track', id: '111'},
        }, {
            track: {name: 'test2', type: 'track', id: '123'}
        }, {track: {name: 'test3', type: 'track', id: '124'}}]
    };
    const error = {
        code: 500,
        message: 'Can not retrieve data'
    };
    it('returns tracks when page is loaded successfully', () => {
        mock.onGet(`https://api.spotify.com/v1/playlists/37i9dQZF1DXcecv7ESbOPu/tracks`).reply(200, data);
        axios.get(`https://api.spotify.com/v1/playlists/37i9dQZF1DXcecv7ESbOPu/tracks`).then(res => {
            expect(res.data).toEqual(data);
            expect(res.data.items.length).toBe(3);
        })
    });
    it('return error when fails loading', () => {
        mock.onGet(`https://api.spotify.com/v1/playlists/37i9dQZF1DXcecv7ESbOPu/tracks`).reply(500, error);
        axios.get(`https://api.spotify.com/v1/playlists/37i9dQZF1DXcecv7ESbOPu/tracks`).catch(err => {
            expect(err.message).toBe("Request failed with status code 500")
            expect(err.response.data.message).toBe("Can not retrieve data")
        })
    })
    it('should test connection drop', () => {
        mock.onGet(`https://api.spotify.com/v1/playlists/37i9dQZF1DXcecv7ESbOPu/tracks`).networkError();
        axios.get(`https://api.spotify.com/v1/playlists/37i9dQZF1DXcecv7ESbOPu/tracks`).catch(err => {
            expect(err.message).toBe("Network Error")
        })
    })
});
