# spotifywordcloud
## Testing Locally
Move into the server directory.
run:
  python CreateWordCloud.py <access_token>
image should be created "client\\src\\images\\ResultsImage.png"

## Testing with frontend
### Backend
Move into server directory.

to install (only need to once):
  rm package-lock.json
  node install

run:
  node server.js &

Use the & only if you want to move it to the background (you wont see the server output). Open a new terminal if you dont move it into the background, so you can see the output of both the frontend and backend

### Client
Move into client directory.

to install (only need to once):
  rm package-lock.json
  npm install --save typescript
  npm install

run:
  npm start &

Use the & only if you want to move it to the background (you wont see the server output). Open a new terminal if you dont move it into the background, so you can see the output of both the frontend and backend
