const intervaloS = 3600; //1 hora em segundos

const amostras = [
  { v: 15.0, i: 0.2 }, // 6h
  { v: 17.0, i: 0.8 }, // 7h
  { v: 18.5, i: 1.5 }, // 8h
  { v: 19.0, i: 2.1 }, // 9h
  { v: 19.5, i: 2.6 }, // 10h
  { v: 20.0, i: 2.8 }, // 11h
  { v: 20.0, i: 2.9 }, // 12h
  { v: 20.0, i: 2.8 }, // 13h
  { v: 19.5, i: 2.4 }, // 14h
  { v: 19.0, i: 1.9 }, // 15h
  { v: 18.5, i: 1.2 }, // 16h
  { v: 17.0, i: 0.6 }, // 17h
  { v: 15.0, i: 0.1 }, // 18h
];

function calcularEnergia(lista, intervalo) {
  let somaPotencias = 0;

  for (const a of lista) {
    const potencia = a.v * a.i;
    somaPotencias += potencia;
  }

  return (somaPotencias * intervalo) / 3600;
}

function calcularPico(lista) {
  let pico = 0;

  for (const a of lista) {
    const potencia = a.v * a.i;
    if (potencia > pico) {
      pico = potencia;
    }
  }

  return pico;
}

function calcularTensaoMax(lista) {
  let tensaoMax = 0;

  for (const a of lista) {
    if (a.v > tensaoMax) {
      tensaoMax = a.v;
    }
  }

  return tensaoMax;
}

// Atualiza os elementos HTML com os valores calculados
const elEnergia = document.getElementById("energia");
elEnergia.textContent = calcularEnergia(amostras, intervaloS).toFixed(1);

const elPico = document.getElementById("pico");
elPico.textContent = calcularPico(amostras).toFixed(1);

const elTensaoMax = document.getElementById("tensao");
elTensaoMax.textContent = calcularTensaoMax(amostras).toFixed(1);

const elData = document.getElementById("data");
elData.textContent = new Date().toDateString("pt-BR");

const potencias = amostras.map((a) => a.v * a.i);

const tensoes = amostras.map((a) => a.v);

//Trocar quando tiver os dados de verdade
const horas = amostras.map((a, indice) => (6 + indice) + "h");
// ["6h", "7h", "8h", ...]

const canvas = document.getElementById("grafico");

new Chart(canvas, {
  type: "line",
  data: {
    labels: horas,
    datasets: [
      {
        label: "Potência (W)",
        data: potencias,
        borderColor: "#f59e0b",
        tension: 0.3,
      },
    ],
  },

  options: {
    responsive: true,
  },
});