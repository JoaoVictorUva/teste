const dadosVaga = async () => {
    try {
        const response = await axios.get('http://127.0.0.1:8000/api/vaga');  // URL da sua API
        const vagas = response.data.vagas; // Acessa o array de candidatos na resposta


        // Seleciona a tabela no DOM
        const tableBody = document.getElementById('vagas-table-body');
        tableBody.innerHTML = ''; // Limpa o conteúdo da tabela

        // Adiciona os dados dos candidatos à tabela
        vagas.forEach(vaga => {
            const row = document.createElement('tr');

            // Crie células para os dados do candidato (seguindo a ordem da tabela)
            const idVaga = document.createElement('td');
            idVaga.textContent = vaga.vaga_id;

            const idSelecao = document.createElement('td');
            idSelecao.textContent = vaga.selecao ? vaga.selecao.titulo : "Sem seleção";

            const idCargo = document.createElement('td');
            idCargo.textContent = vaga.cargo_id;

            const idCurso = document.createElement('td');
            idCurso.textContent = vaga.curso_id;

            const idArea = document.createElement('td');
            idArea.textContent = vaga.area_id;

            const tipoConcorrencia = document.createElement('td');
            tipoConcorrencia.textContent = vaga.tipo_concorrencia;

            const valorInscricao = document.createElement('td');
            valorInscricao.textContent = vaga.valor_inscricao;

            const totalVagas = document.createElement('td');
            totalVagas.textContent = vaga.total_vagas;

            const descricao = document.createElement('td');
            descricao.textContent = vaga.descricao;

            const excluirvaga = document.createElement('td');
            excluirvaga.innerHTML = `<button class="excluir" onclick="excluirVaga(${vaga.vaga_id})">Excluir</button>`;

            const editvaga = document.createElement('td');
            editvaga.innerHTML = `<button class="edit" onclick="editarVaga(${vaga.vaga_id})">Editar</button>`;

            // Adicione as células à linha
            row.appendChild(idVaga);
            row.appendChild(idSelecao);
            row.appendChild(idCargo);
            row.appendChild(idCurso);
            row.appendChild(idArea);
            row.appendChild(tipoConcorrencia);
            row.appendChild(valorInscricao);
            row.appendChild(totalVagas);
            row.appendChild(descricao);
            row.appendChild(excluirvaga);
            row.appendChild(editvaga);
            // Adicione a linha ao corpo da tabela
            tableBody.appendChild(row);
        });
    } catch (error) {
        console.error('Erro ao buscar candidatos:', error);
    }
};

document.addEventListener('DOMContentLoaded', dadosVaga);


function excluirVaga(id) {
    if (confirm('Você tem certeza que deseja excluir esta vaga?')) {
        // Chamada Axios para excluir o candidato
        axios.delete(`http://127.0.0.1:8000/api/vaga/destroy/${id}`)
            .then(response => {
                // Exibe uma mensagem de sucesso
                alert(response.data.message);
                dadosVaga();

            })
            .catch(error => {
                console.error('Erro ao excluir a vaga:', error);
            });
    }
}


async function editarVaga(id) {
    try {
        // Faz a requisição GET para obter os dados da seleção
        const response = await axios.get(`http://127.0.0.1:8000/api/vaga/${id}`);
        const vaga = response.data.vaga;

        const idVaga = document.getElementById('vaga_id');
        idVaga.value = vaga.vaga_id;

        // Preencher o campo de "vaga"
        carregar(vaga.selecao_id);

        // Preencher o campo de "Cargo"
        const cargoSelect = document.getElementById('cargo_id');
        cargoSelect.value = vaga.cargo_id;  // Certifique-se de que o 'cargo_id' está sendo retornado corretamente pela API.

        // Preencher o campo de "Curso"
        const cursoSelect = document.getElementById('curso_id');
        cursoSelect.value = vaga.curso_id;  // Certifique-se de que o 'curso_id' está sendo retornado corretamente pela API.

        // Preencher o campo de "Área"
        const areaSelect = document.getElementById('area_id');
        areaSelect.value = vaga.area_id;  // Certifique-se de que o 'area_id' está sendo retornado corretamente pela API.

        // Preencher o campo de "Tipo de Concorrência"
        document.querySelector('[name="tipo_concorrencia"]').value = vaga.tipo_concorrencia;

        // Preencher o campo de "Valor da Inscrição"
        document.getElementById('valor_inscricao').value = vaga.valor_inscricao;

        // Preencher o campo de "Total de Vagas"
        document.getElementById('total_vagas').value = vaga.total_vagas;

        // Preencher o campo de "Descrição"
        document.getElementById('descricao').value = vaga.descricao;

        // Exibir o modal
        document.getElementById('modal-vaga').style.display = 'flex';
        document.body.style.overflow = 'hidden';

    } catch (error) {
        console.error("Erro ao buscar dados da seleção:", error);
        alert("Não foi possível carregar os dados da seleção.");
    }
}



async function carregar(id) {
    try {
        const response = await axios.get('http://localhost:8000/api/vaga/create');

        // Criação de um objeto com as seleções
        const dados = {
            selecoes: response.data.selecoes,
        };

        const selecaoSelect = document.getElementById('selecao_id');

        const selecaoSelecionada = id;

        // Preenchendo o select com as opções de seleções
        dados.selecoes.forEach(selecao => {
            let option = document.createElement('option');
            option.value = selecao.selecao_id;
            option.textContent = selecao.titulo;

            // Verifica se o id da seleção atual corresponde ao id selecionado
            if (selecao.selecao_id === selecaoSelecionada) {
                option.selected = true; // Define a opção como selecionada
            }

            selecaoSelect.appendChild(option);
        });




    } catch (error) {
        console.error('Erro ao carregar selecoes:', error);
    }
}

async function enviarFormularioEditar(id) {

    const selecao_id = document.getElementById('selecao_id').value;
    const cargo_id = document.getElementById('cargo_id').value;
    const curso_id = document.getElementById('curso_id').value;
    const area_id = document.getElementById('area_id').value;
    const tipo_concorrencia = document.getElementById('tipo_concorrencia').value;
    const valor_inscricao = document.getElementById('valor_inscricao').value;
    const total_vagas = document.getElementById('total_vagas').value;
    const descricao = document.getElementById('descricao').value;

    console.log(selecao_id, cargo_id, curso_id, area_id, tipo_concorrencia, valor_inscricao, total_vagas, descricao, id);
    // Enviar a requisição PUT
    const response = await axios.put(`http://127.0.0.1:8000/api/vaga/update/${id}`, {
        selecao_id: selecao_id,
        cargo_id: cargo_id,
        curso_id: curso_id,
        area_id: area_id,
        tipo_concorrencia: tipo_concorrencia,
        valor_inscricao: valor_inscricao,
        total_vagas: total_vagas,
        descricao: descricao
    });

    if (response.status === 200) {
        alert('Vaga atualizada com sucesso!');
        fecharModal();
        window.location.reload();
    } else {
        alert('Erro ao atualizar a vaga.');
    }


}

// Lidar com o envio do formulário
document.getElementById('form-vaga').addEventListener('submit', function (event) {
    event.preventDefault();
    const vagaId = document.getElementById('vaga_id').value;
    enviarFormularioEditar(vagaId);
});


function fecharModal() {
    document.getElementById('modal-vaga').style.display = 'none';
    document.body.style.overflow = 'auto';
}
