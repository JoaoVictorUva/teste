document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('form-selecao');

    form.addEventListener('submit', function (event) {
        event.preventDefault();  // Evita o envio tradicional do formulário

        const formData = new FormData(form);  // Cria um FormData a partir do formulário

        // Adicionar os dados do formulário manualmente, se necessário
        formData.append('titulo', document.getElementById('titulo').value);
        formData.append('informacoes_gerais', document.getElementById('informacoes_gerais').value);
        formData.append('inscricao_inicio', document.getElementById('inscricao_inicio').value);
        formData.append('inscricao_fim', document.getElementById('inscricao_fim').value);
        formData.append('resultado', document.getElementById('resultado').value);

        // Verifica se os checkboxes estão marcados e adiciona seus valores ao FormData
        formData.append('exibir_edital', document.getElementById('exibir_edital').checked ? '1' : '0');
        formData.append('exibir_resultado_inscricao', document.getElementById('exibir_resultado_inscricao').checked ? '1' : '0');
        formData.append('finalizado', document.getElementById('finalizado').checked ? '1' : '0');

        // Adiciona o arquivo PDF
        const editalFile = document.getElementById('edital').files[0];
        if (editalFile) {
            formData.append('edital', editalFile);
        }

        // Configura a requisição
        axios.post('http://127.0.0.1:8000/api/selecao/store', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        })
            .then(response => {
                // Exibir mensagem de sucesso
                mensagemDiv.style.display = 'block';
                mensagemTexto.textContent = 'Cadastro realizado com sucesso!';
                mensagemTexto.style.color = 'green';
            })
            .catch(error => {
                // Exibir mensagem de erro

            });
    });
});
