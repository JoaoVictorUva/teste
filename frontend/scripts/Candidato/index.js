// Defina a função dadosCandidatos globalmente, fora do evento DOMContentLoaded
const dadosCandidatos = async () => {
    try {
        const response = await axios.get('http://127.0.0.1:8000/api/candidatos');  // URL da sua API
        const candidatos = response.data.candidatos; // Acessa o array de candidatos na resposta

        // Seleciona a tabela no DOM
        const tableBody = document.getElementById('candidatos-table-body');
        tableBody.innerHTML = ''; // Limpa o conteúdo da tabela

        // Adiciona os dados dos candidatos à tabela
        candidatos.forEach(candidato => {
            const row = document.createElement('tr');

            // Crie células para os dados do candidato (seguindo a ordem da tabela)
            const idCell = document.createElement('td');
            idCell.textContent = candidato.id_candidato;

            const racaCell = document.createElement('td');
            racaCell.textContent = candidato.id_raca;

            const estadoCivilCell = document.createElement('td');
            estadoCivilCell.textContent = candidato.id_estado_civil;

            const cidadeCell = document.createElement('td');
            cidadeCell.textContent = candidato.id_cidade;

            const nascimentoPaisCell = document.createElement('td');
            nascimentoPaisCell.textContent = candidato.id_nascimento_pais;

            const estadoNascimentoCell = document.createElement('td');
            estadoNascimentoCell.textContent = candidato.id_estado_nascimento;

            const nascimentoCidadeCell = document.createElement('td');
            nascimentoCidadeCell.textContent = candidato.id_nascimento_cidade;

            const nomeCell = document.createElement('td');
            nomeCell.textContent = candidato.nome_completo;

            const sexoCell = document.createElement('td');
            sexoCell.textContent = candidato.sexo === 'M' ? 'Masculino' : 'Feminino';

            const deficienciaCell = document.createElement('td');
            deficienciaCell.textContent = candidato.deficiencia ? 'Sim' : 'Não';

            const nomePaiCell = document.createElement('td');
            nomePaiCell.textContent = candidato.nome_pai;

            const nomeMaeCell = document.createElement('td');
            nomeMaeCell.textContent = candidato.nome_mae;

            const enderecoCell = document.createElement('td');
            enderecoCell.textContent = candidato.endereco;

            const bairroCell = document.createElement('td');
            bairroCell.textContent = candidato.bairro;

            const cepCell = document.createElement('td');
            cepCell.textContent = CepMask(candidato.cep);

            const telefoneCell = document.createElement('td');
            telefoneCell.textContent = PhoneMask(candidato.telefone);

            const emailCell = document.createElement('td');
            emailCell.textContent = candidato.email;

            const nacionalidadeCell = document.createElement('td');
            nacionalidadeCell.textContent = candidato.nacionalidade;

            const cpfCell = document.createElement('td');
            cpfCell.textContent = CpfMask(candidato.cpf);

            const rgCell = document.createElement('td');
            rgCell.textContent = candidato.rg;

            const dataExpedicaoCell = document.createElement('td');
            dataExpedicaoCell.textContent = formatarData(candidato.data_expedicao);

            const orgaoExpedicaoCell = document.createElement('td');
            orgaoExpedicaoCell.textContent = candidato.orgao_expeditor;

            const ufExpedicaoCell = document.createElement('td');
            ufExpedicaoCell.textContent = candidato.uf_expedicao;

            const escolaridadeCell = document.createElement('td');
            escolaridadeCell.textContent = candidato.escolaridade;

            const excluirCell = document.createElement('td');
            excluirCell.innerHTML = `<button class="excluir" onclick="excluirCandidato(${candidato.id_candidato})">Excluir</button>`;

            const editCell = document.createElement('td');
            editCell.innerHTML = `<button class="edit" onclick="editarCandidato(${candidato.id_candidato})">Editar</button>`;

            // Adicione as células à linha
            row.appendChild(idCell);
            row.appendChild(racaCell);
            row.appendChild(estadoCivilCell);
            row.appendChild(cidadeCell);
            row.appendChild(nascimentoPaisCell);
            row.appendChild(estadoNascimentoCell);
            row.appendChild(nascimentoCidadeCell);
            row.appendChild(nomeCell);
            row.appendChild(sexoCell);
            row.appendChild(deficienciaCell);
            row.appendChild(nomePaiCell);
            row.appendChild(nomeMaeCell);
            row.appendChild(enderecoCell);
            row.appendChild(bairroCell);
            row.appendChild(cepCell);
            row.appendChild(telefoneCell);
            row.appendChild(emailCell);
            row.appendChild(nacionalidadeCell);
            row.appendChild(cpfCell);
            row.appendChild(rgCell);
            row.appendChild(dataExpedicaoCell);
            row.appendChild(orgaoExpedicaoCell);
            row.appendChild(ufExpedicaoCell);
            row.appendChild(escolaridadeCell);
            row.appendChild(excluirCell);
            row.appendChild(editCell);

            // Adicione a linha ao corpo da tabela
            tableBody.appendChild(row);
        });
    } catch (error) {
        console.error('Erro ao buscar candidatos:', error);
    }
};


const CpfMask = (value) => {
    // Remove qualquer coisa que não seja número
    value = value.replace(/\D/g, '')

    // Aplica a máscara no formato XXX.XXX.XXX-XX
    value = value.replace(/(\d{3})(\d)/, "$1.$2")
    value = value.replace(/(\d{3})(\d)/, "$1.$2")
    value = value.replace(/(\d{3})(\d{1,2})$/, "$1-$2")
    return value
}

const CepMask = (value) => {
    // Remove qualquer coisa que não seja número
    value = value.replace(/\D/g, '')

    // Aplica a máscara no formato XXXXX-XXX
    value = value.replace(/(\d{5})(\d)/, "$1-$2")
    return value
}

const PhoneMask = (value) => {
    // Remove qualquer coisa que não seja número
    value = value.replace(/\D/g, '')

    // Aplica a máscara no formato (XX) XXXXX-XXXX
    value = value.replace(/(\d{2})(\d)/, "($1) $2")
    value = value.replace(/(\d{5})(\d)/, "$1-$2")
    return value
}

function formatarData(inputData) {
    const data = new Date(inputData);
    const dia = String(data.getDate()).padStart(2, '0'); // Formata o dia com 2 dígitos
    const mes = String(data.getMonth() + 1).padStart(2, '0'); // Mes começa do 0, então somamos 1
    const ano = data.getFullYear();

    return `${dia}/${mes}/${ano}`; // Formato dd/mm/yyyy
}


// Chama a função para exibir os candidatos assim que a página for carregada
document.addEventListener('DOMContentLoaded', dadosCandidatos);

// Função para excluir um candidato
function excluirCandidato(id) {
    if (confirm('Você tem certeza que deseja excluir este candidato?')) {
        // Chamada Axios para excluir o candidato
        axios.delete(`http://127.0.0.1:8000/api/candidatos/destroy/${id}`)
            .then(response => {
                // Exibe uma mensagem de sucesso
                alert(response.data.message);
                dadosCandidatos(); // Atualiza a tabela de candidatos
            })
            .catch(error => {
                console.error('Erro ao excluir candidato:', error);
            });
    }
}


function editarCandidato(idCandidato) {
    const idCodificado = btoa(idCandidato); // Codifica o ID
    window.location.href = `Candidato/editarCandidato.html?candidato=${idCodificado}`; // Passa o ID codificado na URL
}
