# flash-card-app

## Description

This code base creates a general-purpose flash card app. The tech stack is Vue 3, Node, TypeScript, Vite, Axios, Express, Mongoose, and MongoDB. Testing suites used include Vitest and Cypress. Users can sign up for accounts (with password encryption using Bcrypt) in order to create decks with cards that can then be read aloud to them in the language of their choice. Users can also test their pronunciation by speaking the contents of the card and receiving assessment feedback on how well their pronunciation matched the native speaker's pronunciation.

## Check Out the App Yourself
You can create a free account and log in to try out the flashcard app. It is hosted in the cloud at https://vast-citadel-56213.herokuapp.com/

## Designed for Both Mobile and Desktop
Using responsive styling, the webpage looks great on both large and small screens.

## A Note About the Project's Early Days
Note: the first two months of this project's code can be found at https://github.com/abasile1-tech/flash-card-application-early-days (at the time, I wanted a clean slate, so I moved my code into this current repository).

## Upgraded to Vue 3
This project has been upgraded from Vue 2 to Vue 3. It has also been upgraded to use TypeScript and node version 20 instead of node version 16. You can view the original Vue 2 project (before the upgrade) at https://github.com/abasile1-tech/flash-card-application

## :arrow_right: Setting up

- This project was updated to be able to run on Heroku in the cloud. If you would like to run it locally there are a few lines that need to be updated:
- create a .env file
- Inside of the .env file, add the following line of code:

```
mongoURL='mongodb://localhost:27017/flash-card-app'
clientDIST = "/../../client/dist/"
```

- and set up your mongodb to use that url.
- Once those are updated **cd** into the client and run `npm install` and `npm run build`. This will generate a dist folder to be served. Then open a new terminal tab and **cd** to the server folder and run `npm install` and `npm run start`. Open localhost:5000 in web browser.
- Please note that this project uses Node version 20.10.0 (use nvm, the node version manager to control which version of node you are using).

## Vitest Testing (Unit Tests)

There is a Vitest unit testing suite in the client folder. **cd** into the client folder and run `npm run test` to run the Vitest tests.

## Cypress Testing (End-to-End and Integration Testing)

There is also a Cypress testing suite in the client folder. **cd** into the client folder and run `npx cypress open` to open Cypress and see the tests that are available to be run.

## :white_check_mark: Completed Goals

- :white_check_mark: Create Users
- :white_check_mark: Add CSS
- :white_check_mark: Add a way to shuffle the cards
- :white_check_mark: Add language support for audio output so that the cards can be read to the user in the specified language
- :white_check_mark: Add a Search Deck Button
- :white_check_mark: Add an Edit Card Button
- :white_check_mark: Add the ability to exit out of the Add Card Process.
- :white_check_mark: Display the card number on each card / the total number of cards in the Deck
- :white_check_mark: Remove language selector on mobile or make the language selector work on mobile
- :white_check_mark: Move the buttons pertaining to the Decks above the card
- :white_check_mark: Fix a bug where a card temporarily displays the front on the back when a card is deleted while viewing the back.
- :white_check_mark: prompt the user to make sure they are certain before deleting a card
- :white_check_mark: Log the user out if the local Storage no longer knows who the user is anymore
- :white_check_mark: Add some UI/UX design
  - :white_check_mark: Design a logo for the website
  - :white_check_mark: New Color Scheme
  - :white_check_mark: Condensed Login/Signup views
  - :white_check_mark: Three bar dropdowns for logout and return to decks functionality
