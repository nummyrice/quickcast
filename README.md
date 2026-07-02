# quickCast app
quickCast is a clone of indeed and similar web apps allowing employers and job-seekers to meet. quickCast specializes in connecting talent with casting directors in the performing industries.

Learn more about the quickCast feature list [HERE](https://github.com/nummyrice/QuickCast-react-solo-project/wiki/QuickCast-Feature-List)

See the database schema [HERE](https://github.com/nummyrice/QuickCast-react-solo-project/wiki/QuickCast-Database-Schema)

Clone the codebase [HERE](https://github.com/nummyrice/QuickCast-react-solo-project)

See the app working live [HERE](https://solo-react-quickcast.herokuapp.com/)


```Current Features```
* add a user and login
* create a single company for you as a casting director
* edit and delete the company
* create productions that belong to the company
* edit the details of that production
* view other companies and gigs


### Run Locally

1. Clone the repo
   ```sh
   git clone https://github.com/nummyrice/QuickCast-react-solo-project.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Enter your database credentials in `.env`
   ```env
   DB_USERNAME=your_username
   DB_PASSWORD=your_password
   DB_NAME=your_database
   DB_HOST=your_host
   ```
4. Run database migrations and seeders
   ```sh
   npm run db:initialize
   npm run db:seed
   ```
5. Start the development server
   ```
   npm run start:development
   ```
