# Backend Deploy Notes

This backend can be deployed separately from the frontend.

## Required environment variables

```env
PORT=5000
CLIENT_URL=https://your-frontend-domain.com
```

If you have multiple frontend domains, separate them with commas:

```env
CLIENT_URL=https://your-frontend-domain.com,https://your-preview-domain.com
```

## Start command

```bash
npm install
npm run start
```

## Important

The `CLIENT_URL` value controls CORS and Socket.io access, so set it to your deployed frontend URL or the two apps will not talk to each other.
