# ChocoTrack

## Description
ChocoTrack est une application web développée avec **Python/Django** et **PostgreSQL**, conçue pour aider une pâtisserie à gérer ses produits, ses commandes, son stock et ses utilisateurs.  
Ce projet illustre la mise en place d’une architecture moderne, dockerisée, et valorisable dans un portfolio professionnel.

---

## Fonctionnalités principales
- **Gestion des produits** : ajout, modification, suppression et affichage des pâtisseries (gâteaux, viennoiseries, boissons).  
- **Gestion des commandes** : création de commandes, suivi du statut (en préparation, prêt, livré).  
- **Gestion du stock** : suivi des ingrédients et alertes en cas de rupture.  
- **Tableau de bord** : statistiques de ventes et produits les plus demandés.  
- **Authentification et rôles** : administrateur, vendeur, client.  

---

## Technologies utilisées
- **Backend** : Django, Django REST Framework  
- **Base de données** : PostgreSQL  
- **Conteneurisation** : Docker, Docker Compose  
- **Langage** : Python 3.11  
- **Gestion des dépendances** : pip / requirements.txt  

---

## Structure du projet
```
patisserie_manager/
├── docker-compose.yml
├── backend/
│   ├── Dockerfile
│   ├── manage.py
│   ├── patisserie_manager/
│   │   ├── settings.py
│   │   ├── urls.py
│   │   ├── wsgi.py
│   │   └── asgi.py
│   ├── apps/
│   │   ├── users/
│   │   ├── products/
│   │   ├── orders/
│   │   └── inventory/
│   └── requirements.txt
```

---

## Installation et lancement

### Prérequis
- Docker et Docker Compose installés sur la machine.

### Étapes
1. Cloner le projet :
   ```bash
   git clone https://github.com/ton-compte/patisserie-manager.git
   cd patisserie-manager
   ```

2. Construire et lancer les conteneurs :
   ```bash
   docker-compose up --build
   ```

3. Accéder à l’application :
   - API Django : `http://localhost:8000` [(localhost in Bing)](https://www.bing.com/search?q="http%3A%2F%2Flocalhost%3A8000%2F")  
   - Interface d’administration : `http://localhost:8000/admin` [(localhost in Bing)](https://www.bing.com/search?q="http%3A%2F%2Flocalhost%3A8000%2Fadmin")

---

## Utilisation
- Créez un superutilisateur pour accéder à l’admin :
  ```bash
  docker-compose run web python manage.py createsuperuser
  ```
- Ajoutez des produits, gérez les commandes et suivez le stock via l’interface d’administration ou les endpoints API.

---

## Améliorations possibles
- Intégration d’un frontend moderne (React ou Angular).  
- Module e‑commerce pour commandes en ligne.  
- Génération de rapports PDF pour les ventes.  
- Notifications par email ou SMS pour les clients.  

---

## Auteur
Projet développé par Nadia Nmissi – Exemple de projet portfolio en Django.  