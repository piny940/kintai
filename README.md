## 本番環境
1. `kintai/.env`に以下を記述
   ```
   POSTGRES_USER=...
   POSTGRES_PASSWORD=...
   ```
2. `backend/.env.sample`に従って`backend/.env`を記述  
  `POSTGRES_USER`、`POSTGRES_PASSWORD`は上で入力した値と同じものを使用する
2. `docker compose up -d`

## 開発環境
1. `backend/.env.sample`に従って`backend/.env`を記述
2. `backend/`で`go run .`
3. `frontend/.env`に以下を記述
   ```
   BACKEND_HOST=http://localhost:8080
   ```
4. `frontend/`で`yarn`
5. `frontend/`で`yarn dev`
