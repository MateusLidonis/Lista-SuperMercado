var items = [];

let dadosSalvos = localStorage.getItem('listaProdutos')
if (dadosSalvos) {
    items = JSON.parse(dadosSalvos)
    atualizarLista()
}

document.querySelector('input[type=submit]')
.addEventListener('click',()=>{
    var nomeProduto = document.querySelector('input[name=nome_produto]')
    var precoProduto = document.querySelector('input[name=price]')

    if (nomeProduto.value && precoProduto.value){
        items.push({
            nome: nomeProduto.value,
            valor: precoProduto.value
        })

        nomeProduto.value = ''
        precoProduto.value = ''

        atualizarLista()
    }
})

document.querySelector('.lista-produtos')
.addEventListener('click', function(e) {
    if (e.target && e.target.getAttribute('name') === 'excluir-produto') {

        const produtoDiv = e.target.closest('.lista-produto-single');
        const index = Array.from(document.querySelectorAll('.lista-produto-single')).indexOf(produtoDiv);

        if (index !== -1) {
            items.splice(index, 1);
            atualizarLista()
        }
    }
});

document.querySelector('button[name=limpar]')
.addEventListener('click',()=>{
    items = []
    atualizarLista()
})

function atualizarLista(){
    /*
        <div class="lista-produto-single">
            <h3>Chocolate</h3>
            <h3 class="price-produto"><span>R$15,00</span></h3>
        </div>
    */

        let listaProdutos = document.querySelector('.lista-produtos')
        let soma = 0
    
        listaProdutos.innerHTML = ''
        items.map(function(val){
            soma += parseFloat(val.valor)
            listaProdutos.innerHTML += `
            <div class="lista-produto-single">
                <h3>${val.nome}</h3>
                <h3 class="price-produto"><span>R$${parseFloat(val.valor).toFixed(2)}</span></h3>
                <button name="excluir-produto">Excluir</button>
            </div>
            `
        })
    
        soma = soma.toFixed(2)
        document.querySelector('.soma-produto h1').innerHTML = 'R$' + soma;

        localStorage.setItem('listaProdutos', JSON.stringify(items))
}