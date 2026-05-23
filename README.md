# Brand Data Transformation Seeding

This project validates, seeds, and stores brand data with Express, Mongoose, and MongoDB. It reads raw brand records from `imported/brands.json`, normalizes and validates them, saves valid documents to MongoDB, and writes successful records to `exported/brands.json`.

## What the project does

- Starts an Express app on port `3000` by default.
- Connects to MongoDB using `MONGODB_URI`.
- Validates brand records against the Mongoose schema.
- Seeds valid records into MongoDB.
- Exports valid documents to a JSON file.
- Keeps sample seed cases in a separate utility file for cleaner code.

## Main flow

1. `src/main.ts` loads environment variables.
2. The app connects to MongoDB.
3. Raw data is validated in `src/service/transform-brands.service.ts`.
4. Seed cases from `src/utils/seed-cases.ts` are processed in `src/service/data-seeding.service.ts`.
5. Valid records are saved to MongoDB.
6. Valid records are written to `exported/brands.json`.

## Requirements

- Node.js
- npm
- Docker and Docker Compose if you want to run MongoDB in containers

## Install dependencies

Run this from the project root:

```bash
npm install
```

If you need to reinstall the TypeScript Express types:

```bash
npm install --save-dev @types/express
```

## Environment variables

Create a `.env` file in the project root if you want to override defaults.

```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/brand_db
```

When running in Docker Compose, the app uses:

```env
MONGODB_URI=mongodb://mongo:27017/brand_db
```

## Run with Docker

Docker Compose starts the app and MongoDB together.

```bash
docker compose up -d
```

This starts:

- `app` on `http://localhost:3000`
- `mongo` on `mongodb://localhost:27017`
- `mongo-express` on `http://localhost:8081`

To stop the containers:

```bash
docker compose down
```

To view logs:

```bash
docker compose logs -f app
```

If you want only the database:

```bash
docker compose up -d mongo
```

## Run locally

Start MongoDB first, either locally or with Docker, then run the app.

### Option 1: Docker for database, local app

```bash
docker compose up -d mongo
npm run dev
```

### Option 2: Run everything with Docker Compose

```bash
docker compose up -d
```

### Option 3: Local MongoDB, local app

```bash
npm run dev
```

## Build and start

Build TypeScript:

```bash
npm run build
```

Start the compiled app:

```bash
npm start
```

## Available scripts

- `npm run dev` - starts the app in development mode with `ts-node` and `nodemon`
- `npm run build` - compiles TypeScript
- `npm start` - runs the compiled output from `dist/main.js`
- `npm test` - placeholder script

## Project structure

```text
.
├── Dockerfile
├── docker-compose.yml
├── docs/
│   └── cases.csv
├── exported/
│   └── brands.json
├── imported/
│   └── brands.json
├── package.json
├── README.md
├── src/
│   ├── database.ts
│   ├── main.ts
│   ├── schema/
│   │   └── brands-schema.ts
│   ├── service/
│   │   ├── data-seeding.service.ts
│   │   └── transform-brands.service.ts
│   ├── types/
│   │   ├── Ibrand.ts
│   │   ├── Ivalidation-result.ts
│   │   └── brand.ts
│   └── utils/
│       └── seed-cases.ts
└── tsconfig.json
```

## Key files

- [`src/main.ts`](src/main.ts) - app entrypoint and startup flow
- [`src/database.ts`](src/database.ts) - MongoDB connection
- [`src/schema/brands-schema.ts`](src/schema/brands-schema.ts) - Mongoose brand schema
- [`src/service/transform-brands.service.ts`](src/service/transform-brands.service.ts) - transforms and validates imported brand data
- [`src/service/data-seeding.service.ts`](src/service/data-seeding.service.ts) - seeds the database and writes exported records
- [`src/utils/seed-cases.ts`](src/utils/seed-cases.ts) - sample brand cases
- [`docs/cases.csv`](docs/cases.csv) - simple Excel-friendly summary of the seed cases

## Docker files

- [`Dockerfile`](Dockerfile) - builds the app image
- [`docker-compose.yml`](docker-compose.yml) - starts the app, MongoDB, and Mongo Express

## Notes

- The app defaults to port `3000`.
- MongoDB data is persisted in the `mongo_data` Docker volume.
- `exported/brands.json` is generated output.
- `imported/brands.json` is the input data source.
- `docs/cases.csv` can be opened in Excel as a simple sheet.
