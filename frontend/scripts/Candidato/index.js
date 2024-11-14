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
            cepCell.textContent = candidato.cep;

            const telefoneCell = document.createElement('td');
            telefoneCell.textContent = candidato.telefone;

            const emailCell = document.createElement('td');
            emailCell.textContent = candidato.email;

            const nacionalidadeCell = document.createElement('td');
            nacionalidadeCell.textContent = candidato.nacionalidade;

            const cpfCell = document.createElement('td');
            cpfCell.textContent = candidato.cpf;

            const rgCell = document.createElement('td');
            rgCell.textContent = candidato.rg;

            const dataExpedicaoCell = document.createElement('td');
            dataExpedicaoCell.textContent = candidato.data_expedicao;

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

async function editarCandidato(id) {
    try {
        // Faz a requisição GET para obter os dados da seleção
        const response = await axios.get(`http://127.0.0.1:8000/api/candidatos/${id}`);
        const candidato = response.data.candidato;

        // Preencher o campo "candidato_id" com o ID do candidato (se disponível)
        const candidatoId = document.getElementById('id_candidato');
        candidatoId.value = candidato.id_candidato;

        // Preencher o campo "raca_id" com o ID da raça (se disponível)
        const racaSelect = document.getElementById('id_raca');
        racaSelect.value = candidato.id_raca;

        // Preencher o campo "estado_civil_id" com o ID do estado civil (se disponível)
        const estadoCivilSelect = document.getElementById('id_estado_civil');
        estadoCivilSelect.value = candidato.id_estado_civil;

        // Preencher o campo "cidade_id" com o ID da cidade (se disponível)
        const cidadeSelect = document.getElementById('id_cidade');
        cidadeSelect.value = candidato.id_cidade;

        // Preencher o campo "nascimento_pais_id" com o ID do país de nascimento (se disponível)
        const nascimentoPaisSelect = document.getElementById('id_nascimento_pais');
        nascimentoPaisSelect.value = candidato.id_nascimento_pais;

        // Preencher o campo "estado_nascimento_id" com o ID do estado de nascimento (se disponível)
        const estadoNascimentoSelect = document.getElementById('id_estado_nascimento');
        estadoNascimentoSelect.value = candidato.id_estado_nascimento;

        // Preencher o campo "nascimento_cidade_id" com o ID da cidade de nascimento (se disponível)
        const nascimentoCidadeSelect = document.getElementById('id_nascimento_cidade');
        nascimentoCidadeSelect.value = candidato.id_nascimento_cidade;

        // Preencher o campo "nome_completo" com o nome completo (se disponível)
        const nomeCompleto = document.getElementById('nome_completo');
        nomeCompleto.value = candidato.nome_completo;

        // Preencher o campo "sexo" com o sexo (se disponível)
        const sexoMasculino = document.querySelector('input[name="sexo"][value="M"]');
        const sexoFeminino = document.querySelector('input[name="sexo"][value="F"]');

        // Definindo o sexo com base no valor de candidato.sexo
        if (candidato.sexo === 'M') {
            sexoMasculino.checked = true;
        } else if (candidato.sexo === 'F') {
            sexoFeminino.checked = true;
        }

        // Preencher o campo "deficiencia" com o valor (se disponível)
        const deficiencia = document.getElementById('deficiencia');
        deficiencia.checked = candidato.deficiencia;

        // Preencher o campo "nome_pai" com o nome do pai (se disponível)
        const nomePai = document.getElementById('nome_pai');
        nomePai.value = candidato.nome_pai;

        // Preencher o campo "nome_mae" com o nome da mãe (se disponível)
        const nomeMae = document.getElementById('nome_mae');
        nomeMae.value = candidato.nome_mae;

        // Preencher o campo "endereco" com o endereço (se disponível)
        const endereco = document.getElementById('endereco');
        endereco.value = candidato.endereco;

        // Preencher o campo "bairro" com o bairro (se disponível)
        const bairro = document.getElementById('bairro');
        bairro.value = candidato.bairro;

        // Preencher o campo "cep" com o CEP (se disponível)
        const cep = document.getElementById('cep');
        cep.value = candidato.cep;

        // Preencher o campo "telefone" com o telefone (se disponível)
        const telefone = document.getElementById('telefone');
        telefone.value = candidato.telefone;

        // Preencher o campo "email" com o e-mail (se disponível)
        const email = document.getElementById('email');
        email.value = candidato.email;

        // Preencher o campo "nacionalidade" com a nacionalidade (se disponível)
        const nacionalidade = document.getElementById('nacionalidade');
        nacionalidade.value = candidato.nacionalidade;

        // Preencher o campo "cpf" com o CPF (se disponível)
        const cpf = document.getElementById('cpf');
        cpf.value = candidato.cpf;

        // Preencher o campo "rg" com o RG (se disponível)
        const rg = document.getElementById('rg');
        rg.value = candidato.rg;

        // Preencher o campo "data_expedicao" com a data de expedição (se disponível)
        const dataExpedicao = document.getElementById('data_expedicao');
        dataExpedicao.value = candidato.data_expedicao;

        // Preencher o campo "orgao_expeditor" com o órgão expedidor (se disponível)
        const orgaoExpedidor = document.getElementById('orgao_expeditor');
        orgaoExpedidor.value = candidato.orgao_expeditor;

        // Preencher o campo "uf_expedicao" com a UF de expedição (se disponível)
        const ufExpedicao = document.getElementById('uf_expedicao');
        ufExpedicao.value = candidato.uf_expedicao;

        // Preencher o campo "escolaridade" com a escolaridade (se disponível)
        const escolaridade = document.getElementById('escolaridade');
        escolaridade.value = candidato.escolaridade;


        // Exibir o modal
        document.getElementById('modal-candidato').style.display = 'flex';
        document.body.style.overflow = 'hidden';

    } catch (error) {
        console.error("Erro ao buscar dados da seleção:", error);
        alert("Não foi possível carregar os dados da seleção.");
    }
}


