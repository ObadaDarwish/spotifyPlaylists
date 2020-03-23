import axios from 'axios';
import {headers} from '../axios/headers'
import {useEffect, useState} from 'react'


const UseFetchTracks = (state, playlist_id) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    useEffect(() => {
        let abort = false;
        setLoading(true);
        const getTracks = async () => {
            try {
                let dummyTrack = {
                    id: 'dummyID',
                    name: 'dummyName',
                    type: 'dummyType'
                }
                let fetchedArtists = await axios.get(`https://api.spotify.com/v1/playlists/${playlist_id}/tracks`, {headers: headers});
                const {items} = fetchedArtists.data;
                let itemsList = items.map(item => item.track ? getItem(item) : dummyTrack);
                if (!abort) {
                    let sortedTracks = itemsList.sort(function (trackA, trackB) {
                        const TrackA = trackA.name.toUpperCase();
                        const TrackB = trackB.name.toUpperCase();
                        if (TrackA > TrackB)
                            return 1
                        if (TrackA < TrackB)
                            return -1
                        return 0
                    });
                    state.loadTracks(sortedTracks);
                }

            }
            catch (e) {
                setError(e.response.data.error.message)
            } finally {
                setLoading(false);
            }

        };

        getTracks();

        return () => {
            abort = true;
        }

    }, []);


    return [loading, error];
};

const getItem = ({track}) => {
    return {
        id: track.id,
        name: track.name,
        type: track.type
    }
};

export default UseFetchTracks;
