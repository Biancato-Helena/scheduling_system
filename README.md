# scheduling_system

Este projeto consiste em um site (front-end e back-end) com a funcionalidade de realizar agendamentos para um determinado serviço.

## 🚀 Funcionalidades

* Página inicial com calendário para visualizar os horários disponíveis
* Agendar um horário
* Editar o horário de um agendamento
* Cancelar um agendamento
* Consultar um agendamento
* Formulário para preenchimento dos dados do usuário
* Controle dos horários ocupados e disponíveis

## 🧠 Conceitos aplicados

* Conexão com banco de dados
* Conexão do front-end com o back-end
* Operações CRUD
* Uso de JavaScript para criação e manipulação do calendário
* Manipulação de entrada de dados
* Envio e recebimento de dados entre front-end e back-end
* Utilização de rotas no Flask

## 🛠️ Tecnologias utilizadas

* **Linguagens:** Python, JavaScript, HTML e CSS
* **Framework:** Flask
* **Banco de dados:** MySQL

## 📌 Status

Finalizado para fins de estudo.

## ▶️ Como executar o projeto

### 1. Clone o repositório

```bash
git clone https://github.com/Biancato-Helena/scheduling_system.git
cd scheduling_system
```

### 2. Crie e ative o ambiente virtual

```bash
python3 -m venv venv
source venv/bin/activate
```

### 3. Instale as dependências

```bash
pip install -r requirements.txt
```

### 4. Configure o banco de dados

O projeto utiliza **MySQL**.

Crie um banco de dados chamado `Agendamentos` e configure a conexão com o banco no arquivo `back-end/back.py`.

### 5. Execute o projeto

Entre na pasta do backend:

```bash
cd back-end
```

Execute o arquivo:

```bash
python3 back.py
```

### 6. Acesse no navegador

Com o servidor rodando, acesse:

```text
http://127.0.0.1:5000/
```

O sistema estará disponível no navegador.
