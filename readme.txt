About EarningsGenie:
    -EarningsGenie is a Web Application that allows you to use AI to analyze transcripts of public company earnings calls. To my knowledge there are three companies that
    post earnings call transcrips online (BAMSec, Seeking Alpha, and The Motley Fool), but none of them have built out any AI features yet and I expect it will
    take them a while. For this project I only uploaded a couple earnings calls, but the idea would be to upload all public documents for every public company (a few thousand).

Features (by page):
    -About EarningsGenie ('/'): This is just a simple static landing page, that serves to explain the app to users.
    -All Companies Page ('/filings'): This page allows you to search through the public companies in our database by stock ticker, and will direct you to the company page.
    -Company Page ('/filings/${ticker}'): This page will show you all documents available for a given company, and direct you to the page for a document when you click on the appropriate button.
    -Document Page ('filings/${ticker}/${documentid}'): This page shows a document from the database. The key feature of this product is that there is a text area near the top of the page that the 
    user can use to input a question about the document. Once you click submit, after a few seconds the response will appear in the second textarea (powered by openAI).
    -Upload Transcript Page ('/uploadtranscript'): On this page, a user can upload their own document in PDF format , and using the same backend functions as the document page, ask a question about 
    the document in the text area. This also shows the contents of the PDF on the page when a user uploads it.
    -EarningsGeniePro: ('/EarningsGeniePro'): This is just a placeholder static page for the pro features that I want to build down the line. The only reason I included this is because
    unlike the other pages, this one is login protected so it gave me a reason to implement user login functionality. See the "What I will do next" section of this file to see the features 
    I want to implement down the road, but for the purpose of a web development course I felt I had enough built out (until I get a better understanding of the AI features).
    -Login Page ('/login'): Presents a form for the user to log in to their account, or navigate to the registration page if they dont have one. Upon login, it redirects them to the landing page 
    and updates the navbar to show their email to show they are logged in.
    -Registration Page ('/register'): Presents a form for the user to register a new account. Upon registration, it redirects to the login page.

Overview of Each File (skipping some of the boilerplate django files):
    -API models.py: Holds three models in the database (User, Company, Document).
    -API serializers.py: Creates a serializer class for my models, which converts the info to a format that can be processed by the front end react app.
    -API utils.py: Defined a function to validate emails, and made it a separate file just so that in the future I can continue to abstract away more functions as my code gets more complex. 
    -API views.py: This holds all my backend functions for sending data to the frontend, creating users, logging users in, etc. The only function in here that is really notable is the 
    ProcessUserInput function, which is where I have my api calls to OpenAI, and would be a key point of focus in the future of this app.
    -Frontend index.html: This is the html template for my whole app (single page paradigm), which uses the app.js component as the only thing in the body.
    -Frontend app.js: This holds the contents of a given page and sends them to the html file.
    -Frontend authcontext.js: This creates a state to show whether the user is logged in or not, which is used downstream in the app to impact the UI. 
    -Frontend navbar.js: contains buttons and routes to help users navigate. 
    -Frontend other components in the components folder: There are a handful of other compnents in the components folder, which are used to render the contents of a given page.
    -There are also a couple of configuration files like webpack.config.js, babel.config.json, main.js that I dont understand well, but I used a tutorial to get my self setup. https://www.youtube.com/watch?v=JD-age0BPVo
    -Other files are classic boilerplate like my urls files (I used one for the project, and one for each app, three total, which was new to me in this project).

Technical Specifications:
    -I used Django, React, Langchain, and Material UI for this.
    -The OpenAI API/ Langchain do all the heavy lifting for the document chat (and was suprisingly easy to implement).
    -I also used Chroma, but honestly I dont know how it works in my code. Conceptually, a vector database is necessary to allow the chatbot to take in the whole document (that is otherwise larger than
    its context window), which then allows the API to semantically search through the chunks of the document in the database to respond to the user query. I import Chroma in my views file
    but dont use it anywhere. The only reason I didnt mess with it is because I deleted it once and it messed with the doucment search functionality, so I just kept it as is since its working.
    The folks at langchain / openAI/ chroma have somehow done an excellent job of abstracting away complexity to the point where I dont even know why it works, but it does.
    -Note: the user input doesnt actually do anything to the database. This is by design, as I dont want to be storing the questions the user puts in (although I think openAI does for 30 days).

How to Run My Application:
    -Unfortunately you are going to need your own OpenAI API key, but otherwise, everything else should be straightforward.
    -First, install all the requirements from the requirements.txt and package.json and package-lock.json files (sorry, another learning lesson here as I probably used too many packages 
    and kind of lost track of which ones are actively being used so there are a lot and I am afraid to delete any.).
    -Next, create an apikey.py file, and plug in your OpenAI api key into a variable in this format: apikey = 'your api key here'.
    -Next, navigate to the "earningsgenie" project directory in django and run the command "python manage.py runserver".
    -Next, open a second terminal, navigate into the "frontend" app directory and run the command "npm run dev".

Distinctiveness and Complexity:
    -Complexity: Uses both react and django, as well as a third party UI library. Using react and django together alone took me a full day to figure out. Having two different apps
    within a django project was also a source of additional complexity. I started off in the beginning setup with a tutorial for making Django + React work, but everything else was my own 
    work, and I actually ended up changing/ deleting a lot of stuff from the tutorial code I started with (his app is nothing at all like mine). https://www.youtube.com/watch?v=JD-age0BPVo
    -Complexity: Has many more compnents and pages than the projects from this class, and more elaborate UI design.
    -Complexity: Use of external library (Langchain) and external API (OpenAI API).
    -Complexity: Unlike the class projects where authentication came in the distribution code, I had to figure out how to do authentication and login. This was surprisingly one of the hardest
    parts of this project, and if I were to do it again I would definitely do this first (instead of doing it in the middle like I did).
    -Complexity: This project is way way more lines of code than any project from this class, and took me longer to build.
    -Complexity: This app is really not designed to be run on mobile, and probably never will be, but since it was a requirement I made it mobile responsive.
    -Distinctiveness: Using react, third party libraries and third party API's (Langchain, Material UI, OpenAI API).
    -Distinctiveness: Allowing for users to interact with a document using AI is not present in any of the projects from this class.
    -Distinctiveness: This project isn't really similar to any of the projects from this class in terms of its use, functionality, or design.

What I will do next if I want to continue to put this online:
    I am going to put this project to bed for a little while to take the CS50 intro to artificial inteligence course, but I may dust it off in a few months and come 
    back to it. If I do come back to this project and want to make it into a business I will probably do some of the following things: 

    -Actually put this online
    -Require users use a real email to sign up    
    -Make sure everything is secure
    -Integrate with stripe and start charging money
    -Continue to work on the UI
    -Allow for chat history when you chat with documents
    -Make the chatbot link to the place in the document where it gets its answer
    -Create a prompt template for the API call to help guide the chatbot
    -Allow users to send a bot into an earnings call for live transcription (can use the recall API)
    -Implement sentiment analysis functionality (several API's for this)
    -Upload more transcripts for more companies

Thank you for reading this! 