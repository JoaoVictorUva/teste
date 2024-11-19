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
            inscricaoInicio.textContent = formatarData(selecao.inscricao_inicio);

            const inscricaoFim = document.createElement('td');
            inscricaoFim.textContent = formatarData(selecao.inscricao_fim);

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

function formatarData(inputData) {
    const data = new Date(inputData);
    const dia = String(data.getDate()).padStart(2, '0'); // Formata o dia com 2 dígitos
    const mes = String(data.getMonth() + 1).padStart(2, '0'); // Mes começa do 0, então somamos 1
    const ano = data.getFullYear();

    return `${dia}/${mes}/${ano}`; // Formato dd/mm/yyyy
}

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


function editarSelecao(idSelecao) {
    const idCodificado = btoa(idSelecao); // Codifica o ID
    window.location.href = `Selecao/editarSelecao.html?selecao=${idCodificado}`; // Passa o ID codificado na URL
}
