// Função para obter o parâmetro 'id' da URL
function getParametroUrl(nome) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(nome);
}

// Recupera o ID codificado e decodifica
const idCodificado = getParametroUrl('vaga');
const vagaId = idCodificado ? atob(idCodificado) : null;

if (vagaId) {
    editarVaga(vagaId); // Carrega os dados do candidato
} else {
    alert('ID do candidato não encontrado');
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
        document.getElementById('tipo_concorrencia').value = vaga.tipo_concorrencia;

        // Preencher o campo de "Valor da Inscrição"
        document.getElementById('valor_inscricao').value = valorInscricaoMask1(vaga.valor_inscricao);

        // Preencher o campo de "Total de Vagas"
        document.getElementById('total_vagas').value = vaga.total_vagas;

        // Preencher o campo de "Descrição"
        document.getElementById('descricao').value = vaga.descricao;


    } catch (error) {
        console.error("Erro ao buscar dados da seleção:", error);
        alert("Não foi possível carregar os dados da seleção.");
    }
}


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
    const valor_inscricao = (document.getElementById('valor_inscricao').value).replace(/\D/g, '');
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
        window.location.href = "../MostrarTudo.html";
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


$('#valor_inscricao').mask("#.##0,00", { reverse: true });




