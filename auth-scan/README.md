# Guide d’utilisation de l’image Docker – my-frontend

Ce document explique comment utiliser l’image Docker fournie sous forme de fichier :

my-frontend.tar


Aucune connaissance préalable de Docker n’est requise.


## 🟦 1. Installer Docker

Si Docker n’est pas installé, téléchargez-le ici :  
https://docs.docker.com/engine/install/

Vérifiez son installation :

```
docker --version
```


🟩 2. Importer l’image Docker (.tar)

Placez le fichier my-frontend.tar dans un dossier puis exécutez :

```
docker load -i my-frontend.tar
```

Résultat attendu :

Loaded image: my-frontend:v1


L’image est maintenant disponible sur votre machine.


🟧 3. Vérifier l’image importée

```
docker images
```

Vous devez voir :

```
REPOSITORY     TAG   IMAGE ID     SIZE
my-frontend      v1    *******      ***
``` 


🟨 4. Lancer l’application avec Docker

Vous pouvez choisir n’importe quel port local.
Exemple ici avec le port 8080, mais vous pouvez le changer.

```
docker run -d -p 8080:80 --name my-frontend-container my-frontend:v1
```

Ensuite, ouvrez :

http://VM_IP_Address:8080 


(ou avec le port que vous avez choisi)



🟪 5. Déployer avec Docker Compose (port au choix)

Créez un fichier docker-compose.yml :

---
services:
  my-frontend:
    image: my-frontend:v1
    container_name: my-frontend-container
    ports:
      - "8080:80"    # Modifier 8080 selon votre choix
    restart: unless-stopped


Lancez :

```
docker compose up -d
```

Vérifiez :

```
docker compose ps
```

📦 6. Déployer en Production

Pousser l'image sur ton régistre local :

```bash
docker tag mon-frontend registry-url/my-frontend/my-frontend:v1
docker push registry-url/my-frontend/my-frontend:v1
```

Ensuite puller l'image et lancer ton conteneur sur le serveur :

```bash
docker pull registry-url/my-frontend/my-frontend:v1
docker run -d -p 80:80 registry-url/my-frontend/my-frontend:v1
```

🟥 7. Arrêter l’application

Avec Docker :

```
docker stop my-frontend-container
```

Avec Docker Compose :

```
docker compose down
```

⛔ 8. Supprimer le conteneur (optionnel)

```
docker rm my-frontend-container
```

♻️ 9. Supprimer l’image Docker (optionnel)

```
docker rmi my-frontend:v1
```
