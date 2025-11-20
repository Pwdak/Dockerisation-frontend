
---

# 🇬🇧 **README_EN.md — English Version**

```md
# Docker Image Usage Guide – auth-scan

This document explains how to use the Docker image provided as:

auth-scan.tar 


No prior Docker knowledge is required.

---

## 🟦 1. Install Docker

If Docker is not installed, download it here:  
https://docs.docker.com/engine/install/

Check installation:

```
docker --version
```

🟩 2. Import the Docker image (.tar)

Place the file auth-scan.tar in a folder and run:

```
docker load -i auth-scan.tar
```

Expected output:

Loaded image: auth-scan:v1


The image is now available on your system.


🟧 3. Confirm that the image is loaded

```
docker images
```

You should see:

REPOSITORY     TAG   IMAGE ID     SIZE
auth-scan      v1    *******      ***


🟨 4. Run the application with Docker

You can choose any local port.
Example using port 8080, but feel free to change it:

```
docker run -d -p 8080:80 --name auth-scan-container auth-scan:v1
```

Then open:

http://VM_IP_Address:8080


(or whichever port you selected)


🟪 5. Deploy using Docker Compose (custom port supported)

Create a file named docker-compose.yml:

---
services:
  auth-scan:
    image: auth-scan:v1
    container_name: auth-scan-container
    ports:
      - "8080:80"    # Change 8080 to your preferred local port
    restart: unless-stopped


Run:

```
docker compose up -d
```

Check:

```
docker compose ps
```


📦 6. Deploy to Production

Push image to registry :

```bash
docker tag mon-frontend registry-url/auth-scan/auth-scan:v1
docker push registry-url/auth-scan/auth-scan:v1
```

Then pull and run on server :

```bash
docker pull registry-url/auth-scan/auth-scan:v1
docker run -d -p 80:80 registry-url/auth-scan/auth-scan:v1
```


🟥 7. Stop the application

Using Docker:

```
docker stop auth-scan-container
```

Using Docker Compose:

```
docker compose down
```


⛔ 8. Remove the container (optional)

```
docker rm auth-scan-container
```


♻️ 9. Remove the Docker image (optional)

```
docker rmi auth-scan:v1
```