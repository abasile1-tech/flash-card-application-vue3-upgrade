# flash-card-app

## Description  
This code base creates a general purpose flash card app.

## Setting up  
This project was updated to be able to run on Heroku. If you would like to run it locally there are a few lines that need to be updated:  
*client/views/SingleDeck.vue:*
```
28 const url = 'http://localhost:5000/api/decks/';
```
*client/views/Welcome.vue:*
```
25 const url = 'http://localhost:5000/api/decks/';
```
*server/routes/decks.js:*
```
10 const url = 'the-url-to-your-mongo-database';
```
Once those are updated **cd** into the client and run `npm run build`. Then **cd** to the server folder and type `npm run dev`.

## Testing  
Currently there is one testing suite in the client folder. **cd** into the client folder and run `npm run test` to run the Jest test.

## Future Work  
 - Create Users  
 - Add CSS  
 - Add a way to shuffle the cards  