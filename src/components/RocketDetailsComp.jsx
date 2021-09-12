import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import "./RocketDetailsComp.css";


const RocketDetailsComp = () => {

    const [rocket, setEvent] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        let cancelRequest;
        axios({
            method: 'GET',
            url: `https://api.spacexdata.com/v3/rockets/${id}`,
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

        <div className="container col-md-6 offset-md-3 rocket-details-box">
            {rocket ?
                <div className="card-box">
                        <div className="rocket-details-top-box">
                            <a className="" href={rocket.wikipedia} target="_blank" rel="noreferrer"><div className="rocket-details-title">{rocket.rocket_name}</div></a>
                            <img src={rocket.flickr_images[0]} className="card-img-top rocket-details-image" alt="..." />
                        </div>
                        <div className="rocket-subtitle"><b>First Flight:</b> {new Date(rocket.first_flight).toString()}</div>
                        <div className="card-text">{rocket.active ? <div className="active"><b>Status: </b>Active</div> : <div className="inactive"><b>Status: </b>Inactive</div>}
                            <b>Country:</b> {rocket.country}<br />
                            <b>Company:</b> {rocket.company}<br />
                            <b>Height:</b> {rocket.height.meters} Meters/{rocket.height.feet} Feet<br />
                            <b>Diameter:</b> {rocket.diameter.meters} Meters/{rocket.diameter.feet} Feet<br />
                            <b>Mass:</b> {rocket.mass.kg} KG/{rocket.mass.lb} Pounds<br />
                            <b>Engine Number:</b> {rocket.engines.number}<br />
                            <b>Engine Type:</b> {rocket.engines.type}
                        </div>
                        <div className="card-text"> {rocket.description} </div>
                </div>
                :
                <div className="loading-box">Loading...</div>}
        </div>

    )
}


export default RocketDetailsComp;