import React from 'react'
import {Avatar, ChannelPreview, useChatContext} from 'stream-chat-react';

const TeamChannelPreview = ({channel, type}) => {
const {channel:activeChannel, client} = useChatContext();   //used as hook here, we renamed channel of chat context here

const channelPreview  = () => (
    <p className="channel-preview__item">
        #{channel?.data?.name || channel?.data?.id}
        {/* here we need to access channels by channel.data.name -> here we used if hook, to be sure, we have channel first, then go with data and then search for name */}
        {/* if chat name is not there go access by ID */}
    </p>
);

//now create preview for direct msgs

// { -> this is the response we are getting from the end
//     '123': {}
//     '12wew3': {}
//     '12323': {}
//     '1ewds23': {}
// }
//instant return use (), if not then use {}
const DirectPreview = () => {
    const members = Object.values(channel.state.members).filter(({user})=>user.id!=client.userID);

//we need to filter members, but first destructure it and get user from there
  return (
   <div className="channel-preview__item single">
        <Avatar
            image={members[0]?.user?.image}
            name={members[0]?.user?.fullName}
            size={24}
            // in pixels size
        />
        <p>{members[0]?.user?.fullName}</p>
   </div>
  )
}

//now use components actually
return(
    <div className={
        channel?.id === activeChannel?.id
        ? 'channel-preview__wrapper__selected'
        : 'channel-preview__wrapper'
        // means it's not selected if id not match
    }
    //inside div add on clck property -> onclick we will select  the actual channel
    onClick={() => {
        console.log(channel);
    }}
    >
        {/* //inside div */}
        {type==='team' ? <ChannelPreview/> : <DirectPreview/>}
    </div>
);
}
export default TeamChannelPreview