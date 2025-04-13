# Sylvera test

This project is a simple app to display and filter projects stored in an SQLite database. The backend uses Drizzle and Next.js API routes and the frontend uses SWR for fetching and Tailwind + Shadcn for rendering.

## Setup

1. Rename `.env.sample` to `.env`
2. Install the deps using `npm i`

## Running the project

To start the development server, use `npm run dev`.

To run the tests, use `npm test`.

## Design considerations

### Technology

Given the time constraints, I chose to use Next.js with Drizzle. Next.js makes it easy to build fullstack apps and comes with the added benefit of being able to share types between API routes and frontend pages.

I decided to use Drizzle because of how lightweight it is. Drizzle makes it incredibly easy to write a schema and translate that into a Typescript type that can be used across an app. Drizzle handles migrations, different environments and credentials for you.

For data fetching I used `swr` which is lightweight, supports retries and can easily cache responses.

I used Vitest for the tests - it's a familiar API to Jest but with a large speed boost and minimal setup time. Vitest "just works" without having to do any extra configuration in most cases.

For the frontend, I used Tailwind and Shadcn to quickly build out my components. Shadcn is a great baseline with simple, accessible components that can be easily styled and configured.

The technology choices I made allowed me to iterate quickly and build a product that made sense for the usecase, rather than spending time trying to reinvent the wheel.

### Development methodology

I started by building out a basic service to fetch projects from the database. After installing Drizzle, setting it up and writing a quick `select` query, I built a frontend that used `swr` to render a table. Ultimately this is the main experience for the user so I chose to start from here before iterating on extra functionality. This also allowed me to establish how I was going to share the types across the frontend and backend.

I then added pagination with the consideration that some clients may have hundreds or even thousands of projects and we should aim to keep the load low on the frontend and backend. To allow the frontend to have a more interactive and informative UI, I also chose to return metadata about the pagination including the number of items per page, if this is the last page, etc. I like to build frontends that are generally simple and believe the bulk of processing and filtering should live on the backend.

I also knew I wanted to add some sort of filter and decided to filter by status. This is a simple text equality check and gives the users a few options in the dropdown to choose from. Finally, I began to add integration tests and reviewed the finished project.

### Testing methodology

I chose to use a service pattern to make it easy to test the individual service later on. This also makes maintaining the projects logic much easier, as all the code is nicely encapsulated into known services.

I decided to add integration tests as the project has some filtering logic that would not make sense to mock out as part of a unit test. I tried to maintain full coverage by testing pagination and status filtering.

Drizzle made it particularly easy to swap out databases by allowing me to define an in-memory database as well as migrations. I made the decision early on that the database should be passed into the service's constructor, so I can swap it out for testing.

## Next steps

### User experience

The user experience could be much better by giving users a better loading experience (perhaps with a table skeleton) and more informative error messages. The page lacks empty states to tell users when there are no results - this would be handy when using the filters.

It may also be helpful to clients to store their filters to local storage so that their filters are persistent across sessions.

### Improved filtering/sorting

There are a number of improvements that could be made to the filtering. Firstly, the project statuses are hardcoded. In the real world, these would perhaps come from the projects service or a separate project statuses service. This would allow us to present clients with relevant statuses if, for example, clients were able to configure and customise their statuses.

Another useful may be searching/filtering by country. This could be implemented using a fuzzy search.

### Environment management

The project currently assumes its always running in a development environment. We wouldn't be able to easily deploy the project right now to a service like Vercel as it assumes we have some form of persistent storage for the SQLite database. We would need to remove this assumption so that our app can easily be placed behind a load balancer and scaled horizontally.

The `db.ts` could be updated to check the environment using `process.env.NODE_ENV`. We could detect whether the app is running locally, in production, or in test mode and configure the DB path or switch to a different dialect (SQLite in dev, Postgres in production).

### Testing

We should also add several small unit tests to ensure the frontend is rendering items as expected. I would add tests for the `<ProjectsTable>` component that checks all the provided data is correctly rendered. My tests would also check the conditional logic that happens when a country is missing from the project.
