"use strict";

const $form = document.querySelector("form");
const $ip = document.getElementById("ip");


$form.addEventListener("submit", function(e) {
  e.preventDefault();

  limparCampos();

  try {
 
    const classe = verificarClasse($ip.value);

    /* section result */
      
    const $secaoDeEntrada = document.querySelector('section');
    $secaoDeEntrada.insertAdjacentHTML('afterend', `<section class="result"></section>`);
     
    /* card */

    const $secaoResultado = document.querySelector('.result');

    $secaoResultado.insertAdjacentHTML('beforeend', criarCard('Classe', classe));
    
    $secaoResultado.insertAdjacentHTML('beforeend', criarCard('IP', ip.value, converterDecimalParaBinarioQuatroOctetos($ip.value)));

    $secaoResultado.insertAdjacentHTML('beforeend', criarCard('Rede', ));
   
    $secaoResultado.insertAdjacentHTML('beforeend', criarCard('Máscara', ));
    
    $secaoResultado.insertAdjacentHTML('beforeend', criarCard('Primeiro Endereço', ));

    $secaoResultado.insertAdjacentHTML('beforeend', criarCard('Ultimo Endereço', ));

    $secaoResultado.insertAdjacentHTML('beforeend', criarCard('Broadcast', ));
    
  } catch (error) {
    document.querySelector('body').insertAdjacentHTML('beforeend', 
    `<div class="result alert warning">
      <p>Verifique os valores inseridos</p>
    </div>`
    )
  }
});

function limparCampos(){
  document.querySelector('.result') ? document.querySelector('.result').remove() : "";
}

function criarCard(texto, valor1, valor2) {
  if (!!valor2) {
    return `<div class="card">
              <p>${texto}</p>
              <p>${valor1}</p>
              <p>${valor2}</p>
            </div>`
  } else {
    return `<div class="card">
              <p>${texto}</p>
              <p>${valor1}</p>
            </div>`
  }
}