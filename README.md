# Next.JS 14 - Financial Dashboard

This Next.js project with the following features:

- A public home page.
- A login page.
- Dashboard pages that are protected by authentication.
- The ability for users to add, edit, and delete invoices.

## Getting Started

These instructions will help you set up and run the project on your local machine.

### Prerequisites

Make sure you have the following installed on your machine:

- Node.js: [Download and Install Node.js](https://nodejs.org/)
- npm: npm is bundled with Node.js. You can check if you have npm installed by running `npm -v` in the terminal.

### Installing

1. Clone the repository:

    ```bash
    git clone https://github.com/your-username/your-project.git
    ```

2. Change into the project directory:

    ```bash
    cd your-project
    ```

3. Install dependencies:

    ```bash
    npm install
    ```

### Running the Application

1. Start the development server:

    ```bash
    npm run dev
    ```

2. Open your browser and visit [http://localhost:3000](http://localhost:3000) to view the application.


### Database (Vercel Postgres Database)

1. Create a project on GitHub

2. Go to https://vercel.com, connect your GitHub account and create a project based on your GitHub repository

3. Create a Postgres database

4. Go to Storage -> Select the database you created -> Go to "env.local" tab -> Show secret -> Copy Snippet -> Paste it in the .env file created in the root directory

#### Creating database and seed it with initial data

1. Make sure you have completed the previous steps

2. Run "npm run seed" in the terminal. 
You should see some console.log messages in your terminal to let you know the script is running.
