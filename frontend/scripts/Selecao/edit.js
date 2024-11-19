// Função para obter o parâmetro 'id' da URL
function getParametroUrl(nome) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(nome);
}

// Recupera o ID codificado e decodifica
const idCodificado = getParametroUrl('selecao');
const selecaoId = idCodificado ? atob(idCodificado) : null;

if (selecaoId) {
    editarSelecao(selecaoId); // Carrega os dados do candidato
} else {
    alert('ID da selecao não encontrado');
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
    axios.post(`http://127.0.0.1:8000/api/selecao/update/${id}`, {
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
            window.location.href = '../MostrarTudo.html';
        })
        .catch(error => {
            console.error("Erro ao editar a seleção:", error);
        });



}

// Lidar com o envio do formulário
document.getElementById("form-selecao-editar").addEventListener("submit", function (event) {
    event.preventDefault();
    const selecaoId = document.getElementById('editSelecaoId').value;
    enviarFormularioSelecaoEditar(selecaoId);
});
