import React from 'react';
import Card from "@material-ui/core/Card/Card";
import * as Style from '../../App.module.scss';
import CardContent from "@material-ui/core/CardContent/CardContent";
import Typography from "@material-ui/core/Typography/Typography";
import useFetchTracks from '../../hooks/useFetchTracks'
import {inject, observer} from "mobx-react";

const Artists = (props) => {
    const {PlayListsState} = props;
    const [loading, error] = useFetchTracks(PlayListsState, props.match.params.code)
    return (
        <div className={Style.cardWrapper}>
            {
                PlayListsState.tracks.map(item => {
                    return (
                        <Card className={Style.card} key={item.id}>
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="h2">
                                    {item.name}
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    {item.type}
                                </Typography>
                            </CardContent>
                        </Card>
                    )
                })
            }

        </div>

    );
};

export default inject('PlayListsState')(observer(Artists));
