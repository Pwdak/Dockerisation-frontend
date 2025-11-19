### 📁 Project Structure

```
src/            # HTML, CSS, JS files
Dockerfile      # Build recipe for Docker image
nginx.conf      # Nginx custom config (optional)
docker-compose.yml  # Deploy using docker compose
.dockerignore    # It is used to tell Docker which files should not be included when building the image.👉 Similar to .gitignore, but for Docker.
```

### 🚀 Build

```
docker build -t mon-frontend .
```


### ▶️ Run

```
docker run -d -p 8080:80 mon-frontend
```

Le site sera disponible sur :
http://localhost:8080


### 🐳 Using Docker Compose

```
docker compose up -d --build
```


### 📦 Deploy to Production

Push image to registry :

```bash
docker tag mon-frontend registry-url/mon-frontend
docker push registry-url/mon-frontend
```

Then pull and run on server :

```bash
docker pull registry-url/mon-frontend
docker run -d -p 80:80 registry-url/mon-frontend
```

---