var items = [];

document.querySelector('input[type=submit]')
.addEventListener('click',()=>{
    var nomeProduto = document.querySelector('input[name=nome_produto]')
    var precoProduto = document.querySelector('input[name=price]')

    items.push({
        nome: nomeProduto.value,
        valor: precoProduto.value
    })

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
        listaProdutos.innerHTML+=`
        <div class="lista-produto-single">
            <h3>`+val.nome+`</h3>
            <h3 class="price-produto"><span>R$`+val.valor+`</span></h3>
            <button name="excluir-produto">Excluir</button>
        </div>
        `
    })

    soma = soma.toFixed(2)
    nomeProduto.value = ''
    precoProduto.value = ''

    let elementoSoma = document.querySelector('.soma-produto h1')
    elementoSoma.innerHTML = 'R$' + soma

})

document.querySelector('.lista-produtos')
.addEventListener('click', function(e) {
    if (e.target && e.target.getAttribute('name') === 'excluir-produto') {

        const produtoDiv = e.target.closest('.lista-produto-single');
        const nomeProduto = produtoDiv.querySelector('h3').innerText;

        items = items.filter(item => item.nome !== nomeProduto);

        let listaProdutos = document.querySelector('.lista-produtos');
        let soma = 0;
        listaProdutos.innerHTML = '';
        items.map(function(val){
            soma += parseFloat(val.valor);
            listaProdutos.innerHTML += `
            <div class="lista-produto-single">
                <h3>`+val.nome+`</h3>
                <h3 class="price-produto"><span>R$`+val.valor+`</span></h3>
                <button class="excluir-produto" name="excluir-produto">Excluir</button>
            </div>
            `;
        });

        soma = soma.toFixed(2);
        let elementoSoma = document.querySelector('.soma-produto h1');
        elementoSoma.innerHTML = 'R$' + soma;
    }
});

document.querySelector('button[name=limpar]')
.addEventListener('click',()=>{
    items = []
    document.querySelector('.lista-produtos').innerHTML = ''
    document.querySelector('.soma-produto h1').innerHTML = 'Total: R$ 0'
})