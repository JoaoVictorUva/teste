document.getElementById("form-candidato").addEventListener("submit", function (event) {
    event.preventDefault(); // Evita o envio tradicional do formulário
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

    // Envio dos dados com Axios
    axios.post('http://127.0.0.1:8000/api/candidatos/store', {
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
    })
        .then(response => {
            // Tratamento de resposta com sucesso
            alert('Cadastro realizado com sucesso!');
            document.getElementById('form-candidato').reset();
        })
        .catch(error => {
            // Tratamento de erros
            alert('Erro ao cadastrar. Por favor, tente novamente.');
        });
});

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



