
# What is Pied Piper 2.0?

### NextAuth Authentication

Configured Spotify as a provider to authenticate users, retrieving user information, and managing user sessions. user session tokens are generated when a user logs in certain pages can only be accessed with a valid token.

### In-Depth Analysis

By utilzing the Spotify API, data is drawn directly from a user's account. this ensures that a user's reccomendations of other users with similar taste are accurate and up-to-date!

### Database 

Once a user logs into our application, their profile data and listening habits are posted to our database. using MongoDB, we are able to match existing users based on their listening habits.

### Community

Connect with other Bruins with similar and different music taste than you! you can explore all users via the 'user' tab and similar users via the dashboard.

# Get Started

## Cloning & Credentials

Clone the repository utilizing the following command:

``` 
git clone git@github.com:tariqrahman/Pied-Piper-2.0.git 
``` 

Create a file named ".env" in the root directory of your project to hold credentials related to Spotify Web API, NextAuth, and the MongoDB instance.

The .env file should resemble the following:

```
NEXTAUTH_URL=http://localhost:3000
NEXT_PUBLIC_CLIENT_SECRET=some_long_ugly_secret
NEXT_PUBLIC_CLIENT_ID=another_long_ugly_id
JWT_SECRET=some_secret_value
MONGODB_URI=mongodb_connect_uri
MONGODB_NAME=database_name
```

Next, ensure your Spotify credentials are added to the developer project created by the project owner. Send your full name and Spotify email address to @tariqrahman before moving to the next steps.

Similarly, verify you're added to the database instance with admin read/write privelages by sending your MongoDB email to @winedrop.

## Dependancies

Now that your credentials are set up, navigate to the root of your clone and run:
```
npm install
```
You should notice auto-generated node_modules and package-lock.json directories and files at the root. 
## Booting Up

To see the local instance of Pied-Piper-2.0 in action, boot up a server on your machine:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Debugging & References

Note: If you run into details related to node, check your current version, and switch to 14 or 16 if you haven't already:
```
nvm -ls
nvm use (14 or 16)
```

For reference, the boilerplate [API route](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). The other API routes can be found under /api as well.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