// Lidar com o envio do formulário
async function enviarFormularioCandidatoEditar(id) {


    const id_raca = document.getElementById('id_raca').value;
    const id_estado_civil = document.getElementById('id_estado_civil').value;
    const id_cidade = document.getElementById('id_cidade').value;
    const id_nascimento_pais = document.getElementById('id_nascimento_pais').value;
    const id_estado_nascimento = document.getElementById('id_estado_nascimento').value;
    const id_nascimento_cidade = document.getElementById('id_nascimento_cidade').value;
    const nome_completo = document.getElementById('nome_completo').value;

    // Seleciona o radio button de sexo baseado no valor de candidato.sexo
    const sexo = document.querySelector('input[name="sexo"]:checked').value;

    // Verifica se a pessoa tem deficiência
    const deficiencia = document.getElementById('deficiencia').checked ? 1 : 0;

    const nome_pai = document.getElementById('nome_pai').value;
    const nome_mae = document.getElementById('nome_mae').value;
    const endereco = document.getElementById('endereco').value;
    const bairro = document.getElementById('bairro').value;
    const cep = document.getElementById('cep').value;
    const telefone = document.getElementById('telefone').value;
    const email = document.getElementById('email').value;
    const nacionalidade = document.getElementById('nacionalidade').value;
    const cpf = document.getElementById('cpf').value;
    const rg = document.getElementById('rg').value;
    const data_expedicao = document.getElementById('data_expedicao').value;
    const orgao_expeditor = document.getElementById('orgao_expeditor').value;
    const uf_expedicao = document.getElementById('uf_expedicao').value;
    const escolaridade = document.getElementById('escolaridade').value;


    // Enviar a requisição PUT
    const response = await axios.put(`http://127.0.0.1:8000/api/candidatos/update/${id}`, {
        id_raca: id_raca,
        id_estado_civil: id_estado_civil,
        id_cidade: id_cidade,
        id_nascimento_pais: id_nascimento_pais,
        id_estado_nascimento: id_estado_nascimento,
        id_nascimento_cidade: id_nascimento_cidade,
        nome_completo: nome_completo,
        sexo: sexo,
        deficiencia: deficiencia,
        nome_pai: nome_pai,
        nome_mae: nome_mae,
        endereco: endereco,
        bairro: bairro,
        cep: cep,
        telefone: telefone,
        email: email,
        nacionalidade: nacionalidade,
        cpf: cpf,
        rg: rg,
        data_expedicao: data_expedicao,
        orgao_expeditor: orgao_expeditor,
        uf_expedicao: uf_expedicao,
        escolaridade: escolaridade
    });

    if (response.status === 200) {
        alert("Candidato atualizado com sucesso!");
        fecharModal();
        window.location.reload();
    } else {
        alert("Erro ao atualizar o candidato.");
    }


}

// Lidar com o envio do formulário
document.getElementById('form-candidato').addEventListener('submit', function (event) {
    event.preventDefault();
    const candidatoId = document.getElementById('id_candidato').value;
    enviarFormularioCandidatoEditar(candidatoId);
});



function fecharModal() {
    document.getElementById('modal-candidato').style.display = 'none';
    document.body.style.overflow = 'auto';
}