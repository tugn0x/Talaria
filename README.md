The software requires docker installed in your environment.

# Install
1. change settings in `.env.example` and rename it as `.env`
2. check that your hostname matches `API_DOMAIN` and `FRONTEND_DOMAIN` as it was used for `traefik` load balancer 
3. `docker network create proxy`
4. run `docker-compose up -d` to start all needed containers

# Configuration
## Frontend/ReactJS
The frontend don't need any configuration; it's based on a nodejs container
running the application by command `npm start` as the container starts

## Backend/Laravel setup 
(run these from `laravel` container)
```bash
composer install
php artisan key:generate  # creates a new APP_KEY and saved in .env
php artisan migrate
php artisan passport:install
php artisan db:seed
```
Then change `CLIENT_ID` and `CLIENT_SECRET` in your `.env` accordingly to ones generated by `php artisan passport:install` command used before.