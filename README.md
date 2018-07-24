Flash Cards React Native App Readme:

Software:-
-Expo App on your mobile phone. (Appstore or Google Play)
-Expo XDE on desktop(optional)

---------------------------------------------------------------------

Built with:-
-React Native
-Redux
-Thunks Middleware
-React Navigation

---------------------------------------------------------------------

Styling:-
React Native Styling syntax, each component has it's own.

---------------------------------------------------------------------

How to install:-
-Open Command line in the file and 'npm install' will install all the packages required, or you can yarn install.(in this project I used mainly npm)

---------------------------------------------------------------------

How to run project:- 
-in the command line write, npm run and after the packager starts there's multiple ways to view the app, either by an emulator or by using expo app, you can send a text message the device you want to view it on using the expo app or you can scan the barcode to load it.

---------------------------------------------------------------------

Platform:-
during programming this app it was fully tested and used on IOS iPhone x. also it was tested on android and seemed to be running but it was mainly designed for IOS users. my android phone was crashing the expo app on of the steps and I think it was just the device. so please use IOS for main testing and using.

---------------------------------------------------------------------

Application tour and running tests:-
When the app first loads it will ask you if you want to allow notifications from the app, after that on the app first load the app automatically preloads a deck that was set to start with in the data.
You will start on the Home view, where you can view all decks available with each of their card count and a button to open their deck details view.
From that view you navigate to various places, at the bottom/top(depends if you are using IOS or android) tab nav  you can navigate to new deck view which is where you can add a new deck, if you type down the title of the new deck and click add deck, it will navigate you to the that specific deck details page which takes us to the deck details view which is also accessible from the main page by click open deck on the deck desired. on the deck details page there's various things to do. on the top of the view you have the ability to press and it will take you back to the home view and then under that you will see the title of the deck, followed by the number of the cards in the deck, under that you will have to options to choose from. first option is to add card to the deck and the second option is to start quiz. if u have no cards and you click on start quiz the app will alert you saying that you have no cards in the deck to start the quiz please add cards first. if you click on add card it will take you to add new card view which is built from a top back button that will take you back to the deck details view followed by the first Textinput(required) to fill which is the card question that you can type in and then you can pick the answer between correct and incorrect and then you add the new card which will take you back to the deck details where u can start the quiz if you choose to. If you start a quiz you will be taken to the quiz view and right then the app reset the reminder to notify you in 24 hours to take a quiz unless you open the app and take quiz it will reset the notifcation. The view is made from a back button at the top follow by the text telling you the card you are on from the pile of cards. after that you have the question for that card, under the question u have a button that would say view answer, If u click on it will show you the answer and toggle the text to say hide answer. If u press hide answer, it will hide the answer. Under that you will have the answer options which is 2 buttons, a green button that says correct as an answer or a red button saying incorrect answer. and you can choose to answer the question, when you finish all the questions the view will change to the results view, and on the view you will be able to see if you passed or not depending on how many mistakes you made, if u made more than 2 mistake you fail the quiz. you have the option to restart the quiz or choose another deck which will take you either to the first question or to the home view where u can choose another deck and start over. 

---------------------------------------------------------------------

Contributors:-
Nashid Bainy

---------------------------------------------------------------------

Acknowledgments:-
Tyler McGinnis for doing great job on explaining.
Udacity Team for just who they are. 

Thank you.



