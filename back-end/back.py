
from flask import Flask, render_template, request, session, redirect, url_for
import mysql.connector  

app = Flask(
    __name__,
    template_folder='../templates',
    static_folder='../static'
    )

app.secret_key = "chave-do-meu-sistema"

@app.route('/')

# Criação da função inicio para renderizar a página principal

def inicio():
    return render_template("PrincipalPage.html")


@app.route("/agendar", methods=['GET', 'POST'])

# Criação a função agendar para receber os dados do formulário e exibir no console

def agendar():

    if request.method == 'POST':
        nome = request.form['nome']
        email = request.form['email']
        telefone = request.form['telefone']
        servico = request.form['servico'] 
        observacao = request.form['obs']


        session["nome"] = nome
        session["email"] = email
        session["telefone"] = telefone
        session["servico"] = servico
        session["obs"] = observacao

        return redirect(url_for("calendario"))
    
    return render_template("AgendarPage.html")

@app.route("/editar")
def editar():
    return render_template("Editar.html")

@app.route("/consultar")
def consultar():
    return render_template("Consultar.html")

@app.route("/cancelar")
def cancelar():
    return render_template("Cancelar.html")

@app.route("/calendario")
def calendario():
    return render_template("calendario.html")

@app.route("/finalizacao", methods=["POST"])
def finalizacao():

    data = request.form["data"]
    horario = request.form["horario"]

    nome = session["nome"]
    email = session["email"]
    telefone = session["telefone"]
    servico = session["servico"]
    observacao = session["obs"]

    id_agendamento = salvar_agendamento(
        nome,
        email,
        telefone,
        data,
        horario,
        servico,
        observacao
    )

    return render_template(
        "calendario.html",
        id_agendamento=id_agendamento
    )

def conectar():
    # Configurações de conexão com o banco de dados
    try:
        conexao = mysql.connector.connect(
        host= "localhost",
        password= "1234",
        port= 3306,
        user= "root",
        database= "Agendamentos"
    )
        print("Conexão bem-sucedida ao banco de dados!")
        return conexao
    except mysql.connector.Error as err:
        print(f"Erro ao conectar ao banco de dados: {err}")
        return None


def salvar_agendamento(nome, email, telefone, data, horario, servico, observacao):
    conexao = conectar()
    if conexao:
        cursor = conexao.cursor()

        sql = "INSERT INTO agendamentos (nome, email, telefone, data, horario, servico, observacao) VALUES (%s, %s, %s, %s, %s, %s, %s)"
        valores = (nome, email, telefone, data, horario, servico, observacao)

        cursor.execute(sql, valores)
        conexao.commit()

        id_agendamento = cursor.lastrowid

        cursor.close()
        conexao.close()

        return id_agendamento


if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5000, debug=True)

