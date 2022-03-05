const {client}=require('./client');

const createScore=async({score_value,score_user_id,score_software_id})=>
{
    try
    {
        const {rows:[score]}=await client.query
        (`
            INSERT INTO scores(score_value,score_user_id,score_software_id)
            VALUES($1,$2,$3)
            ON CONFLICT
            DO NOTHING
            RETURNING score_id,score_value,score_user_id,score_software_id;`,
            [score_value,score_user_id,score_software_id]
        );
        return score;
    }
    catch(error)
    {
        throw error;
    }
}

const getAllScores=async()=>
{
    const{rows:scores}=await client.query
    (`
        SELECT score_id,score_value,score_user_id,score_software_id
        FROM softwares;
    `);
    return scores;
}

const getScoreById=async(id)=>
{
    try
    {
        const {rows:[score]}=await client.query
        (`
            SELECT score_id,score_value,score_user_id,score_software_id
            FROM softwares
            WHERE score_id=$1;`,
            [id]
        );
        return score;
    }
    catch(error)
    {
        throw error;
    }
}

const getScoresBySoftwareId=async(id)=>
{
    try
    {
        const {rows:scores}=await client.query
        (`
            SELECT score_id,score_value,score_user_id,score_software_id
            FROM softwares
            WHERE score_software_id=$1;`,
            [id]
        );
        return scores;
    }
    catch(error)
    {
        throw error;
    }
}

const getScoresByUserId=async(id)=>
{
    try
    {
        const {rows:scores}=await client.query
        (`
            SELECT score_id,score_value,score_user_id,score_software_id
            FROM softwares
            WHERE score_user_id=$1;`,
            [id]
        );
        return scores;
    }
    catch(error)
    {
        throw error;
    }
}

const getScoresBySoftwareIdAndUserId=async({score_software_id,score_user_id})=>
{
    try
    {
        const {rows:[score]}=await client.query
        (`
            SELECT score_id,score_value,score_user_id,score_software_id
            FROM softwares
            WHERE score_user_id=$1;`,
            [score_software_id,score_user_id]
        );
        return score;
    }
    catch(error)
    {
        throw error;
    }
}

const editScore=async(score)=>
{
    if(score&&Object.keys(score)[0])//if score exists and has keys
    {
        if(typeof(score.score_id)==="number")
        {
            const id=score.score_id;
            const validEdits={};//grab valid edit keys from the object
            if(score.score_value)
            {
                validEdits.score_value=score.score_value;
            }
            if(score.score_user_id)
            {
                validEdits.score_user_id=score.score_user_id;
            }
            if(score.score_software_id)
            {
                validEdits.score_software_id=score.score_software_id;
            }

            const editKeys=Object.keys(validEdits);
            if(editKeys.length>0)//if there is at least 1 valid edit
            {
                const setString=editKeys.map((key,idx)=>
                {
                    return `${key}=$${idx+2}`;
                })
                .join(`,`);

                try
                {
                    const {rows:[updated]}=await client.query
                    (`
                        UPDATE scores
                        SET ${setString}
                        WHERE score_id=$1
                        RETURNING score_id,score_value,score_user_id,score_software_id;`,
                        [id,...Object.values(validEdits)]
                    );
                    return updated;
                }
                catch(error)
                {
                    throw error;
                }
            }
        }
    }
}

module.exports=
{
    createSoftware,
    runSoftware,
    getAllSoftwares,
    getSoftwareById,
    getSoftwareByName,
}