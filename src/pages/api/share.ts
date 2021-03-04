import { NextApiRequest, NextApiResponse } from "next";

import html2image from '../../components/html2image';
import handlebars  from 'handlebars';
import axios from "axios";

export default async function share(req: NextApiRequest, res: NextApiResponse) {
    // const {level, challenges, experience} = req.query;
    // const pathname = '/templates/share_twitter.hbs';
    
    // const {data} = await axios.get(process.env.HOST + pathname);  
    // const html = await handlebars.compile(data)({ host: process.env.HOST, level, challenges, experience });
    
    // const image = await nodeHtmlToImage({ html });

    // if ( image ) {
    //     res.writeHead(200, { 'Content-Type': 'image/png' });
    //     res.end(image, 'binary');
    // }

    try {
        const image = html2image({ html: '<html><body><p>teste</p></body></html>' });
        res.send(image);
    } catch (err) {
        console.error(err);
        return null;
    }
}