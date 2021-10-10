# uwudaily

Built by [@maggie-j-liu](https://github.com/maggie-j-liu), [@sampoder](https://github.com/sampoder), and [@eilla1](https://github.com/eilla1).

## What is uwudaily?

uwudaily™️ is a platform for anyone to log their daily ✨ vibes ✨. Built with Next.js, Tailwind CSS, and Supabase, users can create new posts to log their mood with an emoji along with a short description (with Markdown support)! Users can view the main uwudaily feed through the homepage and see a complete history of their own past posts in `/log/[username]`.

## Running locally

First, set environment variables for Supabase in `.env.local`

```sh
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

Then, run the development server:

```sh
# install dependencies
yarn
# then, run the dev server
yarn dev
```

Open http://localhost:3000 with your browser to see the result.

## How we used Supabase

We used Supabase for authentication and storing data. Users can authenticate with Magic Link or OAuth with GitHub or Google. uwudaily also stores user profile information in Supabase including username, timestamp of when the user's profile was last updated, and a UUID for each unique user. Each post (🤠) is also stored in a Supabase table. The user logs a new entry through the `/new` route which creates a record in the table with the user's UUID, timestamp, emoji, and description.

![uwu bear meme with pink heart emojis](https://user-images.githubusercontent.com/72365100/136679198-bb72db44-129d-4980-851e-a57bcd1d5553.jpg)
