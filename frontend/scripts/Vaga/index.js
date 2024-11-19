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
            valorInscricao.textContent = valorInscricaoMask1(vaga.valor_inscricao);

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

const valorInscricaoMask1 = (value) => {
    // Certifique-se de que o valor é uma string e remova todos os caracteres não numéricos
    let cleaned = String(value).replace(/\D/g, '');

    // Divide os valores em inteiros e centavos
    let reais = cleaned.slice(0, cleaned.length - 2) || '0'; // Os reais
    let centavos = cleaned.slice(cleaned.length - 2) || '00'; // Os centavos

    // Aplica a máscara
    let formatted = 'R$ ';

    // Se não houver valor para os reais, coloca '0'
    if (reais.length > 0) {
        formatted += reais.replace(/\B(?=(\d{3})+(?!\d))/g, '.') // Formata os reais com ponto a cada 3 dígitos
    }
    formatted += `,${centavos}`; // Coloca a vírgula e os centavos

    return formatted;
}


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


function editarVaga(idVaga) {
    const idCodificado = btoa(idVaga); // Codifica o ID
    window.location.href = `Vaga/editarVaga.html?vaga=${idCodificado}`; // Passa o ID codificado na URL
}