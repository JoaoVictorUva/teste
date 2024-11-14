document.getElementById("form-candidato").addEventListener("submit", function(event) {
    event.preventDefault(); // Evita o envio tradicional do formulário

    // Captura os dados do formulário
    const formData = new FormData(this);

    // Converte para JSON para facilitar o envio ao servidor
    const data = {};
    formData.forEach((value, key) => {
        data[key] = value;
    });

    // Envio dos dados com Axios
    axios.post('http://127.0.0.1:8000/api/candidatos/store', data)
        .then(response => {
            // Tratamento de resposta com sucesso
            alert('Cadastro realizado com sucesso!');
            document.getElementById('form-candidato').reset();
        })
        .catch(error => {
            // Tratamento de erros
            alert('Erro ao cadastrar. Por favor, tente novamente.');
        });
});
