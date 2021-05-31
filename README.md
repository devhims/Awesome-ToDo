# Awesome Todo

A full stack project bulit with NextJs, ChakraUI, Auth0 and, Airtable.

## Features:

- Server Side Rendering with NextJs
- Serverless Functions handle user authentication, and database queries
- UI components built with ChakraUI
- Protected page and api routes with Auth0 for NextJs
- Airtable as the relational database for storing task information.

## Steps:

1. Clone/Download the repo.
2. `cd` into the project folder.
3. Run `npm i` to install dependencies
4. Create a `.env.local` at the root of the project and add in the following credentials from your Airtable and Auth0 account.

   ```javascript
   AIRTABLE_API_KEY=
   AIRTABLE_BASE_ID=
   AIRTABLE_TABLE_NAME=

   AUTH0_SECRET=
   AUTH0_BASE_URL=
   AUTH0_ISSUER_BASE_URL=
   AUTH0_CLIENT_ID=
   AUTH0_CLIENT_SECRET=
   ```

5. Run `npm run dev` to spin the dev server
6. Visit [http://localhost:3000/](http://localhost:3000/) in your browser

(If the above steps don't work, let me know by creating a new issue)

## Inspiration:

1. [Fullstack Jamstack with Next.js](https://youtu.be/TNKzKtNTjls?list=PLZ14qQz3cfJJOcbbVi_nVEPqC2334LLMz) - a mini Course by Auth0 presented by James Q Quick (Sadly the repo has not been updated to the latest Auth0 SDK).

2. [Just another todo app](https://github.com/harshb16/just-another-todo)

## License:

MIT
