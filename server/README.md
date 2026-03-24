# Server DB Setup

## 1. Start Postgres with Docker
```powershell
cd E:\tourism\server
npm run db:up
```

## 2. Generate Prisma client
```powershell
cd E:\tourism\server
npm run prisma:generate
```

## 3. Create database tables
```powershell
cd E:\tourism\server
npm run prisma:push
```

## 4. Start NestJS server
```powershell
cd E:\tourism\server
npm start
```

## Useful commands
```powershell
npm run db:logs
npm run db:down
```

## Docker database
- Host: `localhost`
- Port: `5432`
- Database: `tourism_db`
- User: `tourism_user`
- Password: `tourism_password`

## Connection string
```env
DATABASE_URL="postgresql://tourism_user:tourism_password@localhost:5432/tourism_db?schema=public"
```
