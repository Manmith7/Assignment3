This is a simple Node.js and Express API to create, read, and delete incident reports, with data stored in a MongoDB database.

/// Features

    Create a new incident

    Fetch all incidents

    Fetch a single incident by ID

    Delete an incident by ID

    MongoDB database integration

    Environment variable management with .env

/// Tech Stack

    Node.js

    Express.js

    MongoDB (Mongoose)

    dotenv

/// Setup Instructions
    1.git clone  https://github.com/Manmith7/Assignment3
    2.cd Assignment3
    3.Install dependencies:
        npm install
    4.Create a .env file in the root folder:
        PORT=8000
        MONGO_URL=your-mongodb-connection-string
    5.Start the server:
        npm start

Example Incident Schema
    {
    "title": "Server Downtime",
    "description": "The production server is down.",
    "servity": "high"
    }
