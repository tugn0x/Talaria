# TALARIA ILL software
## About

## License
This project is licensed under the terms of the [GNU General Public License v3.0](https://www.gnu.org/licenses/gpl-3.0.html)

# Requirements
To run the software you need docker is installed in your environment

# Install
1. Change settings in `.env.example` and rename it as `.env`
2. Check that your hostname matches `API_DOMAIN` and `FRONTEND_DOMAIN` as it was used for `traefik` load balancer; check also that the `UID` matches the user's ID running docker
3. Upload your server (and api-server) SSL certificates into `docker/certs` folder and update `SSL_CERT_PATH,SSL_KEY_PATH,SSL_API_CERT_PATH,SSL_API_KEY_PATH` variables in `.env` file accordingly
4. Run `docker-compose up -d` to start all needed containers

# Configuration
## Frontend/ReactJS
The frontend don't need any configuration; it's based on a nodejs container
and it automatically downloads and installs every needed component using `npm`.

## Backend/Laravel 
Run these commands from `talaria-laravel` container ONLY THE FIRST TIME you run the application
```bash
composer install    #download vendor folder
php artisan migrate # create DB
php artisan passport:install # create oAuth2 auth keys used by API (you've to keep credentials provided and put in in your `.env` as described below)
composer dump-autoload
php artisan optimize
```
Then change `CLIENT_ID` and `CLIENT_SECRET` in your `.env` accordingly to ones generated by `php artisan passport:install` command used before.

All scheduled/queued jobs are managed by `laravelqueue` and `laravelscheduler` containers

## Initial setup
Run these commands from `talaria-laravel` container ONLY THE FIRST TIME you run the application
```bash
php artisan db:seed # DB init
```
This command will initialize DB with some usefull data likes countries, identifiers, institution-types, titles, roles ... and two user account to manage the system directly from web UI:
```
username: admin@talaria.local      password: password

username: manager@talaria.local    password: password
```

## Database 
You can access DB data using PHPMyAdmin at `https://${API_DOMAIN}/phpmyadmin/`  (see `phpmyadmin` container for configuration)

### Database backup
`dbbackup` container (see configuration parameters in `docker-compose.yml` ) automatically saved a local DB dump in the folder specified by `DB_BACKUP_FOLDER` variable defined in `.env` file 


## File Storage
All uploaded files are stored temporarly in the `/storage/app/public` folder and will be automatically removed everyday at 23:00 by a Laravel scheduled job (see `AutomaticDeleteUploadedFiles.php`).

# Customization

### Active features and settings
Configuration settings are stored  in `.env`

### Logo
Used logo are stored in `/frontend/app/images/`, you can find `logo.png` (big) and `logo-mini.png` (small, used for mobile sidebar)

### Mobile App Icon
Used PWA icon is stored in `/frontend/app/images/icon-512x512.png`



