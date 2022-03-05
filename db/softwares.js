const {client}=require('./client');

const createSoftware=async({softwareName,softwareDescription,softwareData})=>
{
    try 
    {
        const {rows:[software]}=await client.query//do not send data unless software is run
        (`
            INSERT INTO softwares(software_name,software_description,software_data)
            VALUES($1,$2,$3)
            ON CONFLICT
            DO NOTHING
            RETURNING software_id,software_name,software_description;`,
            [softwareName,softwareDescription,softwareData]
        );
        return software;
    }
    catch(error)
    {
        throw error;
    }
}

const runSoftware=async(id)=>
{
    try 
    {
        const {rows:[software]}=await client.query
        (`
            SELECT software_id,software_name,software_description,software_data
            FROM softwares
            WHERE software_id=$1;`,
            [id]
        );
        return software;
    }
    catch(error)
    {
        throw error;
    }
}

const getAllSoftwares=async()=>
{
    const{rows:softwares}=await client.query//do not send software data for all software
    (`
        SELECT software_id,software_name,software_description
        FROM softwares;
    `);
    return softwares;
}

const getSoftwareById=async(id)=>
{
    try 
    {
        const {rows:[software]}=await client.query//do not send data unless software is run
        (`
            SELECT software_id,software_name,software_description
            FROM softwares
            WHERE software_id=$1;`,
            [id]
        );
        return software;
    }
    catch(error)
    {
        throw error;
    }
}

const getSoftwareByName=async(name)=>
{
    try 
    {
        const {rows:[software]}=await client.query//do not send data unless software is run
        (`
            SELECT software_id,software_name,software_description
            FROM softwares
            WHERE software_name=$1;`,
            [name]
        );
        return software;
    }
    catch(error)
    {
        throw error;
    }
}

const editSoftware=async(software)=>
{
    if(software&&Object.keys(software)[0])//if software exists and has keys
    {
        if(typeof(software.software_id)==="number")
        {
            const id=software.software_id;
            const validEdits={};//grab valid edit keys from the object
            if(software.software_name)
            {
                validEdits.software_name=software.software_name;
            }
            if(software.software_description)
            {
                validEdits.software_description=software.software_description;
            }
            if(software.software_data)
            {
                validEdits.software_data=software.software_data;
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
                    const {rows:[updated]}=await client.query//do not send data unless software is run
                    (`
                        UPDATE softwares
                        SET ${setString}
                        WHERE software_id=$1
                        RETURNING software_id,software_name,software_description;`,
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
    editSoftware,
}