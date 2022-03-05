import React from "react"
const ConnectXPlayer=(props)=>
{
    const id=props.id;
    const allPlayerData=props.allPlayerData;
    const setAllPlayerData=props.setAllPlayerData;
    const playerData=allPlayerData[id];

    return <div className="ConnectXPlayer">
        <h2>Player {id+1}</h2>
        <form>
            <h3>Name:</h3>
            <input type="text" placeholder="Name" value={playerData.name} onChange={(event)=>
            {
                const temp=[...allPlayerData];
                temp[id]=
                {
                    name:event.target.value,
                    color:temp[id].color,
                    wins:temp[id].wins,
                    level:temp[id].level
                }
                setAllPlayerData(temp);
            }}></input>
            <h3>Color: 
            </h3><div className="sampler" style=
            {
                {
                    backgroundColor:`rgb(
                        ${playerData.color.r},
                        ${playerData.color.g},
                        ${playerData.color.b}
                    )`,
                    height:0,
                    width:0,
                    padding:10,
                    border:"2px solid rgb(0,0,0)",
                    borderRadius:20
                }
            }></div>
            <div className="colorBox">

                R:<input type="range" value={playerData.color.r} min="0" max="255" onChange={(event)=>
                {
                    const temp=[...allPlayerData];
                    temp[id]=
                    {
                        name:temp[id].name,
                        color:
                        {
                            r:event.target.value,
                            g:temp[id].color.g,
                            b:temp[id].color.b,
                        },
                        wins:temp[id].wins,
                        level:temp[id].level
                    }
                    setAllPlayerData(temp);
                }}></input>
                G:<input type="range" value={playerData.color.g} min="0" max="255" onChange={(event)=>
                {
                    const temp=[...allPlayerData];
                    temp[id]=
                    {
                        name:temp[id].name,
                        color:
                        {
                            r:temp[id].color.r,
                            g:event.target.value,
                            b:temp[id].color.b,
                        },
                        wins:temp[id].wins,
                        level:temp[id].level
                    }
                    setAllPlayerData(temp);
                }}></input>
                B:<input type="range" value={playerData.color.b} min="0" max="255" onChange={(event)=>
                {
                    const temp=[...allPlayerData];
                    temp[id]=
                    {
                        name:temp[id].name,
                        color:
                        {
                            r:temp[id].color.r,
                            g:temp[id].color.g,
                            b:event.target.value,
                        },
                        wins:temp[id].wins,
                        level:temp[id].level
                    }
                    setAllPlayerData(temp);
                }}></input>
            </div>

            <h3>Level:</h3>
            <input type="number" placeholder="Level" value={playerData.level} onChange={(event)=>
            {
                const temp=[...allPlayerData];
                temp[id]=
                {
                    name:temp[id].name,
                    color:temp[id].color,
                    wins:temp[id].wins,
                    level:Number(event.target.value)
                }
                setAllPlayerData(temp);
            }}></input>
        </form>
    </div>
}

export default ConnectXPlayer;