import React, { useEffect, useState } from "react";
import ConnectXNode from "./connectXNode";

const ConnectXBoard=(props)=>
{
    const boardHeight=props.height;
    const boardWidth=props.width;
    const gameboard=props.gameboard;
    const setGameboard=props.setGameboard;
    const numPlayers=props.numPlayers;
    const allPlayerData=props.allPlayerData;
    const winNumber=props.winNumber;
    const resetBoard=props.resetBoard;

    const [playerTurn,setPlayerTurn]=useState(0);
    const [pieceSize,setPieceSize]=useState(0);
    const [message,setMessage]=useState('Connect X Game');
    const [windowSize,setWindowSize]=useState(
    {
        innerHeight:window.innerHeight,
        innerWidth:window.innerWidth
    });

    useEffect(()=>//listen for window resizing
    {
        window.addEventListener('resize',()=>
        {
            setWindowSize(
            {
                innerHeight:window.innerHeight,
                innerWidth:window.innerWidth
            });
        })
    },[]);

    useEffect(()=>//calculate the sizes of the pieces
    {
        const heightRatio=windowSize.innerHeight/boardHeight;//ratio of screen size to spaces vertically
        const widthRatio=windowSize.innerWidth/boardWidth;//ratio of screen size to spaces horizontally
        if(heightRatio>=widthRatio)
        {
            setPieceSize(widthRatio/2);
        }
        else
        {
            setPieceSize(heightRatio/2);
        }
    },[boardHeight,boardWidth,windowSize]);

    useEffect(()=>
    {
        const startTurn=getRandom(numPlayers-1);
        setPlayerTurn(startTurn);
        setMessage(getTurnMessage(startTurn));
    },[]);

    //random generator from min to max value
    const getRandom=(max,min)=>
    {
        max=max ?? 0;
        min=min ?? 0;
        if(max<min)//if max is smaller than min invalid input
        {
            return 0;
        }
        return (Math.floor(Math.random()*(max-min+1)))+min;
    }

    //create a turn message for the current player turn
    const getTurnMessage=(playerId)=>
    {
        return `${allPlayerData[playerId].name?allPlayerData[playerId].name:"Player "+(playerId+1)}'s turn.`;    
    }

    const pieceDrop=(col)=>//find out where piece will go in column vertically
    {
        let row=0;
        while(row<boardHeight&&gameboard[row][col]!==-1)
        {
            row++;
        }
        if(row>=boardHeight)
        {
            setMessage("The column is full please choose another one");
            return -1;
        }
        else
        {
            return row;
        }
    }

    const placePiece=async(row,col)=>
    {   if(row>=0
        &&row<=boardHeight
        &&col>=0
        &&col<=boardWidth)//if in board indexes
        {
            if(gameboard[row][col]===-1)//empty spot
            {
                const temp=[...gameboard];//rebuild board so react updates it
                temp[row][col]=playerTurn;
                setGameboard(temp);
                if(pieceCheck([playerTurn],row,col)>=winNumber)
                {
                    setMessage(`${allPlayerData[playerTurn].name?allPlayerData[playerTurn].name:"Player "+(playerTurn+1)} wins!`);
                    setPlayerTurn(-1);
                }
                else
                {
                    const nextPlayer=(playerTurn+1)%allPlayerData.length;
                    setMessage(getTurnMessage(nextPlayer));
                    setPlayerTurn(nextPlayer);//next players turn
                }
            }
            else
            {
                setMessage("Attempting to place in piece in already filled space.");
                //filled space message
            }    
        }
    }

    const pieceCheck=(playersArray,row,col)=>//check around a piece to determine what the max value of a piece at this point will score
    {
        let diagonalUpLine=1,//down left to up right
        diagonalDownLine=1,//down right to top left
        verticalLine=1,//top to bottom
        horizontalLine=1;//left to right
        for(let vertical=-1;vertical<=1;vertical++)//for every vertical direction
        {
            for(let horizontal=-1;horizontal<=1;horizontal++)//for every horizontal direction
            {
                if(!(horizontal===0&&(vertical===0||vertical===1)))//only check in valid directions
                {
                    if(horizontal===0)//line has to be vertical if no horizontal
                    {
                        verticalLine+=lineCheck(playersArray,row,col,horizontal,vertical);
                    }
                    else if(vertical===0)//line has to be horizontal if no vertical
                    {
                        horizontalLine+=lineCheck(playersArray,row,col,horizontal,vertical);
                    }
                    else if(horizontal*vertical===1)//line is diagonal up if vertical and horizontal match direction
                    {
                        diagonalUpLine+=lineCheck(playersArray,row,col,horizontal,vertical);
                    }
                    else//line is diagonal down if vertical and horizontal are diffrent signs
                    {
                        diagonalDownLine+=lineCheck(playersArray,row,col,horizontal,vertical);
                    }
                }
            }
        }
        let max=1;//find max value of lines
        if(diagonalUpLine>max)
        {
            max=diagonalUpLine;
        }
        if(diagonalDownLine>max)
        {
            max=diagonalDownLine;
        }
        if(horizontalLine>max)
        {
            max=horizontalLine;
        }
        if(verticalLine>max)
        {
            max=verticalLine;
        }
        return max;
    }

    const lineCheck=(playersArray,row,col,horizontal,vertical)=>
    {
        if(horizontal===0&&vertical===0)//if we dont shift anywhere just return 0
        {
            return 0;
        }
        let length=0;
        let currentRow=row;//start where in array that the point is
        let currentCol=col;
        currentRow+=vertical;//shift once to start
        currentCol+=horizontal;
        while(currentRow>=0&&currentRow<boardHeight&&//check if in row
            currentCol>=0&&currentCol<boardWidth&&//check if in col
            playersArray.includes(gameboard[currentRow][currentCol]))//check if matching player from array
        {
            length++;//advance length of current line
            
            //shift to next position to check
            currentRow+=vertical;
            currentCol+=horizontal;
        }
        return length;
    }


    return <div className="ConnectXBoard" onClick={(event)=>
    {
        const target=event.target;
        if(playerTurn!==-1&&target.className==="ConnectXNode"
        &&allPlayerData[playerTurn].level===0)
        {
            const childArray=target.parentElement.children;
            let col=0;
            while(col<childArray.length
            &&childArray[col]!==target)
            {
                col++;
            }
            if(col>=childArray.length)
            {
                setMessage("Out of bounds column.");
                //out of bounds message
            }
            else
            {
                placePiece(pieceDrop(col),col);
            }
        }
    }}>
    <button onClick={()=>
    {
        resetBoard();
        
    }}>Reset Game</button>
    <h2>{message}</h2>
    {
        gameboard.map((row,y)=>
        {
            return<div key={y} className="ConnectXRow">
            {
                row.map((_,x)=>
                {
                    return <ConnectXNode key={x} x={x} y={y} node={allPlayerData[gameboard[y][x]]} pieceSize={pieceSize}></ConnectXNode>
                })
            }
            </div>
        })
    }
    </div>
}

export default ConnectXBoard;