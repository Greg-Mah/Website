import React, { useEffect, useState } from "react"
import ConnectXBoard from "./connectXBoard";
import ConnectXForm from "./connectXForm";
import ConnectXPlayers from "./connectXPlayers";
import "./connectXStyle.css";

const ConnectX=()=>
{
    const [gameboard,setGameboard]=useState([[-1]]);//2d array of connectX board for calculations
    const [height,setHeight]=useState(6);//height of gameboard
    const [width,setWidth]=useState(7);//width of gameboard
    const [winNumber,setWinNumber]=useState(4);//number in a row needed to win
    const [numPlayers,setNumPlayers]=useState(2);//number of players in the game
    const [allPlayerData,setAllPlayerData]=useState([]);//data for all of the players in a game
    const [gamePhase,setGamePhase]=useState(2);//current state of the game 0 board setup, 1 player setup, 2 playing the game

    const numPhases=3;

    useEffect(()=>
    {
        const additionalPlayers=Array.apply(null,Array(numPlayers-2)).map(()=>
        {
            return {
                name:"",
                color:
                {
                    r:0,
                    g:0,
                    b:0
                },
                wins:0,
                level:0
            }
        });
        setAllPlayerData(
            [
                {
                    name:"",
                    color:
                    {
                        r:255,
                        g:0,
                        b:0
                    },
                    wins:0,
                    level:0
                },
                {
                    name:"",
                    color:
                    {
                        r:255,
                        g:255,
                        b:0
                    },
                    wins:0,
                    level:0
                },
                ...additionalPlayers
            ]
        );
    },[numPlayers]);    

    useEffect(()=>
    {
        resetBoard();
    },[height,width]);

    const resetBoard=()=>
    {
        setGameboard(Array.apply(null,Array(height)).map(()=>
        {
            return Array.apply(null,Array(width)).map(()=>
            {
                return -1;
            });
        }));
    }

    const phaseSwitch=()=>
    {
            switch (gamePhase) 
            {
                case 1:
                    return <ConnectXPlayers allPlayerData={allPlayerData} setAllPlayerData={setAllPlayerData}>
                    </ConnectXPlayers>;
                case 2:
                    return gameboard!==undefined//check if gameboard data is there before rendering
                    &&gameboard[0]!==undefined
                    &&gameboard[0][0]!==undefined
                    ?<ConnectXBoard gameboard={gameboard} setGameboard={setGameboard} numPlayers={numPlayers} allPlayerData={allPlayerData} height={height} width={width} winNumber={winNumber} resetBoard={resetBoard}>
                    </ConnectXBoard>
                    :null;
                default:
                    return <ConnectXForm height={height} setHeight={setHeight}
                    width={width} setWidth={setWidth}
                    winNumber={winNumber} setWinNumber={setWinNumber}
                    numPlayers={numPlayers} setNumPlayers={setNumPlayers}
                    ></ConnectXForm>;
            }
    }

    return <div className="ConnectX">
        {
            phaseSwitch()
        }
        <div className="PhaseDiv">
            {gamePhase!==0?<button className="PhaseButton" onClick={()=>
            {
                setGamePhase(0);
            }}>Game Setup</button>:null}
            {gamePhase!==1?<button className="PhaseButton" onClick={()=>
            {
                setGamePhase(1);
            }}>Player Setup</button>:null}
            {gamePhase!==2?<button className="PhaseButton" onClick={()=>
            {
                setGamePhase(2);
            }}>Play Game</button>:null}
            <button className="PhaseButton" onClick={()=>
            {
                setGamePhase((gamePhase+numPhases-1)%numPhases);
            }}>Previous</button>
            <button className="PhaseButton" onClick={()=>
            {
                setGamePhase((gamePhase+1)%numPhases);
            }}>Next</button>            
        </div>
    </div>;
}

export default ConnectX;