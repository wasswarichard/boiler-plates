import { Express, Request, Response } from 'express'

export default function (app: Express) {
    app.get('/statuscheck', (req:Request, res:Response) => res.sendStatus(200))

    // Register User

    // Login

    // Get the users sessions

    // Logout
    
};