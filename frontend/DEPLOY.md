# Frontend Deploy Notes

This frontend can be deployed separately from the backend.

## Required environment variables

```env
VITE_API_URL=https://your-backend-domain.com
VITE_SOCKET_URL=https://your-backend-domain.com
```

## Build command

```bash
npm install
npm run build
```

## Important

Point both variables to the deployed backend URL so the frontend can call the API and connect to Socket.io after deployment.
