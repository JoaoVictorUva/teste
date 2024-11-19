// Função para obter o parâmetro 'id' da URL
function getParametroUrl(nome) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(nome);
}

// Recupera o ID codificado e decodifica
const idCodificado = getParametroUrl('candidato');
const candidatoId = idCodificado ? atob(idCodificado) : null;

if (candidatoId) {
    editarCandidato(candidatoId); // Carrega os dados do candidato
} else {
    alert('ID do candidato não encontrado');
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
        cep.value = CepMask(candidato.cep);

        // Preencher o campo "telefone" com o telefone (se disponível)
        const telefone = document.getElementById('telefone');
        telefone.value = PhoneMask(candidato.telefone);

        // Preencher o campo "email" com o e-mail (se disponível)
        const email = document.getElementById('email');
        email.value = candidato.email;

        // Preencher o campo "nacionalidade" com a nacionalidade (se disponível)
        const nacionalidade = document.getElementById('nacionalidade');
        nacionalidade.value = candidato.nacionalidade;

        // Preencher o campo "cpf" com o CPF (se disponível)
        const cpf = document.getElementById('cpf');
        cpf.value = CpfMask(candidato.cpf);

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
    const cep = (document.getElementById('cep').value).replace(/\D/g, '');
    const telefone = (document.getElementById('telefone').value).replace(/\D/g, '');
    const email = document.getElementById('email').value;
    const nacionalidade = document.getElementById('nacionalidade').value;
    const cpf = (document.getElementById('cpf').value).replace(/\D/g, '');
    const rg = document.getElementById('rg').value;
    const data_expedicao = document.getElementById('data_expedicao').value;
    const orgao_expeditor = document.getElementById('orgao_expeditor').value;
    const uf_expedicao = document.getElementById('uf_expedicao').value;
    const escolaridade = document.getElementById('escolaridade').value;


    //Enviar a requisição PUT
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
        window.location.href = "../MostrarTudo.html";
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

////////////////////////////////////////////////////////

// mascara para Mostrar assim que entrar no formulario os dados que estao sem formatacao ja serem formatados de acordo das mascaras

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
////////////////////////////////////////////////////////

////////////////////////////////////////////////////////

// mascaras ao decorrer dos cliques 

//mascara telefone
const handlePhone = (event) => {
    let input = event.target
    input.value = phoneMask(input.value)
}

const phoneMask = (value) => {
    if (!value) return ""
    value = value.replace(/\D/g, '')
    value = value.replace(/(\d{2})(\d)/, "($1) $2")
    value = value.replace(/(\d)(\d{4})$/, "$1-$2")
    return value
}

//mascara cpf
const handleCpf = (event) => {
    let input = event.target
    input.value = cpfMask(input.value)
}

const cpfMask = (value) => {
    if (!value) return ""
    value = value.replace(/\D/g, '') // Remove qualquer coisa que não seja número
    value = value.replace(/(\d{3})(\d)/, "$1.$2")
    value = value.replace(/(\d{3})(\d)/, "$1.$2")
    value = value.replace(/(\d{3})(\d{1,2})$/, "$1-$2")
    return value
}


//mascara cep
const handleCep = (event) => {
    let input = event.target
    input.value = cepMask(input.value)
}

const cepMask = (value) => {
    if (!value) return ""
    value = value.replace(/\D/g, '') // Remove qualquer coisa que não seja número
    value = value.replace(/(\d{5})(\d)/, "$1-$2")
    return value
}
