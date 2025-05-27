## Stack

- **Backend**: Laravel 12, PHP 8.2
- **Frontend**: React 19, Vite, MUI 7
- **Queue / Scheduling**: Laravel Scheduler + Cron
- **Database**: MySQL 8 (Dockerized)
- **Containerization**: Docker + Docker Compose

## Getting Started

### Clone the repository and run the app

Make sure Docker is installed and running.

```bash
git clone git@github.com:gaburielcasado/swstarter.git
cd swstarter
./start.sh
```

The script will run docker-compose, migrations, and synchronize data with swapi.
Data synchronization runs when starting the backend, and then once per day.

Once everything is up and running, you should see the following printed in the console:
```
swstarter-backend-1   | [Entrypoint] Migrations complete – starting server
swstarter-backend-1   | 
swstarter-backend-1   |    INFO  Server running on [http://0.0.0.0:80].  
swstarter-backend-1   | 
swstarter-backend-1   |   Press Ctrl+C to stop the server
```

Search endpoint stats will be updated every 5 minutes.

Access the frontend at http://localhost:3000

Hit the stats endpoint: http://localhost:8000/api/stats
