import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import "./HomePage.css";

const HomePage = () => {

    const [bio, setBio] = useState(null);
    const [launches, setLaunches] = useState([]);

    useEffect(() => {
        const requestOne = axios.get(`https://api.spacexdata.com/v3/info`);
        const requestTwo = axios.get(`https://api.spacexdata.com/v3/launches/upcoming`);

        axios.all([requestOne, requestTwo])
            .then(
                axios.spread((...responses) => {
                    //console.log(responses[0].data, responses[1].data);
                    console.log(responses[1].data);
                    setBio(responses[0].data);
                    setLaunches(responses[1].data);
                })
            )
            .catch(errors => {
                console.error(errors);
            });
    }, []);

    return (

        <div className="container col-md-6 offset-md-3 homepage-box">
            {bio ?
                <>
                    <div className="bio-box">
                        <div className="title">{bio.name}</div>
                        <div className=""><b>CEO: </b>{bio.ceo}</div>
                        <div className=""><b>COO: </b>{bio.coo}</div>
                        <div className=""><b>CTO: </b>{bio.cto}</div>
                        <div className=""><b>Founded: </b>{bio.founded}</div>
                        <div className=""><b>No of Employess: </b>{bio.employees}</div>
                        <div className=""><b>Valuation: </b>${bio.valuation}</div>
                        <div className=""><b>Headquarters: </b>{bio.headquarters.address}, {bio.headquarters.city}, {bio.headquarters.state}</div>
                        <div className="site-links-box"> <b>Sites: </b>
                            <a className="site-link" href={bio.links.website}>SpaceX</a>
                            <a className="site-link" href={bio.links.flickr}>Flickr</a>
                            <a className="site-link" href={bio.links.twitter}>SpaceX's Twitter</a>
                            <a className="site-link" href={bio.links.elon_twitter}>CEO's Twitter</a>
                        </div>
                        <div className=""><b>Summary: </b>{bio.summary}</div>
                    </div>

                    <div>Upcoming Launches</div>
                    <div className="article-box-outer">{launches.map((elem, index) => (
                        <div key={index} className="card-box article-box">
                            <div className="card-body">
                                <div className="launch-details-top-box">
                                    <img className="details-image" height="100px" width="100px" src={elem.links.mission_patch_small} alt="IMG" />
                                    <Link className="title" to={`/launch/${elem.flight_number}`}>{elem.mission_name}</Link>
                                </div>
                                <div className="subtitle"><b>Launch Date: </b>{new Date(elem.launch_date_utc).toString()}</div>
                                <div className=""><b>Launch Site: </b>{elem.launch_site.site_name_long}</div>
                            </div>
                        </div>
                    ))}</div>

                </>
                :
                <div className="loading-box">Loading...</div>}
        </div>

    )
}


export default HomePage;