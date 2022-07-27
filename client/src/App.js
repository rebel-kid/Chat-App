import React from 'react';
import {StreamChat} from 'stream-chat';
import {Chat} from 'stream-chat-react';
import {Cookies} from 'universal-cookie';
import { ChannelListContainer, ChannelContainer,Auth } from './components';
import './App.css';

//set API key to acess stream
const API_Key = 'eqg3dgtgcpps';

const client = StreamChat.getInstance(API_Key);//we need to create instance to be passed in Stream chat

const authToken = false;  //when we actually login, then only true

const App = () => {

  if(!authToken) return <Auth/> 
// hide everything if still not logged in, in else 
  return (
    <div className="app__wrapper">
        <Chat client={client} theme="team light">
            <ChannelListContainer/>
            <ChannelContainer/>

        </Chat>
    </div>
  )
}

export default App