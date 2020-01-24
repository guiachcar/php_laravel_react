<strong> Projeto para Avaliação </strong>

```php
    //gerar pasta node_modules instalar NPM    
    npm install

    //dependências YARN    
    yarn install

    //dependências Composer    
    composer install

    //ir para pasta docker e subir container (banco já configurado)
    cd docker
    docker-compose up -d

    //limpar a base
    docker exec -it laradock_workspace_1 php artisan migrate:refresh
```
