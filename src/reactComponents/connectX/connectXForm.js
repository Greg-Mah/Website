import React from "react"

const ConnectXForm=(props)=>
{
    const height=props.height;
    const setHeight=props.setHeight;
    const width=props.width;
    const setWidth=props.setWidth;
    const winNumber=props.winNumber;
    const setWinNumber=props.setWinNumber;
    const numPlayers=props.numPlayers;
    const setNumPlayers=props.setNumPlayers


    return <div className="ConnectXForm">
        <form>
            <h3>Height:</h3>
            <input type="number" value={height} onChange={(event)=>
            {
                setHeight(Number(event.target.value));
            }}></input>

            <h3>Width:</h3>
            <input type="number" value={width} onChange={(event)=>
            {
                setWidth(Number(event.target.value));
            }}></input>

            <h3>Win Number:</h3>
            <input type="number" value={winNumber} onChange={(event)=>
            {
                setWinNumber(Number(event.target.value));
            }}></input>

            <h3>Number of Players:</h3>
            <input type="number" value={numPlayers} onChange={(event)=>
            {
                setNumPlayers(Number(event.target.value));
            }}></input>
        </form>
    </div>
}

export default ConnectXForm;