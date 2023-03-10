# Blog API
## Description

NESTJS project for a rest api backend server.

This project is for a blog webpage and has some features like:
- Authentication, authenticated routes
- Posts(CRUD)
- Users(CRUD)

## Tech stack
### INFRA
- Nestjs
- Nodejs

### Language
- Typescript

### Automatic formatting
- Eslint
- Prettier

### Unit testing
- Jest

### Authentication
- Passport
- JWT

### Automated Scripts
- Husky

### Methodology
- Clean architecture

## How to commit on it

```bash
# conventional commits
npm commit -m "feat: add new feature"
npm commit -m "infra: add an infra change"
npm commit -m "fix: remove bug"


# close issues with commit
npm commit -m "closes #<issueId>, git commit -m fix: fix problem when fetching data"
```

## How to run it

```bash
# install packages
npm install

# development
npm run start

# watch mode
npm run start:dev

# production mode
npm run start:prod
```

## Test

```bash
# unit tests
npm run test

# e2e tests
npm run test:e2e

# test coverage
npm run test:cov
```
