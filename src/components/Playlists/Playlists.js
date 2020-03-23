import React, {useEffect, useRef} from 'react';
import {inject, observer} from 'mobx-react';
import UseFetchPlaylists from "../../hooks/useFetchPlaylists";
import * as Style from '../../App.module.scss';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import {NavLink} from 'react-router-dom';

const Playlists = (props) => {
    const {PlayListsState} = props;
    const [loading, error] = UseFetchPlaylists(PlayListsState, PlayListsState.page);
    const wrapperRef = useRef();
    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
    }, []);
    const handleScroll = () => {
        if (Math.ceil(window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
            if (PlayListsState.page <= 3)
                PlayListsState.incrementPage();
        }
    };

    return (
        <div ref={wrapperRef} className={Style.cardWrapper}>
            {
                PlayListsState.list.map(item => {
                    return (
                        <NavLink key={item.id} to={`/playlist/${item.name}/${item.id}`}>
                            <Card className={Style.card}>
                                <CardMedia
                                    className={Style.media}
                                    image={item.image}
                                    title="Contemplative Reptile"
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        {item.name}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        {item.owner}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </NavLink>
                    )
                })
            }
            {loading && <h1>Loading...</h1>}
            {error && <h1>{error}</h1>}
        </div>
    );
};

export default inject('PlayListsState')(observer(Playlists));
