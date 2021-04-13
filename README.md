# DiPICKLE

## Table of contents

- [About](#about)
- [Installation](#installation)
- [Authors](#authors)
- [Credits](#credits)
- [More information](#more-information)

## About

This is the repository for the DiPICKLE for the [Language, Integration and Media Project (LIM-Project)](https://www.ntnu.edu/web/isl/lim) at NTNU. It was created by a group of five Informatics students in the course IT2901 "Informatics Project II" at NTNU.
The development began in January 2021. 
The project vision is to create an interactive language-learning website that can help young migrant students learn Norwegian in a fun and engaging way.

## Installation

1. **Prerequisites**  
   Make sure you have the following technologies installed:

   - Python
   - Pip
   - Node.js

2. **Clone the project**  
   Create a local folder and clone the project:

   - `git clone https://github.com/phajsi/LIM01.git`

3. **Create virtual environment and activation**  
   Create a virtual environment. It can be inside the project folder or somewhere else on your computer. If you are making it inside the project folder then make sure to not push it to github.

   - `python3 -m venv name_of_environment`

     _This depends on what type of python you have and what OS, so be sure to double check different commands._

   After creating the environment it has to be activated. You do this by going into /env/Scripts/, then write activate in the terminal. In Git Bash, you have to write `source activate` in the terminal from /env/Scripts/.

   _For some this also requires a different approach. You may have to write `project-name\Scripts\activate.bat` for it to work. This can depend on OS, what Git GUI you use etc._

4. **Install requirements.txt**  
   If you have startet the virtual environment then go into the project backend folder LIM01/backend and install the requirements from requirements.txt

   - `pip install -r requirements.txt`

   you can check if it downloaded correctly by running pip freeze and comparing to the requirements.txt file. Remember to activate the virtual environment every time you are running the project as all the backend libraries are downloaded there.

5. **Install frontend packages**  
   Next we need to install the frontend packages located in package.json. Cd into LIM01/frontend and run:

   - `npm install`

6. **Building the project**  
   When all the packages are installed you should be able to run the website. While in the frontend folder run:

   - `npm run build`  
     This will create a build folder in backend so that backend and frontend can work togheter. Remember to build everytime you have made changes to the frontend.

7. **Run the project**  
   After building the project, cd back to the project folder and into LIM01/backend and then run:

   - `python manage.py runserver`  
     While the server is running, open your browser and go to:
     http://localhost:8000/

   _Alternatively you can run the project from the frontend folder by running `npm start` However this will not run the backend server, but it can be useful if working with UI/UX._

## Authors

Maja Jenssen

Julie Davidsen

Even Myhre

Phajsi Halvorsen

Simen Opedal

## Credits

The Project was setup with the help of this tutorials:

- [Django & React JWT Authentication](https://www.youtube.com/watch?v=QFDyXWRYQjY&list=PLJRGQoqpRwdfoa9591BcUS6NmMpZcvFsM)

## More information

**Wiki**  
The project wiki contains more detailed information about the product, technologies, examples and use cases.
