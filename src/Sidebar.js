import React, { useEffect, useState } from 'react'
import './Sidebar.css'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AddIcon from '@material-ui/icons/Add';
import SidebarChannel from './SidebarChannel';
import SignalCellular0BarIcon from '@material-ui/icons/SignalCellular0Bar';
import { Call, HeadsetMic, Info, MicNoneOutlined, Settings } from '@material-ui/icons';
import { Avatar } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { selectUser } from './features/userSlice';
import db, { auth } from './Firebase';

function Sidebar() {
    const user = useSelector(selectUser);
    const [channels, setChannels] = useState([]);
    useEffect(() => {

        db.collection('channels').onSnapshot((snapshot) => (
            setChannels(
                snapshot.docs.map(doc => ({
                    id: doc.id,
                    channel: doc.data()
                })
                )
            )
        )
        )
    }, [])
    const handleAddChannel = () => {
        const channelName = prompt("Enter a new channel name");
        if (channelName) {
            db.collection("channels").add({
                channelName: channelName,
            })
        }
    }
    console.log("channels nam" + channels.channel);
    return (

        <div className="sidebar">
            <div className="sidebar__top">
                Oshaba Samson
                <ExpandMoreIcon />
            </div>
            <div className="sidebar_channels">
                <div className="sidebar__channelsHeader">
                    <div className="sidebar__header">
                        <ExpandMoreIcon />
                        <h4>Text Channels</h4>
                    </div>
                    <AddIcon onClick={handleAddChannel} className="sidebar__addChannel" />
                </div>
                <div className="sidebar__channelsList">
                    {channels.map(({ channel, id }) => (
                        <SidebarChannel
                            key={id}
                            id={id}
                            channelName={channel.channelName}
                        />
                    ))}
                </div>
            </div>
            <div className="sidbar__voice">
                <SignalCellular0BarIcon className="sidebar_voiceIcon" fontSize="large" />
                <div className="sidebar_voiceInfo">
                    <h3>Voice Connected</h3>
                    <p>Stream</p>
                </div>
                <div className="sidebar__voiceIcon">
                    <Call />
                    <Info />
                </div>
            </div>
            <div className="sidebar__profile">
                <Avatar onClick={() => auth.signOut()} src={user.photo} />
                <div className="sidebar__profileInfo">
                    <h3>@sssangha</h3>
                    <p>@thisismyid</p>
                </div>
                <div className="sidebar__profileIcons">
                    <MicNoneOutlined />
                    <HeadsetMic />
                    <Settings />
                </div>
            </div>
        </div>
    )
}

export default Sidebar
