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
