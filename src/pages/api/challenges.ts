import { NextApiRequest, NextApiResponse } from "next";
import connection from '../../services/database';

export default async (request: NextApiRequest, response: NextApiResponse) => {
    const {userId, level, challenges, currentExperience, experience} = request.body;
    
    const db = await connection();
    const collection = db.collection('users');

    if ( !challenges && !experience ) {
        const where = request.query.userId ? {'user':request.query.userId} : null;
        const users = await collection.find(where).sort({'challenges': 1}).toArray();
        response.json(users);
    } else {
        const haveUser = await collection.findOne({user: userId});
        const data = {
            challenges,
            experience,
            currentExperience,
            level
        };

        if ( !haveUser ){
            await collection.insertOne({
                user: userId,
                ...data
            });
        } else {
            await collection.update({_id: haveUser._id}, {$set: {...data}});
        }

        response.json({'ok':true});
    }
}