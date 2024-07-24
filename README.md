# Watchtower

## Setup

### Prerequisites

- Node 20.x
- Docker Compose

### Steps

- Install the dependencies with: `npm install`
- Run docker compose (for the database): `docker compose up`
- Start the API: `npm run dev --workspace api`
- Start the frontend: `npm run dev --workspace web`

## TODO

- [ ] User login
- [ ] Create modeling and migrations for house
- [ ] Create modeling and migrations for cameras
- [ ] Camera CRUD
- [ ] WebSocket authorization
