
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



@app.route("/consultar", methods =["GET", "POST"])
def consultar():

    if request.method == "POST":

        codigo = request.form["codigo"]

        conexao = conectar()

        if conexao:
            cursor = conexao.cursor()

            sql ="""
            SELECT id, nome, data, horario
            FROM agendamentos
            WHERE id = %s
        """

        cursor.execute(sql, (codigo,))

        agendamento = cursor.fetchone()

        cursor.close()
        conexao.close()

        if agendamento:
            return render_template(
                "Consultar.html",
                agendamento=agendamento
            )
        return render_template(
            "Consultar.html",
            erro="Agendamento não encontrado.")
    
    return render_template("Consultar.html")

@app.route("/cancelar" , methods=["GET", "POST"])
def cancelar():

    if request.method == "POST":
        codigo = request.form["codigo"]

        conexao = conectar()

        if conexao:
            cursor = conexao.cursor()

            sql = "DELETE FROM agendamentos WHERE id = %s"

            cursor.execute(sql, (codigo,))
            conexao.commit()

            if cursor.rowcount > 0:
                mensagem = "Agendamento cancelado com sucesso."
            else:
                mensagem = "Agendamento não encontrado."

            cursor.close()
            conexao.close()

            return render_template(
                "Cancelar.html",
                sucesso = mensagem
            )


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

        sql_verificar = "SELECT * FROM agendamentos WHERE data = %s AND horario = %s"

        cursor.execute(sql_verificar, (data, horario))
        agendamento_existente = cursor.fetchone()

        if agendamento_existente:
            cursor.close()
            conexao.close()
            return None  
            
    sql = "INSERT INTO agendamentos (nome, email, telefone, data, horario, servico, observacao) VALUES (%s, %s, %s, %s, %s, %s, %s)"
    valores = (nome, email, telefone, data, horario, servico, observacao)

    cursor.execute(sql, valores)
    conexao.commit()

    id_agendamento = cursor.lastrowid

    cursor.close()
    conexao.close()

    return id_agendamento


@app.route("/horarios-disponiveis")
def horarios_disponiveis():

    data = request.args.get("data")

    conexao = conectar()

    if conexao:
        cursor = conexao.cursor()

        sql = """
            SELECT horario
            FROM agendamentos
            WHERE data = %s
        """

        cursor.execute(sql, (data,))

        horarios_ocupados = cursor.fetchall()

        cursor.close()
        conexao.close()

        horarios_ocupados = [
            str(horario[0]) for horario in horarios_ocupados
        ]

        horarios = [
            "08:00:00",
            "12:00:00",
            "14:00:00"
        ]

        horarios_disponiveis = [
            horario for horario in horarios
            if horario not in horarios_ocupados
        ]

        return {
            "horarios": horarios_disponiveis
        }

    return {
        "horarios": []
    }


if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5000, debug=True)
