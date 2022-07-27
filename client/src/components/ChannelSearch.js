import React,{useState, useEffect} from 'react';
import {useChatContext} from 'stream-chat-react';
import {SearchIcon} from '../assets';

const ChannelSearch = () => {

    const [query, setQuery] = useState("");
    const [loading, setLoading] = useState(false);

    //get channels will be async as we need to fetch channels
    const getChannels = async (text) => {
        try {
            //TODO: fetch channels
        } catch (error) {
            setQuery('');   //we have error, means failure so we mae null to ->reset the query for new search
        }
    }
    const onSearch = (event) => {
        event.preventDefault(); //prevents reloading
        setLoading(true);   //as some event comes, loading on
        setQuery(event.target.value);
        getChannels(event.target.value);    //this will get channels based on query
    }

  return (
    <div className="channel-search__container">
        <div className="channel-search__input__wrapper">
            <div className="channel-search__input__icon">
                <SearchIcon/>
                {/* SVG icon self closing */}
            </div>
            <input type="text" 
            className="channel-search__input__text" 
            placeholder="Search"
            value={query}
            onChange={onSearch}
            />
        </div>
    </div>
  )
}

export default ChannelSearch