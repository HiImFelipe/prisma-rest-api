# Prisma REST API

This is nothing really exceptional, I just wanted to test some stuff I've learned during work on a true personal project,
but I've got no patience to just make something pretty and I just made a normal REST API with a single User entity

Notes: 
- dependency inversion is cool, don't get me wrong, but I was too lazy to just make dependency inversion with express
- and with yup
- but I think I may do it with bcrypt and make it a provider instead

## Running

### Docker
To run this the easy way, simply add a .env file with the following format

```
POSTGRES_PASSWORD = 'password'
DATABASE_URL = 'postgresql://user:password@172.17.0.1:5432/testdatabase'
```

172.17.0.1 is a hacky way of doing it, if you are a windows user you can be even more fancy and just use host.docker.internal instead

if you are a docker pro then just do your magic and make a decent routing

### Manually

first of all good luck

#### Dependencies
- Node 16
- PostgreSQL
- TypeScript (already comes with package.json, but usually people have it installed globally)

#### Installing stuff

run the magic command

```bash
npm install
# yarn install if you prefer
```

#### Running stuff

run as a developer to avoid having to compile typescript to javascript

```bash
npm run dev
# yarn dev
```

but if you truly wanna just compile it first then yeah do this

```bash
npm run build
# yarn build

node dist/index.js
```

## Testing

You will not believe me but running tests is a really tough task and **not for everyone**

that said, here we go:

```
npm run test
# yarn test
```

yeah I was just kidding

coverage is not properly set-up yet so it will be like "wow you test nothing wtf", sorry
