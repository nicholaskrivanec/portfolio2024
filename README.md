# 👋 Hello developer!

This is a streamlined Vue.js template, optimized for efficient development. The template leverages the power of Express.js to provide a robust backend, perfectly complementing the sleek Vue.js frontend for a seamless development experience. Check our [tutorials for frontend development](https://www.w3schools.com/where_to_start.asp) to learn the basics of [HTML](https://www.w3schools.com/html/default.asp), [CSS](https://www.w3schools.com/css/default.asp) and [JavaScript](https://www.w3schools.com/js/default.asp). 🦄

## Knowledge requirements

To be able to fully understand and modify this template to your needs, there are several things you should know (or learn):

- [HTML](https://www.w3schools.com/html/default.asp)
- [CSS](https://www.w3schools.com/css/default.asp)
- [JavaScript](https://www.w3schools.com/js/default.asp)
- [Vue.js](https://vuejs.org/)
- [Node.js](https://www.w3schools.com/nodejs/default.asp)
- [Express.js](https://expressjs.com/)

 ## 🔨 What's next?

Customize this template to make it your own.  
Remember to make your layout responsive - if you want your site to look good on smaller screens like mobile.

## 🎨 Where to find everything?

This template is made by using several technologies.  
Below are explanations about where to find specific code.

Public resources are found in the folder `public`.

Data is stored in your admin console.

### Root HTML

HTML files are stored in a folder called `views`. Files have `.vue` extension.
In the `client/index.html` you can add your external links and scripts, or change other general code that is relevant on every page like the head.
You can find other templates in `views/`.

### CSS and images

You can find the main CSS file in `client/src/assets/main.css`. Images can also be stored here, but you are free to set up your own file structure for assets. 

### Application

You can find the core frontend Vue application in `client`, with public resources, `src/`, and the main `index.html`.

### Backend

The backend work is in `server/`. 
API routes in `client/src/router/index.js`.

### Database

Dynamic spaces can use [SQLite](https://www.sqlite.org/docs.html) database.  
The database file is called `database.db`. It is placed inside the `w3s-dynamic-storage` folder.  
SQLite connection path to the database is `w3s-dynamic-storage/database.db` which you can use to connect to the SQLite database programmatically.   

---  
**Do not change the `w3s-dynamic-storage` folder name or `database.db` file name!**  
**By changing the `w3s-dynamic-storage` folder name or `database.db` file name, you risk the space not working properly.**


## 🔨 Please note
For now files created/uploaded or edited from within the terminal view will not be backed up or synced. 

This template incorporates both a backend server router and a frontend application router. It is crucial to ensure that their endpoints remain unique and do not overlap.
## ⛑ Need support?

[Join our Discord community](https://discord.gg/6Z7UaRbUQM) and ask questions in the **#spaces-general** channel to get your space on the next level.  
[Send us a ticket](https://support.w3schools.com/hc/en-gb) if you have any technical issues with Spaces.

Happy coding!