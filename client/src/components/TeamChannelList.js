import React from 'react'
import {AddChannel} from '../assets';
const TeamChannelList = ({children, error=false,loading,type}) => {   //here type will tell whether chat is group chat or personal chat
    if(error){
        return type==='team' ?(
                <div className="team-channel-list">
                    <p className="team-channel-list__message">
                        Connection error, please wait a moment and try again.
                    </p>
                </div>
        ) : null;   //if chat is group then return jsx, if not then null
    }

    //loading part
    if(loading){
        return(
            <div className="team-channel-list">
                <p className="team-channel-list__message loading">
                    {type=== 'team' ? 'Channels' : 'Messages'} loading...
                </p>
            </div>
        )
    }
  return (
    <div className="team-channel-list">
        <div className="team-channel-list__header">
            <p className="team-channel-list__header__title">
            {type=== 'team' ? 'Channels' : 'Direct Messages'}
            </p>
            {/* Add btn for channel */}
        </div>
        {children}
    </div>
  )
}

export default TeamChannelList