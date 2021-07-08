## Settings
   Clone the repository, open terminal in root and do the following on terminal

   ```shell
   $ npm install
   ```
   After Setting up the database, create database tables running the command below, its advisable to run the command more than once and make sure your database is updated with the tables:

   ```shell
   $ create a postgresql database nuri and update the file backend/db/pool.js with the credentials
   $ npm run create:tables
   ```
   Start server by running:

   ```shell
   $ npm run start
   ```
   Test endpoints by running:
   ```shell
   $ npm run test
   ```
## EndPoints
- Use the following Endpoints
    
    `GET /blocks/v1a/blocks` Get all blocks 
    
    `GET /blocks/v1a/blocks/:id` Get block details by hash
    
    
### `Run application through docker`
Run the following Commands
1. docker build --tag nuri-backend
2. docker run --publish 3002:3002 nuri-backend
  
    
  
