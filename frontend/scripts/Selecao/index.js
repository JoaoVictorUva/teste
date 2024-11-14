//  Selecoes
// Função para buscar os dados e exibir na tabela
const dadosSelecoes = async () => {
    try {
        const response = await axios.get('http://127.0.0.1:8000/api/selecao');  // URL da sua API
        const selecoes = response.data.selecao; // Acessa o array de candidatos na resposta

        // Seleciona a tabela no DOM
        const tableBody = document.getElementById('selecoes-table-body');
        tableBody.innerHTML = ''; // Limpa o conteúdo da tabela

        // Adiciona os dados dos candidatos à tabela
        selecoes.forEach(selecao => {
            const row = document.createElement('tr');

            // Crie células para os dados do candidato (seguindo a ordem da tabela)
            const idSelecao = document.createElement('td');
            idSelecao.textContent = selecao.selecao_id;

            const titulo = document.createElement('td');
            titulo.textContent = selecao.titulo;

            const edital = document.createElement('td');
            edital.innerHTML = `<a href="http://127.0.0.1:8000/storage/${selecao.edital}">edital</a>`;

            const informacoesGerais = document.createElement('td');
            informacoesGerais.textContent = selecao.informacoes_gerais;

            const inscricaoInicio = document.createElement('td');
            inscricaoInicio.textContent = selecao.inscricao_inicio;

            const inscricaoFim = document.createElement('td');
            inscricaoFim.textContent = selecao.inscricao_fim;

            const exibirEdital = document.createElement('td');
            exibirEdital.textContent = selecao.exibir_edital;

            const exibirResultadoInscricao = document.createElement('td');
            exibirResultadoInscricao.textContent = selecao.exibir_resultado_inscricao;

            const finalizado = document.createElement('td');
            finalizado.textContent = selecao.finalizado;

            const resultado = document.createElement('td');
            resultado.textContent = selecao.resultado;

            const excluirSelecao = document.createElement('td');
            excluirSelecao.innerHTML = `<button class="excluir" onclick="excluirSelecao(${selecao.selecao_id})">Excluir</button>`;

            const editSelecao = document.createElement('td');
            editSelecao.innerHTML = `<button class="edit" onclick="editarSelecao(${selecao.selecao_id})">Editar</button>`;

            // Adicione as células à linha
            row.appendChild(idSelecao);
            row.appendChild(titulo);
            row.appendChild(edital);
            row.appendChild(informacoesGerais);
            row.appendChild(inscricaoInicio);
            row.appendChild(inscricaoFim);
            row.appendChild(exibirEdital);
            row.appendChild(exibirResultadoInscricao);
            row.appendChild(finalizado);
            row.appendChild(resultado);
            row.appendChild(excluirSelecao);
            row.appendChild(editSelecao);

            // Adicione a linha ao corpo da tabela
            tableBody.appendChild(row);
        });
    } catch (error) {
        console.error('Erro ao buscar candidatos:', error);
    }
};

document.addEventListener('DOMContentLoaded', dadosSelecoes);

// Função para excluir uma selecao
function excluirSelecao(id) {
    if (confirm('Você tem certeza que deseja excluir esta seleção?')) {
        // Chamada Axios para excluir o candidato
        axios.delete(`http://127.0.0.1:8000/api/selecao/destroy/${id}`)
            .then(response => {

                if (response.data.success != undefined) {
                    alert(response.data.success);
                    dadosSelecoes();
                } else {
                    alert(response.data.error);
                }

            })
            .catch(error => {
            });
    }
}

async function editarSelecao(id) {
    try {
        const response = await axios.get(`http://127.0.0.1:8000/api/selecao/${id}`);
        const selecao = response.data.selecao;

        // Preencher o formulário do modal com os dados da seleção
        document.getElementById('editTitulo').value = selecao.titulo;
        document.getElementById('editSelecaoId').value = selecao.selecao_id;
        document.getElementById('editInformacoes_gerais').value = selecao.informacoes_gerais;
        document.getElementById('editInscricao_inicio').value = selecao.inscricao_inicio;
        document.getElementById('editInscricao_fim').value = selecao.inscricao_fim;
        document.getElementById('editExibir_edital').checked = selecao.exibir_edital === 1;
        document.getElementById('editExibir_resultado_inscricao').checked = selecao.exibir_resultado_inscricao === 1;
        document.getElementById('editFinalizado').checked = selecao.finalizado === 1;
        document.getElementById('editResultado').value = selecao.resultado;

        // Exibir o modal
        document.getElementById('modal-selecao').style.display = 'flex';
        document.body.style.overflow = 'hidden';
    } catch (error) {
        console.error("Erro ao buscar dados da seleção:", error);
        alert("Não foi possível carregar os dados da seleção.");
    }
}

// Função para lidar com o envio do formulário de seleção
async function enviarFormularioSelecaoEditar(id) {

    // Adicionar os dados do formulário manualmente, se necessário
    const titulo = document.getElementById('editTitulo').value;
    const informacoes_gerais = document.getElementById('editInformacoes_gerais').value;
    const inscricao_inicio = document.getElementById('editInscricao_inicio').value;
    const inscricao_fim = document.getElementById('editInscricao_fim').value;
    const exibir_edital = document.getElementById('editExibir_edital').checked ? '1' : '0';
    const exibir_resultado_inscricao = document.getElementById('editExibir_resultado_inscricao').checked ? '1' : '0';
    const finalizado = document.getElementById('editFinalizado').checked ? '1' : '0';
    const resultado = document.getElementById('editResultado').value;

    // Adiciona o arquivo PDF
    const edital = document.getElementById('editEdital').files[0];

    // Configura a requisição
    axios.put(`http://127.0.0.1:8000/api/selecao/update/${id}`, {
        titulo: titulo,
        informacoes_gerais: informacoes_gerais,
        inscricao_inicio: inscricao_inicio,
        inscricao_fim: inscricao_fim,
        exibir_edital: exibir_edital,
        exibir_resultado_inscricao: exibir_resultado_inscricao,
        finalizado: finalizado,
        resultado: resultado,
        edital: edital

    }, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
        .then(response => {
            // Exibir mensagem de sucesso
            alert('Dados salvos com sucesso!');
            fecharModal();
            window.location.reload();
        })
        .catch(error => {
            alert('Ocorreu um erro ao salvar os dados!');
        });



}

// Lidar com o envio do formulário
document.getElementById("form-selecao-editar").addEventListener("submit", function (event) {
    event.preventDefault();
    const selecaoId = document.getElementById('editSelecaoId').value;
    enviarFormularioSelecaoEditar(selecaoId);
});




function fecharModal() {
    document.getElementById('modal-selecao').style.display = 'none';
    document.body.style.overflow = 'auto';
}
