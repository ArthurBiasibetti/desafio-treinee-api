<p align="center">
  <img src="https://softdesign.com.br/wp-content/themes/bones/library/images/logotipo.svg" alt="Softdesign logo" />
</p>

# Pré-requisitos

Digitar o comando:

`$ yarn install ou npm install`

Ter um banco de dados postgres

Configurar o arquivo .env.exemple para as configurações do seu banco e edita-lo para .env

com o banco de dados rodando digitar o comando:

`$ yarn m:run`

# Seed

digite o comando:

`$ npm run seed`

isso ira criar o primeiro usuario admin no banco:

password: rootadmin

user: AdminRoot

cpf: 85807788087

# Start

Digite o comando:

`$ yarn dev ou npm run dev`

# Impedimentos

Tive problemas para realizar os tests pois não estou conseguindo fazer o spyOn nos methods que preciso. o spyOn não é chamado no lugar do original, assim causando um erro de "No metadata for 'User' was found"
