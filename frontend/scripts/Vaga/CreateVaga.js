async function carregar() {
    try {
        // Requisição para pegar as seleções
        const response = await axios.get('http://localhost:8000/api/vaga/create');
        
        // Criação de um objeto com as seleções
        const dados = {
            selecoes: response.data.selecoes,
        };

        const selecaoSelect = document.getElementById('selecao_id');
        
        // Preenchendo o select com as opções de seleções
        dados.selecoes.forEach(selecao => {
            let option = document.createElement('option');
            option.value = selecao.selecao_id;
            option.textContent = selecao.titulo;        
            selecaoSelect.appendChild(option);
        });

    } catch (error) {
        console.error('Erro ao carregar selecoes:', error);
    }
}

window.onload = carregar;

