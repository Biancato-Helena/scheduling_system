from flask import Flask, render_template, request

app = Flask(
    __name__,
    template_folder='../templates',
    static_folder='../static'
    )

@app.route('/')

def inicio():
    return render_template("PrincipalPage.html")


@app.route("/agendar", methods=['GET', 'POST'])
def agendar():

    if request.method == 'POST':
        nome = request.form['nome']
        email = request.form['email']
        telefone = request.form['telefone']

        print(f"Nome: {nome}")
        print(f"Email: {email}")
        print(f"Telefone: {telefone}")  

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



if __name__ == '__main__':
    app.run(debug=True)
