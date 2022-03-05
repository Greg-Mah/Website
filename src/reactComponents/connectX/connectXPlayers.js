import React from "react"
import ConnectXPlayer from "./connectXPlayer";

const ConnectXPlayers=(props)=>
{
    const allPlayerData=props.allPlayerData;
    const setAllPlayerData=props.setAllPlayerData;
    
    return <div className="ConnectXPlayers">
        {allPlayerData.map((_,idx)=>
        {
            return <ConnectXPlayer key={idx} id={idx} allPlayerData={allPlayerData} setAllPlayerData={setAllPlayerData}></ConnectXPlayer>
        })}
    </div>
}

export default ConnectXPlayers;