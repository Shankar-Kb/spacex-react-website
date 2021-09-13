import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const LaunchesComp = () => {

    const [eventsDefault, setEventsDefault] = useState([]);
    const [events, setEvents] = useState([]);
    const [search, setSearch] = useState("");

    const handleSearch = (searchValue) => {
        const filteredElems = eventsDefault.filter(elem => {
            return elem.mission_name.toLowerCase().includes(searchValue.toLowerCase())
        })
        setSearch(searchValue);
        setEvents(filteredElems);
    }

    useEffect(() => {
        let cancelRequest;
        axios({
            method: 'GET',
            url: `https://api.spacexdata.com/v3/launches`,
            cancelToken: new axios.CancelToken(c => cancelRequest = c)
        })
            .then((res) => {
                //console.log(res.data);
                setEvents(res.data);
                setEventsDefault(res.data);
            })
            .catch((error) => {
                console.log(error)
                if (axios.isCancel(error)) return;
            });
        return () => cancelRequest();
    }, []);

    return (

        <div className="container col-md-6 offset-md-3 launch-box">
            <div className="search-box input-group">
                <input type="text" className="form-control" placeholder="Search launches of SpaceX" value={search}
                    onChange={(e) => handleSearch(e.target.value)} />
            </div>

            {(events.length === 0) && <p className="loading-box">Loading</p>}

            <div className="article-box-outer">{events.map((elem, index) => (
                <div key={index} className="card-box article-box">
                    <div className="card-body">
                        <Link className="article-title" to={`/launch/${elem.flight_number}`}>{elem.mission_name}</Link>
                        <h6 className="article-subtitle">{new Date(elem.launch_date_utc).toString()}</h6>
                        <h6 className="article-content"><b>Rocket Name: </b>{elem.rocket.rocket_name}</h6>
                        <h6 className="article-content"><b>Rocket Type: </b>{elem.rocket.rocket_type}</h6>
                        <div className="site-links-box"> <b>Sites: </b>
                            <a className="site-link" href={elem.links.article}>SpaceX</a>
                            <a className="site-link" href={elem.links.article}>Wikipedia</a>
                        </div>
                    </div>
                </div>
            ))}</div>
        </div>

    )
}

export default LaunchesComp;