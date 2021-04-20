
<p align="center">
  <img src="./public/imagens/whatsapp-bot.png" width="150" alt="My Whats">
</p>

# API - My Whats
 Este projeto usa como base o [WPPConnect](https://github.com/wppconnect-team/wppconnect "WPPConnect"), um navegador virtual sem interface gráfica que abre o whatsapp web e executa todos os comandos via código possibilitando assim a automação de todas as funções, e um fork do projeto [myzap](https://github.com/billbarsch/myzap "myzap") do [@billbarsch](https://github.com/billbarsch "@billbarsch").

## Começando

#### Dependências (Ubuntu)
```bash
$ sudo apt-get install -y gconf-service libasound2 libatk1.0-0 libc6 libcairo2 libcups2 libdbus-1-3 libexpat1 libfontconfig1 libgcc1 libgconf-2-4 libgdk-pixbuf2.0-0 libglib2.0-0 libgtk-3-0 libnspr4 libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6 ca-certificates fonts-liberation libappindicator1 libnss3 lsb-release xdg-utils wget build-essential apt-transport-https libgbm-dev python3-pip libssl-dev libffi-dev python3-dev build-essential cmake clang libicu-dev procps
```

#### Instalar MongoDB Community Edition (Ubuntu)

###### Instalar gnupg
```bash
$ sudo apt-get install -y gnupg
```

###### Importar a chave
```bash
$ wget -qO - https://www.mongodb.org/static/pgp/server-4.4.asc | sudo apt-key add -
```

###### Importar a chave
```bash
$ wget -qO - https://www.mongodb.org/static/pgp/server-4.4.asc | sudo apt-key add -
```

#### Crie um arquivo de lista para MongoDB

###### Ubuntu 20.04 (Focal)
```bash
$ echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/4.4 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-4.4.list
```

###### Ubuntu 18.04 (Bionic)
```bash
$ echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu bionic/mongodb-org/4.4 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-4.4.list
```

###### Ubuntu 16.04 (Xenial)
```bash
$ echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu xenial/mongodb-org/4.4 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-4.4.list
```

#### Instale o MongoDB e iniciar (Ubuntu)

###### Instalar
```bash
$ sudo apt-get update

$ sudo apt-get install -y mongodb-org
```

###### Iniciar/Status/Habilitar/Parar
```bash
$ sudo systemctl daemon-reload

# Inicia
$ sudo systemctl start mongod

# Status
$ sudo systemctl status mongod

# Habilita
$ sudo systemctl enable mongod

# Para
$ sudo systemctl stop mongod

# Reinicia
$ sudo systemctl restart mongod
```

#### Instale o NodeJs (Ubuntu)

###### Instalar
```bash
# Ir para seu diretório home
$ cd ~

# Recuperar o script de instalação para sua versão de preferência
$ curl -sL https://deb.nodesource.com/setup_14.x -o nodesource_setup.sh

# Execute o script 
$ sudo bash nodesource_setup.sh

# Instalar o pacote Node.js
$ sudo apt install -y git nodejs yarn gcc g++ make

# Remover pacotes que não são mais necessários
$ sudo apt autoremove -y
```

## Rodando a aplicação

```bash
# Ir para seu diretório home
$ cd ~

# Clone este repositório
$ git clone https://github.com/AlanMartines/mywhats-api-node-wppconnect.git

# Acesse a pasta do projeto no terminal/cmd
$ cd mywhats-api-node-wppconnect

# Instale as dependências
$ npm install

# Execute a aplicação 
$ node index.js

# Manter os processos ativos a cada reinicialização do servidor
$ sudo npm install pm2 -g

$ pm2 start index.js

$ pm2 save

$ pm2 startup

$ sudo env PATH=$PATH:/usr/bin /usr/lib/node_modules/pm2/bin/pm2 startup systemd -u ${USER} --hp /home/${USER}

# Para remover do init script
$ pm2 unstartup systemd

# O servidor iniciará na porta:9000

# Pronto, escaneie o código QR-Code do Whatsapp e aproveite!
```

#### Iniciar sessão whatsapp (POST method)
```node
router.post("/Start", (req, res, next) => {
  const response = await fetch('http://localhost:9000/sistema/Start', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(
        {
            sessionName: req.body.SessionName
        }
    )
  });
  const content = await response.json();
  return content;
});
```

####  Exibir QR-Code no navegador (POST method)
```node
router.post("/QRCode", (req, res, next) => {
  const response = await fetch('http://localhost:9000/sistema/QRCode', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(
        {
            sessionName: req.body.SessionName,
            View: "true"
        }
    )
  });
  const content = await response.json();
  return content;
});
```

####  Retorna json com (base64) do QR-Code (POST method)
```node
router.post("/QRCode", (req, res, next) => {
  const response = await fetch('http://localhost:9000/sistema/QRCode', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(
        {
            sessionName: req.body.SessionName,
            View: "false"
        }
    )
  });
  const content = await response.json();
  return content;
});
```

#### Fecha sessão whatsapp (POST method)
```node
router.post("/Close", (req, res, next) => {
  const response = await fetch('http://localhost:9000/sistema/Close', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(
        {
            sessionName: req.body.SessionName
        }
    )
  });
  const content = await response.json();
  return content;
});
```

## Configuração da engine
```json
{
    "_comment_engine": "Configuração da engine VENOM ou WPPCONNECT",
    "engine": "VENOM",
  ...
}
```

## Salvar token na nuvem
 - Crie uma conta grátis no https://jsonbin.io/ 
 - Crie um novo "bin" (objeto json) com quaisquer dados e copie o id dele e coloque no arquivo .env
 - Copie também o seu token de acesso à api do jsonbin.io e coloque no arquivo .env

```json
{
  ...
  "jsonbinio_bin_id": "246247hsfsjkfjksbfhsgf", // <- aqui
  "jsonbinio_secret_key": "jkhfdfasdgahgsdfdsjfgjfg", // <- aqui
  ...
}
```

 - Com esses dados o mywhats-api-node-wppconnect irá gravar o token na nuvem e poderá ser executado em várias instancias diferentes por exemplo no Gooogle Cloud Run

## Gerar TOKEN_SECRET para uso no jwt
```bash
$ node -e "console.log(require('crypto').randomBytes(256).toString('base64'));"
```

## Configuração do arquivo "config/server.config.json"
```json
{
    "_comment_engine": "Configuração da engine VENOM ou WPPCONNECT",
    "engine": "VENOM",
    "_comment_host": "Configuração do host",
    "host": "0.0.0.0",
    "port": "9000",
    "https": false,
    "_comment_jsonbin": "Configuração do jsonbin",
    "jsonbinio_bin_id": null,
    "jsonbinio_secret_key": null,
    "_comment_jwt": "Configuração do jwt",
    "jwt_secret": "09f26e402586e2faa8da4c98a35f1b20d6b033c60",
    "_comment_mongodb": "Configuração do mongo db",
    "local_mongo_conn_url": "mongodb://localhost:27017/",
    "mongo_db_name": "mywhats-api-node-wppconnect",
    "_comment_ssl": "Configuração dos certificados key e csr",
    "ssl_key_patch": "sslcert/server.key",
    "ssl_csr_patch": "sslcert/server.crt"
  }
```

## Dockerfile
```bash
# Ir para seu diretório home
$ cd ~

# Clone este repositório
$ git clone https://github.com/AlanMartines/mywhats-api-node-wppconnect.git

# Acesse a pasta do projeto no terminal/cmd
$ cd mywhats-api

# Processando o arquivo Dockerfile
$ docker build -t alanmartines/nodejs-mywhats-api-node-wppconnect:1.0 .

# Criar um contêiner
$ docker container run --name mywhats-api-node-wppconnect -p 9000:9000 -d alanmartines/nodejs-mywhats-api-node-wppconnect:1.0
```
## Para instalar o certbot e criar o certificado SSL para domínios https
```bash
$ sudo apt update

$ sudo apt install -y software-properties-common

$ sudo add-apt-repository universe

$ sudo add-apt-repository ppa:certbot/certbot

$ sudo apt update

$ sudo apt install -y certbot

$ sudo certbot certonly --manual --force-renewal -d *.yourdomain.net -d yourdomain.net --agree-tos --no-bootstrap --manual-public-ip-logging-ok --preferred-challenges dns-01 --server https://acme-v02.api.letsencrypt.org/directory
```

## Em desenvolvimento
Este projeto se encontra em desenvolvimento, então pode conter erros.

## Reflexão

<blockquote>
O conhecimento que adquirimos não merece ficar parado. Compartilhar tudo o que sabemos e gerar valor na vida de outras pessoas pode ter efeitos incríveis. Viver em constante compartilhamento de informações ajuda nossa comunidade profissional a evoluir cada vez mais.

Todos nós, independente do nível de conhecimento técnico, temos algum tipo de diferencial a oferecer para o próximo.

Já que temos a incrível capacidade de oferecer algo diferente para o próximo, devemos aproveitar isso para compartilhar todo esse nosso conhecimento.

Às vezes temos o sentimento de que aquilo que estamos fazendo de tão especial merece ser compartilhado, a internet está aí para nos possibilitar isso.

Temos a chance de buscar um conhecimento hoje e amanhã criar um artigo, vídeo ou qualquer outro tipo de material para compartilhar com as pessoas esse conhecimento que adquirimos.

Muitas pessoas, e talvez você se inclua nesse grupo, ainda têm aquele sentimento forte de mudar o próximo. Um sentimento que a faz ter um propósito de vida para buscar algo a mais, algo que possa contribuir para as gerações que por aqui estão e que ainda virá a passar.

Isso fica ainda mais expressivo quando se trata da comunidade específica de seu campo de estudo ou trabalho, pois deixar algum “legado” para sua área de conhecimento é algo que chama atenção de profissionais, pesquisadores e estudantes do mundo todo.

Muitos são movidos exatamente por essa energia de deixar seu nome registrado para o mundo.

A sua carreira é construída ao longo do tempo com uma série de conhecimentos e habilidades que são adquiras ao longo da vida.

Mas essa tarefa não precisa ser uma ação solitária e tão complicada assim, ainda mais levando em conta que uma sede grande pela busca de conhecimento e alguns ainda mais motivados para compartilhar tudo aquilo que já aprenderam.

Em outras palavras, as pessoas acabam tendo uma certa tendência em escutar o que as outras pessoas têm a dizer e também fazer a sua voz ser ouvida.

A informação não fica parada!

Quando entendemos a força desse hábito de compartilhar conhecimento, estamos contribuindo para que as pessoas ao nosso redor, que também precisam desse conhecimento, não parem de aprender.

Informação que fica parada, se perde! Tudo está na rede, esperando por você.

Faça dessa prática um de seus hábitos também. As informações que são compartilhadas por você podem contribuir para o crescimento e ascensão de alguém, já imaginou isso?

Envolva-se com as pessoas. Isso é ter propósito!
</blockquote>

## License
[MIT](https://choosealicense.com/licenses/mit/)
