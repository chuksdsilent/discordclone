import React from 'react'
import { useDispatch } from 'react-redux';
import './sidebarchannel.css'
import { setChannelInfo } from "./features/appSlice";


function SidebarChannel({ id, channelName }) {
    const dispatch = useDispatch();
    console.log("channel name is" + channelName);
    return (
        <div className="sidebarChannel"
            onClick={() =>
                dispatch(
                    setChannelInfo({
                        channelId: id,
                        channelName
                    })
                )

            }
        >
            <h4>
                <span>
                    <span className="sidebarChannel__hash">#</span>
                    {channelName}
                </span>
            </h4>
        </div >
    )
}

export default SidebarChannel
