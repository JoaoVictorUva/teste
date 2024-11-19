document.getElementById('form-vaga').addEventListener('submit', function (event) {
    event.preventDefault();  // Previne o comportamento padrão de envio do formulário
    const selecao_id = document.getElementById('selecao_id').value;
    const cargo_id = document.getElementById('cargo_id').value;
    const curso_id = document.getElementById('curso_id').value;
    const area_id = document.getElementById('area_id').value;
    const tipo_concorrencia = document.getElementById('tipo_concorrencia').value;
    const valor_inscricao = (document.getElementById('valor_inscricao').value).replace(/\D/g, '');
    const total_vagas = document.getElementById('total_vagas').value;
    const descricao = document.getElementById('descricao').value;

    console.log(selecao_id, cargo_id, curso_id, area_id, tipo_concorrencia, valor_inscricao, total_vagas, descricao);


    // Envia os dados via AJAX para o servidor usando Axios
    axios.post('http://localhost:8000/api/vaga/store', {
        selecao_id: selecao_id,
        cargo_id: cargo_id,
        curso_id: curso_id,
        area_id: area_id,
        tipo_concorrencia: tipo_concorrencia,
        valor_inscricao: valor_inscricao,
        total_vagas: total_vagas,
        descricao: descricao
    })
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


$('#valor_inscricao').mask("#.##0,00", { reverse: true });