- :white_check_mark: Add a cookies disclaimer
- :white_check_mark: Fix indexing issues when manipulating cards in decks that have been shuffled
- :white_check_mark: Allow the backs of the cards to be shown by default instead of always the fronts
- :white_check_mark: Add a Dark Mode Option
- :white_check_mark: Add the ability to navigate to the desired card number
- :white_check_mark: Give the user the option to delete their account
- :white_check_mark: Add a disclaimer about the use of localStorage
- :white_check_mark: Make the Decks look like more than just buttons (perhaps they could look like notebooks with a background image)
- :white_check_mark: Give the notebooks some colors
- :white_check_mark: Add a little piece of tape to each notebook and change the font to look handwritten (this will make it look more realistic)
- :white_check_mark: The problem with Microsoft Edge having limited language options has been fixed by Microsoft and there are now several hundred language options to choose from for voice in Microsoft Edge. This is way more than before, so the app functionality has been greatly improved.
- :white_check_mark: I made it so the card to be added is shown with more information so that the user better understands the details of the new card that they are creating.
- :white_check_mark: I allowed the dropdown menu to disappear when somewhere else on the page is clicked
- :white_check_mark: I added Cypress testing to verify that a specific user can log in to their account, see their specific library of decks, and use a specific deck.
- :white_check_mark: I added Speech Recognition to test user pronunciation and give a score on how well the pronunciation was understood.
- :white_check_mark: I improved upon the searchDeck function. Partial matches are now found using an algorithm that determines the percentage of similarity for two strings.
- :white_check_mark: I converted the project to TypeScript for better type-safety when compared with Vanilla JavaScript
- :white_check_mark: I migrated the project from Vue 2 to Vue 3
- :white_check_mark: I upgraded from Node 16 to Node 20
- :white_check_mark: I upgraded from the Jest unit testing framework to the Vitest unit testing framework

## Future Work

- Add voice control of the buttons
- Allow cards to be reordered
- Add a backup for the database
- Allow each notebook to have a user-choosable color to allow for further customization
- Save each user's preference for dark or light mode in the database and load that preference the next time that they log in.

## Videos
https://github.com/abasile1-tech/flash-card-application-vue3-upgrade/assets/59401762/d25a2c87-f0c1-48b2-9ba8-a83e711802cd

https://github.com/abasile1-tech/flash-card-application-vue3-upgrade/assets/59401762/d3ea631d-ea92-4a20-9699-ca5749442e0b

## :camera_flash: Screenshots

![login_page](https://github.com/abasile1-tech/flash-card-application/blob/main/screenshots/login_page.PNG?raw=true)
![sign_up_page](https://github.com/abasile1-tech/flash-card-application/blob/main/screenshots/sign_up_page.PNG?raw=true)
![welcome_page](https://github.com/abasile1-tech/flash-card-application/blob/main/screenshots/welcome_page.PNG?raw=true)
![spanish_el_libro_front](https://github.com/abasile1-tech/flash-card-application/blob/main/screenshots/spanish_el_libro_front.PNG?raw=true)
![spanish_el_libro_back](https://github.com/abasile1-tech/flash-card-application/blob/main/screenshots/spanish_el_libro_back.PNG?raw=true)
![showing_off_hamburger_menu](https://github.com/abasile1-tech/flash-card-application/blob/main/screenshots/showing_off_hamburger_menu.PNG?raw=true)
![JavaScript_deck_new](https://github.com/abasile1-tech/flash-card-application/blob/main/screenshots/JavaScript_deck_new.PNG?raw=true)
![JavaScript_comment_card_front](https://github.com/abasile1-tech/flash-card-application/blob/main/screenshots/JavaScript_comment_card_front.PNG?raw=true)
![JavaScript_comment_card_back](https://github.com/abasile1-tech/flash-card-application/blob/main/screenshots/JavaScript_comment_card_back.PNG?raw=true)
![decks_showing_off_dark_mode_hamburger_menu](https://github.com/abasile1-tech/flash-card-application/blob/main/screenshots/decks_showing_off_dark_mode_hamburger_menu.PNG?raw=true)
![decks_showing_off_light_mode](https://github.com/abasile1-tech/flash-card-application/blob/main/screenshots/decks_showing_off_light_mode.PNG?raw=true)
![iphone12_decks](https://github.com/abasile1-tech/flash-card-application/blob/main/screenshots/iphone12_decks.PNG?raw=true)
![iphone12_hamburger_menu](https://github.com/abasile1-tech/flash-card-application/blob/main/screenshots/iphone12_hamburger_menu.PNG?raw=true)
![iphone12_login_light](https://github.com/abasile1-tech/flash-card-application/blob/main/screenshots/iphone12_login_light.PNG?raw=true)
![iphone12_spanish](https://github.com/abasile1-tech/flash-card-application/blob/main/screenshots/iphone12_spanish.PNG?raw=true)
