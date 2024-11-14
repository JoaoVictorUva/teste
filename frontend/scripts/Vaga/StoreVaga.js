document.getElementById('form-vaga').addEventListener('submit', function(event) {
    event.preventDefault();  // Previne o comportamento padrão de envio do formulário

    // Coleta os dados do formulário
    const formData = new FormData(this);

    // Envia os dados via AJAX para o servidor usando Axios
    axios.post('http://localhost:8000/api/vaga/store', formData)
        .then(response => {
            // Aqui verificamos a resposta do servidor
            alert('Dados salvos com sucesso!');
            
            // Limpa o formulário após salvar
            document.getElementById('form-vaga').reset();

        })
        .catch(error => {
            // Se ocorrer algum erro na requisição, ele será capturado aqui
            console.error('Erro:', error);
            alert('Ocorreu um erro. Tente novamente.');
        });
});
