// Definindo o cardápio com os valores dos itens
const menu = {
  cafe: { descricao: "Café", valor: 3.0 },
  chantily: { descricao: "Chantily (extra do Café)", valor: 1.5 },
  suco: { descricao: "Suco Natural", valor: 6.2 },
  sanduiche: { descricao: "Sanduíche", valor: 6.5 },
  queijo: { descricao: "Queijo (extra do Sanduíche)", valor: 2.0 },
  salgado: { descricao: "Salgado", valor: 7.25 },
  combo1: { descricao: "1 Suco e 1 Sanduíche", valor: 9.5 },
  combo2: { descricao: "1 Café e 1 Sanduíche", valor: 7.5 },
};

// Função para calcular o valor total do pedido
function calcularTotal(itens, metodoDePagamento) {
  let total = 0;

  if (itens.length === 0) {
    return "Não há itens no carrinho de compra!";
  }

  for (const [codigo, quantidade] of itens) {
    if (!menu[codigo]) {
      return "Item inválido!";
    }

    if (codigo !== "chantily" && codigo !== "queijo") {
      total += menu[codigo].valor * quantidade;
    } else {
      const principalQuantidade = itens.find(
        ([itemCodigo]) => itemCodigo === "sanduiche"
      )[1];
      const extraQuantidade = quantidade;

      if (extraQuantidade > principalQuantidade) {
        return "Item extra não pode ser itens sem o principal";
      }
    }
  }

  if (total === 0) {
    return "Quantidade inválida!";
  }

  if (!["dinheiro", "debito", "credito"].includes(metodoDePagamento)) {
    return "Forma de pagamento inválida!";
  }

  if (metodoDePagamento === "dinheiro") {
    total *= 0.95;
  } else if (metodoDePagamento === "credito") {
    total *= 1.03;
  }

  return `Total a pagar: R$ ${total.toFixed(2)}`;
}

// Exemplo de itens e forma de pagamento
const itensExemplo = [
  ["cafe", 2],
  ["chantily", 1],
  ["salgado", 3],
];
const metodoDePagamentoExemplo = "credito";

// Calculando o total e exibindo o resultado
const resultado = calcularTotal(itensExemplo, metodoDePagamentoExemplo);
console.log(resultado);
