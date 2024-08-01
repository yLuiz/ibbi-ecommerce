# Compose Custom File

docker-compose -f docker-compose-db.yml up
docker-compose -f docker-compose-app.yml up

# Build Custom File
docker build -t mysql:8 -f Dockerfile.database .

# Execute DB to application
- Database

docker build -t mysql:8 -f Dockerfile.database .
docker run --name mysql -d -p 3306:3306 mysql:8

- Backend
docker build -t ecommerce:1.0 .
docker run --name ecommerce-app -d -p 3000:3000 ecommerce:1.0
