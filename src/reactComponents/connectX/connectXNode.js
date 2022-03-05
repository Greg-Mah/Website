import React from "react"

const ConnectXNode=(props)=>
{
    //const x=props.x;//x pos of node
    //const y=props.y;//y pos of node
    const node=props.node;
    const pieceSize=props.pieceSize;

    return <div className="ConnectXNode" style=
    {node&&node.color?
        {
            backgroundColor:`rgb(
                ${node.color.r},
                ${node.color.g},
                ${node.color.b}
            )`,
            padding:pieceSize/2,
            borderRadius:pieceSize
        }
        :
        {
            padding:pieceSize/2,
            borderRadius:pieceSize
        }
    }>

    </div>
}
export default ConnectXNode;