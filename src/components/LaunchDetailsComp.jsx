import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import "./LaunchDetailsComp.css";


const LaunchDetailsComp = () => {

    const [launch, setEvent] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        let cancelRequest;
        axios({
            method: 'GET',
            url: `https://api.spacexdata.com/v3/launches/${id}`,
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

        <div className="container col-md-6 offset-md-3 launch-details-box">
            {launch ?
                <div className="card-box">
                    <div className="launch-details-top-box">
                        <img className="details-image" height="150px" width="150px" src={launch.links.mission_patch_small} alt="IMG" />
                        <a className="" href={launch.links.wikipedia} target="_blank" rel="noreferrer"><p className="launch-details-title">{launch.mission_name}</p></a>
                    </div>

                    <div className="launch-subtitle">{new Date(launch.launch_date_utc).toString()}</div>
                    <div className="site-links-box"> <b>Sites: </b>
                        <a className="site-link" href={launch.links.article_link}>SpaceX</a>
                        <a className="site-link" href={launch.links.wikipedia}>Wikipedia</a>
                        <a className="site-link" href={launch.links.video_link}>Youtube</a>
                    </div>
                    <div className="category-box"> <b>Rocket Section: </b>
                        <b>Rocket ID:</b> {launch.rocket.rocket_id}<br />
                        <b>Rocket Name:</b> {launch.rocket.rocket_name}<br />
                        <b>Rocket Type:</b> {launch.rocket.rocket_type}
                    </div>
                    <div className=""> {launch.details} </div>
                </div>
                :
                <div className="loading-box">Loading...</div>}
        </div>

    )
}

export default LaunchDetailsComp;