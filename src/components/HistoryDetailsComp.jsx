import React, { useEffect, useState } from 'react';
//import {Link} from 'react-router-dom';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import "./HistoryDetailsComp.css";


const HistoryDetailsComp = () => {

    const [event, setEvent] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        let cancelRequest;
        axios({
            method: 'GET',
            url: `https://api.spacexdata.com/v3/history/${id}`,
            cancelToken: new axios.CancelToken(c => cancelRequest = c)
        })
            .then((res) => {
                //console.log(res.data);
                setEvent(res.data);
            })
            .catch((error) => {
                console.log(error)
                if (axios.isCancel(error)) return;
            });
        return () => cancelRequest();
    }, [id]);

    return (

        <div className="container col-md-6 offset-md-3 details-box">
            {event ?
                <div className="card-box article-details-box">
                    <div className="card-body">
                        <p className="card-title article-details-title">{event.title}</p>
                        <p className="card-subtitle text-muted">{new Date(event.event_date_utc).toString()}</p>
                        <div className="site-links-box"> <b>Sites: </b>
                            <a className="site-link" href={event.links.article}>SpaceX</a>
                            <a className="site-link" href={event.links.wikipedia}>Wikipedia</a>
                        </div>
                        <p className="card-text"> {event.details} </p>
                    </div>
                </div>
                :
                <div className="loading-box">Loading...</div>}
        </div>

    )
}

export default HistoryDetailsComp;