<!-- ## Concept

This template is meant to serve as a foundation for every P2/P3 following the React-Express-MySQL stack, as learned in Wild Code School.
It's pre-configured with a set of tools which'll help students produce industry-quality and easier-to-maintain code, while staying as simple as possible to use.

## Setup & Use

### Project Initialization

- In VSCode, install plugins **Prettier - Code formatter** and **ESLint** and configure them
- Clone this repo, enter it
- If you are using `yarn` or `pnpm`, adapt the `config/cli` in `package.json`
- Run command `npm install`
- _NB: To launch the backend server, you'll need an environment file with database credentials. You'll find a template one in `backend/.env.sample`_

### Available Commands

- `migrate` : Run the database migration script
- `dev` : Starts both servers (frontend + backend) in one terminal
- `dev-front` : Starts the React frontend server
- `dev-back` : Starts the Express backend server
- `lint` : Runs validation tools, and refuses unclean code (will be executed on every _commit_)
- `fix` : Fixes linter errors (run it if `lint` growls on your code !)

## FAQ

### Tools

- _Concurrently_ : Allows for several commands to run concurrently in the same CLI
- _Husky_ : Allows to execute specific commands that trigger on _git_ events
- _Vite_ : Alternative to _Create-React-App_, packaging less tools for a more fluid experience
- _ESLint_ : "Quality of code" tool, ensures chosen rules will be enforced
- _Prettier_ : "Quality of code" tool as well, focuses on the styleguide
- _ Airbnb Standard_ : One of the most known "standards", even though it's not officially linked to ES/JS
- _Nodemon_ : Allows to restart the server everytime a .js file is udated

### Deployment

For deployment, you have to go to `secrets` → app `actions` on the github repo to insert via `New repository secret` :

- CAPROVER_BACK_APPNAME : name app on caprover
- CAPROVER_FRONT_APPNAME : name app on caprover
- CAPROVER_PASSWORD : password caprover
- CAPROVER_SERVER : link of domain -->



<h1 align="center">Babyplace</h1>


<!-- Introduction -->
<h1 href='#'>🫡Introduction</h1>
<p>Hello 👋.<br/>

Welcome on our app <i>Babyplace</i>, developed by our team of three companions : <a href="https://github.com/HazeFury">Marc-Antoine</a>, <a href="https://github.com/Yukitaori">François</a> and <a href="https://github.com/LucieChev">Lucie</a>.
This is our last project during our training at the Wild Code School and we're glad to present it to you.<p>
<p>
<br/>
<br/>


<!-- Objectives -->
<h1 href='#'>🎯 The Objectives</h1>
<h2>Purpose</h2>
<p>The purpose of our project is ease the booking and management of places in daycare for both parent and pro.</p>
<p>We designed our application with two parts : one for the parent who wants to book a place in a daycare for one of his children, and another one for professionals who want to be able to manage easily their places and bookings for their structure.</p>
<br/>

<h2>User Target</h2>
<p>The main users wil be parents and professionnals.</p>
<p>A potential improvement of the app would be to give access to professionnals other than managers of daycare (childcare assistants, nannies, etc).</p>

<br/>
<br/>


<!-- Technical stack -->
<h1 href='#'>⚙️Technical Stack used for the project</h1>
<ul>
<li>JavaScript / React.js / CSS vanilla</li>
<li>Node.js / Express</li>
<li>MySQL</li>
<li>Git / Github</li>
<li>Figma</li>
<li>Trello</li>
</ul>

<br/>
<br/>
<h1 href='#'>🔄Installation</h1>
<h3>Follow these steps</h3>
<ul>
<li>
- In VSCode, install plugins **Prettier - Code formatter** and **ESLint** and configure them</li>
<li> Clone this repo, enter it</li>
<li> Run command `npm run setup`</li>
<li> Run command `npm run migrate`</li> 
<li> _NB: To launch the backend server, you'll need an environment file with database credentials. You'll find a template one in `backend/.env.sample`_</li>
<li> Create `.env` files in /frontend and /backend following `.env.sample` examples, and insert the values following the instructions.</li>
</ul>

<br/>
<h3>
Some commands :</h3> 
<ul>
<li>`setup` : Initialization of frontend and backend, as well as all toolings</li>
<li> `migrate` : Run the database migration script</li>
<li>`dev` : Starts both servers (frontend + backend) in one terminal</li>
<li>`dev-front` : Starts the React frontend server</li>
<li> `dev-back` : Starts the Express backend server</li>
<li> `lint` : Runs validation tools, and refuses unclean code (will be executed on every _commit_)</li>
<li>`fix` : Fixes linter errors (run it if `lint` growls on your code !)</li>
</ul>

<br/>
<br/>
<!-- Packages -->
<h1 href='#'>📦Packages</h1>
<p>For this project, we used the <a href='https://github.com/WildCodeSchool/js-template-fullstack' target='_blank' rel="noreferrer">Wild Code School - FullStack - Template</a></p>
<h3>The template initially contained  :</h3>
<ul>
<li> _Concurrently_ : Allows for several commands to run concurrently in the same CLI</li>
<li> _Husky_ : Allows to execute specific commands that trigger on _git_ events</li>
<li> _Vite_ : Alternative to _Create-React-App_, packaging less tools for a more fluid experience</li>
<li> _ESLint_ : "Quality of code" tool, ensures chosen rules will be enforced</li>
<li>_Prettier_ : "Quality of code" tool as well, focuses on the styleguide</li>
<li> _ Airbnb Standard_ : One of the most known "standards", even though it's not officially linked to ES/JS</li>
<li> _Nodemon_ : Allows to restart the server everytime a .js file is udated</li>
  </ul>

<br/>
<h3>Then we've added :</h3>
<ul>
<li>React Router Dom</li>
<li>React Scroll</li>
<li>Material UI (MUI)</li>
<li>Multer (for file uploads)</li>
<li>Argon2 (for hashing passwords )</li>
<li>JWT - JSON Web Token</li>
<li>Chart.js</li>
<li>Joi (for forms validation)</li>
<li>Axios</li>
<li>Toastify</li>
</ul>
<br/>
<br/>
<h1 href='#'>🚧 What's next 🚧</h1>
<ul>
<li>Password reinitialization</li>
<li>Pro availability / places deletion</li>
<li>Back-end validators for more security</li>
<li>Profile picture uploads</li>
</ul>
<br/>
<br/>
