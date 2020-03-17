import axios from 'axios';
import {headers} from '../axios/headers'
import {useEffect, useState} from 'react'

const mockPlaylistsPagination = ['SE', 'US', 'CA','FR','PL'];

const UseFetchPlaylists = (state, page) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    useEffect(() => {
        let abort = false;
        setLoading(true);
        const getPlayList = async () => {
            try {
                let fetchPlaylists = await axios.get(`https://api.spotify.com/v1/browse/featured-playlists?country=${mockPlaylistsPagination[page]}&limit=30`, {headers: headers});

                const {playlists} = fetchPlaylists.data;
                let items = playlists.items.map(item => getItem(item));
                if (!abort)
                    state.concatItems(items);
            }
            catch (e) {
                setError(e.response.data.error.message)
            } finally {
                setLoading(false);
            }

        };

        getPlayList();

        return () => {
            abort = true;
        }

    }, [page]);


    return [loading, error];
};

const getItem = (item) => {
    return {
        name: item.name,
        id: item.id,
        image: item.images[0].url,
        owner: item.owner.display_name
    }
};

export default UseFetchPlaylists;
