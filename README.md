
# Trello Clone

This Trello Clone project aims to replicate the basic functionality of the popular project management tool, Trello. It allows users to create columns, cards to manage their tasks and projects. 



## Demo


- Due to Render free service, you might need to wait a few minutes for initial load, please be patient.
- https://trello-clone-web.netlify.app/


## Features

The Trello Clone currently includes the following features:

- Toggle dark/light mode.
- Add, edit, and delete columns.
- Add, edit, and delete cards.
- Drag and drop columns, cards to different positions.
- Data (including columns and card's order) is saved automatically to database.



## Technologies

**Client:** React, Material UI

**Server:** Node, Express, MongoDB


## Installation

To get started with the project, follow these steps:

1. Clone the repository:

```bash
  git clone https://github.com/phvinhquang/trello-web-clone.git
```
2. Navigate to the each folder:
```bash
  $ cd server
  $ cd client-app
```

3. Install the dependencies in each folder:
```bash
  $ npm install
```

4. Set up the environment variables:
- Create a .env file to store environment variables. 
- Fill in the required environment variables such as database connection string, API keys, etc.

5. Start the development server for both the client app and server:
```bash
  $ npm run dev
```
6. Access the application in your web browser:
server at:
```bash
  http://localhost:5000
```
client at:
```bash
  http://localhost:5173
```

    
## Contributing

Contributions to the project are welcome! Please follow the project's coding style and guidelines. For major changes or new features, consider opening an issue to discuss the proposed changes before submitting a pull request.


## Acknowledgements

- The creators and maintainers of React, MUI, Node.js, MongoDB for their fantastic tools and libraries.

- The open-source community for their guidance and support.


## Future Improvements

The following features are planned to be implemented in future updates:

- User authentication: Implement a login/signup feature to allow multiple users to manage their own boards and cards.
- Comments and attachments: Allow users to add comments and attachments to cards.
- Add, delete boards (currently there is one board)

