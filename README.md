# Practical Docker Project

This project demonstrates the usage of Docker to set up a development environment with Laravel as the backend, React as the frontend, and MySQL as the database.

## Getting Started

### Prerequisites

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/your-username/practical-docker.git
    cd practical-docker
    ```
2. change Stripe public key and secret key in environment files in ./frontend and ./backend
    ./frontend/.env
    REACT_APP_STRIPE_KEY=pk_test_.......
    
    ./backend/.env
    STRIPE_KEY=pk_test_....
    STRIPE_SECRET=sk_test_....

3. Build and run Docker containers:

    ```bash
    docker-compose up -d --build
    ```

4. Access Laravel Container and Run Migrations:

    ```bash
    docker exec -it laravel-container php artisan migrate
    ```

5. Access Laravel Container and Run Passport Install:

    ```bash
    docker exec -it laravel-container php artisan passport:install
    ```

6. Visit the React Frontend:

    Open your browser and go to [http://localhost:3000](http://localhost:3000) to access the React frontend.

## Usage

- Laravel Backend: [http://localhost:8000](http://localhost:8000)
- React Frontend: [http://localhost:3000](http://localhost:3000)
- MySQL Database: Host: `localhost`, Port: `3306`

## Troubleshooting

If you encounter any issues, consider checking the logs of each container:

```bash
docker-compose logs laravel-container
docker-compose logs frontend
docker-compose logs mysql-container


# Note
# If you are facing error with Database connection refused.. then please delete the docker container and image and reinstall it.