# Reservation Platform Web


## Descrição
App Web desenvolvida para a plataforma de reservas, permitindo gerenciamento de usuários, serviços e reservas.


## Online
1. O projecto está disponivel online pelo link:
    [https://reserveja.sukuasoft.online](https://reserveja.sukuasoft.online)
## Rodar Localmente

1. Clone o repositório:
   ```sh
   git clone https://github.com/sukuasoft/reservation-platform-web.git
   cd reservation-platform-api
   ```

2. Instale as dependências:
   ```sh
   npm install
   ```

3. Crie um arquivo `.env` e configure as variáveis de ambiente:
   ```env
    API_URL=https://api.sukuasoft.online
   ```

   Caso o API_URL não esteja disponível sugiro que clone o repositório da API para rodar localmente
    [Reservation Platfrom API](https://github.com/sukuasoft/reservation-platform-api.git)


## Execução

### Modo de Desenvolvimento:
```sh
npm run dev
```

### Build e Produção:
```sh
npm run build
npm start
```

