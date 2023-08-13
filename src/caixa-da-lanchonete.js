class CaixaDaLanchonete {
  constructor() {
    this.cardapio = {
      cafe: { descricao: "Café", valor: 3.0 },
      chantily: { descricao: "Chantily (extra do Café)", valor: 1.5 },
      suco: { descricao: "Suco Natural", valor: 6.2 },
      sanduiche: { descricao: "Sanduíche", valor: 6.5 },
      queijo: { descricao: "Queijo (extra do Sanduíche)", valor: 2.0 },
      salgado: { descricao: "Salgado", valor: 7.25 },
      combo1: { descricao: "1 Suco e 1 Sanduíche", valor: 9.5 },
      combo2: { descricao: "1 Café e 1 Sanduíche", valor: 7.5 },
    };

    this.formasPagamento = ["dinheiro", "debito", "credito"];
  }

  calcularValorDaCompra(metodoDePagamento, itens) {
    if (itens.length === 0) {
      
      return "Não há itens no carrinho de compra!";
    }

    let metodo = metodoDePagamento;
    let total = 0;
    let itensRecebidos = itens.map((x) => x.split(","));

    for (let i = 0; i < itensRecebidos.length; i++) {
      let codigoItem = itensRecebidos[i][0];
      let quantidade = Number(itensRecebidos[i][1]);

      if (!this.cardapio[codigoItem]) {
        
        return "Item inválido!";
      }

      if (isNaN(quantidade) || quantidade === 0) {
       
        return "Quantidade inválida!";
      }

      let itemCardapio = this.cardapio[codigoItem];

      if (itemCardapio === this.cardapio.chantily) {
        const temCafe = itensRecebidos.filter(
          (item) => this.cardapio[item[0]] === this.cardapio.cafe
        );

        if (!temCafe.length) {
          
          return "Item extra não pode ser pedido sem o principal";
        }
      }
      if (itemCardapio === this.cardapio.queijo) {
        const temCafe = itensRecebidos.filter(
          (item) => this.cardapio[item[0]] === this.cardapio.sanduiche
        );

        if (!temCafe.length) {
         
          return "Item extra não pode ser pedido sem o principal";
        }
      }
      let subtotal = itemCardapio.valor * quantidade;
      total += subtotal;
    }

    if (this.formasPagamento.includes(metodo)) {
      if (metodo === "dinheiro") {
        total *= 0.95;
      } else if (metodo === "credito") {
        total *= 1.03;
      }
      console.log("R$ " + total.toFixed(2));
      return "R$ " + total.toFixed(2).replace(".", ",");
    } else {
      
      return "Forma de pagamento inválida!";
    }
  }
}
export { CaixaDaLanchonete };
