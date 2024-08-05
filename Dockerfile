# Use a imagem base oficial do Node.js
FROM node:20

# Define o diretório de trabalho dentro do container
WORKDIR /usr/src/app

# Copia o package.json e o package-lock.json para o diretório de trabalho
COPY package*.json ./

# Instala as dependências do projeto
RUN npm install

# Copia o código da aplicação para o diretório de trabalho
COPY . .

# Define a variável de ambiente
ENV PORT=3000

# Expõe a porta na qual a aplicação irá rodar
EXPOSE 3000

# Comando para rodar a aplicação
CMD ["node", "src/index.js"]
