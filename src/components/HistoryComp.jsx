import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const HistoryComp = () => {

    const [eventsDefault, setEventsDefault] = useState([]);
    const [events, setEvents] = useState([]);
    const [search, setSearch] = useState("");

    const handleSearch = (searchValue) => {
        const filteredElems = eventsDefault.filter(elem => {
            return elem.title.toLowerCase().includes(searchValue.toLowerCase())
        })
        setSearch(searchValue);
        setEvents(filteredElems);
    }

    useEffect(() => {
        let cancelRequest;
        axios({
            method: 'GET',
            url: `https://api.spacexdata.com/v3/history`,
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

        <div className="container col-md-6 offset-md-3 history-box">
            <div className="search-box input-group">
                <input type="text" className="form-control" placeholder="Search history of SpaceX" value={search}
                    onChange={(e) => handleSearch(e.target.value)} />
            </div>

            {(events.length === 0) && <p className="loading-box">Loading</p>}

            <div className="article-box-outer">{events.map((elem, index) => (
                <div key={index} className="card-box article-box">
                    <div className="card-body">
                        <Link className="article-title" to={`/history/${elem.id}`}>{elem.title}</Link>
                        <h6 className="article-subtitle">{new Date(elem.event_date_utc).toString()}</h6>
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

export default HistoryComp;