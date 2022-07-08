"use strict";

function verificarClasse(ip) {
  ip = validarEntrada(ip);
  return tipoClasse(primeiroOcteto(ip));
}

function validarEntrada(value) {
  if (ehVazio(value)) {
    throw new Error("Passe algum valor por parâmetro");
  }

  if (!ehString(value)) {
    throw new Error("O parâmeto deve ser do tipo String");
  }

  value = value.trim();

  if (!ehValidoMascaraOrIP(value)) {
    throw new Error(
      "Utilize pontos para separar os valores e não deixe espaços"
    );
  }

  return value;
}

function ehVazio(value) {
  return !!!value;
}

function ehString(value) {
  return typeof value === "string";
}

function converterDecimalParaBinario(decimal) {
  return (decimal >>> 0).toString(2);
}

function primeiroOcteto(value) {
  value = value.split(".");
  value = converterDecimalParaBinario(value[0]);
  return preencherOcteto(value);
}

function preencherOcteto(value) {
  return "00000000".slice(value.length) + value;
}

function tipoClasse(octeto) {
  if (octeto.slice(0, 1) === "0") {
    return "A";
  } else if (octeto.slice(0, 2) === "10") {
    return "B";
  } else if (octeto.slice(0, 3) === "110") {
    return "C";
  } else if (octeto.slice(0, 4) === "1110") {
    return "D";
  } else if (octeto.slice(0, 4) === "1111") {
    return "E";
  }
}

function verificarMascara(mascara, classeIp) {
  mascara = validarEntrada(mascara);

  if (classeIp === "A") {
    const regExp = /^(((255)\.([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|2[0-5][0-5]))\.0\.0)|((((255)\.){2}([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|2[0-5][0-5]))\.0)|((((255)\.){3}([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|2[0-5][0-5])))$/;
    return regExp.test(mascara);
  }

  if (classeIp === "B") {
    const regExp = /^((((255)\.){2}([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|2[0-5][0-5]))\.0)|((((255)\.){3}([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|2[0-5][0-5])))$/;
    return regExp.test(mascara);
  }

  if (classeIp === "C") {
    const regExp = /^((((255)\.){3}([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|2[0-5][0-5])))$/;
    return regExp.test(mascara);
  }

  return false;
}

/* 
   Operação AND entre IP e Máscara
*/
function verificarRede(ip, mascara) {
  ip = converterDecimalParaBinarioQuatroOctetos(ip);
  mascara = converterDecimalParaBinarioQuatroOctetos(mascara);

  let rede = "";

  for (let i = 0; i < ip.length; i++) {
    let ipBin = ip.charAt(i);
    let mascaraBin = mascara.charAt(i);

    if (ipBin === "." || mascaraBin === ".") {
      rede += ipBin || mascaraBin;
    } else {
      rede += ipBin & mascaraBin;
    }
  }

  return converteBinarioParaDecimalQuatroNumeros(rede);
}

/* 
    Operação OR entre IP e o NOT da Máscara
*/
function verificarBroadcast(ip, mascara) {
  ip = converterDecimalParaBinarioQuatroOctetos(ip);
  mascara = negacaoBinariaQuatroOctetos(
    converterDecimalParaBinarioQuatroOctetos(mascara)
  );

  let broadcast = "";

  for (let i = 0; i < ip.length; i++) {
    let ipBin = ip.charAt(i);
    let mascaraBin = mascara.charAt(i);

    if (ipBin === "." || mascaraBin === ".") {
      broadcast += ".";
    } else {
      broadcast += ipBin | mascaraBin;
    }
  }

  return converteBinarioParaDecimalQuatroNumeros(broadcast);
}

function converterDecimalParaBinarioQuatroOctetos(value) {
  value = value.split(".");
  let octetos = preencherOcteto(converterDecimalParaBinario(value[0]));
  octetos += "." + preencherOcteto(converterDecimalParaBinario(value[1]));
  octetos += "." + preencherOcteto(converterDecimalParaBinario(value[2]));
  octetos += "." + preencherOcteto(converterDecimalParaBinario(value[3]));
  return octetos;
}

function converterBinarioParaDecimal(value) {
  return parseInt(value, 2);
}

function converteBinarioParaDecimalQuatroNumeros(value) {
  value = value.split(".");
  let numeros = converterBinarioParaDecimal(value[0]);
  numeros += "." + converterBinarioParaDecimal(value[1]);
  numeros += "." + converterBinarioParaDecimal(value[2]);
  numeros += "." + converterBinarioParaDecimal(value[3]);
  return numeros;
}

function negacaoBinaria(value) {
  return value === "1" ? "0" : "1";
}

function negacaoBinariaQuatroOctetos(value) {
  let valueNegado = "";
  for (let i = 0; i < value.length; i++) {
    let valueBin = value.charAt(i);
    if (valueBin === ".") {
      valueNegado += valueBin;
    } else {
      valueNegado += negacaoBinaria(valueBin);
    }
  }
  return valueNegado;
}


function formatarBinarioQuatroOctetos(value) {
  let octeto = value.slice(0, 8);
  octeto += "." + value.slice(8, 16);
  octeto += "." + value.slice(16, 24);
  octeto += "." + value.slice(24, 32);
  return octeto;
}
