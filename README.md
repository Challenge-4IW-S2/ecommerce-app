# challenge-template

## Pré-requis

- Docker
- Docker Compose

## Utilisation

### Développement

```bash
docker compose up -d --build
```

### Création de modèles, migrations et seeders (création de données automatique)

*voir .sequelizerc dans ./server pour consulter la configuration*

Pour créer un nouveau ```model```, pour la base postgres, copier un modèle existant (dans le répertoire ```./server/src/postgresql/models```) et adapter à ses besoins le modèle copié.

- Les modèles sont basés sur la documentation ([Documentation Modèles](https://sequelize.org/docs/v6/core-concepts/model-basics/#extending-model))

Une fois le modèle créé, il faut créer une migration (à remplir soi-même pour les fonctions ```up()``` et ```down()```)

```bash
docker compose exec server npx sequelize-cli migration:create --name effet-de-ma-migration
```

Pour modifier un modèle existant, il est nécessaire de modifier le fichier dans ```./server/src/postgresql/models/{nom}.js``` ET de créer une nouvelle migration ajoutant les modifications dans ```up()``` et le rollback dans ```down()```

Il existe cependant une commande pour générer automatiquement un modèle et sa migration associée (mais le code généré utilise une autre méthode que celle montrée par la documentation, à éviter pour garder une cohérence de code) :

```bash
docker compose exec server npx sequelize-cli model:generate --name nom-du-modele --attributes name:string,is_verified:boolean
```

Pour créer un seeder (création de données dans une table) :
```bash
docker compose exec server npx sequelize-cli seed:generate --name add-user-roles
```

### Exécuter les migrations

```bash
docker compose exec server npx sequelize-cli db:migrate
```


### Production

TODO
