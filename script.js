
const quizPerguntas = [
    {
        pergunta: "O que significa HTML?",
        respostas: {
            a: "HyperText Markup Language",
            b: "HighText Machine Language",
            c: "HyperText and Links Markup",
            d: "Home Tool Markup Language"
        },
        respostaCorreta: "a"
    },
    {
        pergunta: "Qual tag HTML é usada para criar um link?",
        respostas: {
            a: "<link>",
            b: "<a>",
            c: "<href>",
            d: "<url>"
        },
        respostaCorreta: "b"
    },
    {
        pergunta: "Qual propriedade CSS é usada para mudar a cor do texto?",
        respostas: {
            a: "text-color",
            b: "font-color",
            c: "color",
            d: "text-style"
        },
        respostaCorreta: "c"
    },
    {
        pergunta: "Como você declara uma variável em JavaScript?",
        respostas: {
            a: "variable nome;",
            b: "var nome;",
            c: "v nome;",
            d: "declare nome;"
        },
        respostaCorreta: "b"
    },
    {
        pergunta: "Qual é o método correto para selecionar um elemento por ID em JavaScript?",
        respostas: {
            a: "document.querySelector('#id')",
            b: "document.getElement('id')",
            c: "document.select('#id')",
            d: "document.find('id')"
        },
        respostaCorreta: "a"
    },
    {
        pergunta: "O que significa CSS?",
        respostas: {
            a: "Computer Style Sheets",
            b: "Creative Style System",
            c: "Cascading Style Sheets",
            d: "Colorful Style Sheets"
        },
        respostaCorreta: "c"
    },
    {
        pergunta: "Qual tag HTML é usada para incluir JavaScript em uma página?",
        respostas: {
            a: "<javascript>",
            b: "<js>",
            c: "<script>",
            d: "<code>"
        },
        respostaCorreta: "c"
    },
    {
        pergunta: "Qual propriedade CSS é usada para fazer o texto em negrito?",
        respostas: {
            a: "text-weight",
            b: "font-weight",
            c: "bold",
            d: "text-bold"
        },
        respostaCorreta: "b"
    },
    {
        pergunta: "Quantos níveis de cabeçalho existem em HTML?",
        respostas: {
            a: "5",
            b: "6",
            c: "7",
            d: "8"
        },
        respostaCorreta: "b"
    },
    {
        pergunta: "Qual é o operador de igualdade estrita em JavaScript?",
        respostas: {
            a: "==",
            b: "=",
            c: "===",
            d: "!="
        },
        respostaCorreta: "c"
    },
    {
        pergunta: "Qual tag HTML é usada para criar uma lista não ordenada?",
        respostas: {
            a: "<ol>",
            b: "<ul>",
            c: "<list>",
            d: "<li>"
        },
        respostaCorreta: "b"
    },
    {
        pergunta: "O que é o DOM?",
        respostas: {
            a: "Data Object Model",
            b: "Document Object Model",
            c: "Display Object Management",
            d: "Digital Oriented Model"
        },
        respostaCorreta: "b"
    },
    {
        pergunta: "Qual propriedade CSS é usada para adicionar espaço interno em um elemento?",
        respostas: {
            a: "margin",
            b: "spacing",
            c: "padding",
            d: "border"
        },
        respostaCorreta: "c"
    },
    {
        pergunta: "Qual é o método JavaScript para adicionar um elemento ao final de um array?",
        respostas: {
            a: "add()",
            b: "push()",
            c: "append()",
            d: "insert()"
        },
        respostaCorreta: "b"
    },
    {
        pergunta: "Qual atributo HTML é usado para estilizar um elemento inline?",
        respostas: {
            a: "class",
            b: "style",
            c: "css",
            d: "design"
        },
        respostaCorreta: "b"
    }
];

// Variaveis para guardar resultados
let questaoAtualIndex = 0;
let respostas = [];
let nomeDoParticipante = '';
let resultadosGrafico = null;

// Elementos do DOM
const paginaInicial = document.getElementById('pagina-boas-vindas');
const paginaQuiz = document.getElementById('pagina-quiz');
const paginaResultados = document.getElementById('pagina-resultados');
const nomeDoParticipanteInput = document.getElementById('nome-participante');
const btnIniciar = document.getElementById('btn-iniciar');
const enunciadoTexto = document.getElementById('texto-pergunta');
const questaoAtualSpan = document.getElementById('pergunta-atual');
const totalPerguntasSpan = document.getElementById('total-perguntas');
const btnProximo = document.getElementById('btn-proximo');

function configurarQuiz() {
    // Somente permite iniciar se inserir o nome
    nomeDoParticipanteInput.addEventListener('input', () => {
        btnIniciar.disabled = nomeDoParticipanteInput.value.trim() === '';
    });

    btnIniciar.addEventListener('click', iniciarQuiz);

    totalPerguntasSpan.textContent = quizPerguntas.length;

    // Quando clickar em próximo, mostra outra pergunta, mas só mostra se selecionar a resposta da atual
    btnProximo.addEventListener('click', clickProximaPergunta);

    const perguntaInputs = document.querySelectorAll('input[name="pergunta"]');
    perguntaInputs.forEach(input => {
        input.addEventListener('change', () => {
            btnProximo.disabled = false;
        });
    });
}

function iniciarQuiz() {
    nomeDoParticipante = nomeDoParticipanteInput.value.trim();

    // Esconder página de boas-vindas e mostrar página do quiz
    paginaInicial.style.display = 'none';
    paginaQuiz.style.display = 'block';

    exibirQuestaoAtual();
}

function exibirQuestaoAtual() {
    const questaoAtual = quizPerguntas[questaoAtualIndex];

    enunciadoTexto.textContent = questaoAtual.pergunta;

    document.getElementById('texto-a').textContent = questaoAtual.respostas.a;
    document.getElementById('texto-b').textContent = questaoAtual.respostas.b;
    document.getElementById('texto-c').textContent = questaoAtual.respostas.c;
    document.getElementById('texto-d').textContent = questaoAtual.respostas.d;

    // precisa incrementar por que a variável contém o index
    questaoAtualSpan.textContent = questaoAtualIndex + 1;

    const perguntaInputs = document.querySelectorAll('input[name="pergunta"]');
    perguntaInputs.forEach(input => {
        input.checked = false;
    });

    // Desabilitar botão próximo até que uma resposta seja selecionada
    btnProximo.disabled = true;
}

function clickProximaPergunta() {
    const respostaSelecionada = document.querySelector('input[name="pergunta"]:checked');

    if (!respostaSelecionada) {
        return;
    }

    respostas.push({
        pergunta: questaoAtualIndex,
        valorResposta: respostaSelecionada.value,
        respostaCorreta: quizPerguntas[questaoAtualIndex].respostaCorreta
    });

    // Mover para próxima pergunta
    questaoAtualIndex++;

    // Verificar se o quiz terminou, se terminou, mostra os resultados
    if (questaoAtualIndex < quizPerguntas.length) {
        exibirQuestaoAtual();
    } else {
        mostrarResultados();
    }
}

function mostrarResultados() {
    const totalRespostasCorretas = respostas.filter(pergunta => pergunta.valorResposta === pergunta.respostaCorreta).length;
    const respostasErradas = respostas.length - totalRespostasCorretas;
    const totalRespostas = quizPerguntas.length;
    const porcentagem = Math.round((totalRespostasCorretas / totalRespostas) * 100);

    // Esconder página do quiz e mostrar página de resultados
    paginaQuiz.style.display = 'none';
    paginaResultados.style.display = 'block';

    document.getElementById('nome-participante-display').textContent = `Parabéns, ${nomeDoParticipante}!`;

    document.getElementById('percentual').textContent = `${porcentagem}%`;
    document.getElementById('total-corretas').textContent = totalRespostasCorretas;
    document.getElementById('total-perguntas-resultado').textContent = totalRespostas;

    // Criar gráfico de pizza
    mostraGrafico(totalRespostasCorretas, respostasErradas);

    // Exibir mensagem baseada na porcentagem
    const messageElement = document.getElementById('mensagem-resultados');
    let message = '';

    if (porcentagem >= 80) {
        message = 'Excelente!';
    } else if (porcentagem >= 50) {
        message = 'Bom desempenho';
    } else {
        message = 'Precisa melhorar';
    }

    messageElement.textContent = message;
}

function mostraGrafico(totalRespostasCorretas, totalRespostasErradas) {
    const canvas = document.getElementById('grafico-resultados');

    resultadosGrafico = new Chart(canvas, {
        type: 'pie',
        data: {
            labels: ['Corretas', 'Erradas'],
            datasets: [{
                data: [totalRespostasCorretas, totalRespostasErradas],
                backgroundColor: [
                    'Blue',
                    'Red'
                ],
                borderWidth: 2,
                borderColor: 'white'
            }]
        },
        opcaos: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        padding: 15,
                        font: {
                            size: 14
                        }
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const label = context.label || '';
                            const value = context.parsed || 0;
                            const total = context.dataset.data.reduce((a, b) => a + b, 0);
                            const percentual = Math.round((value / total) * 100);
                            return `${label}: ${value} (${percentual}%)`;
                        }
                    }
                }
            }
        }
    });
}

// Quando a página carregar, iniciar o quiz
document.addEventListener('DOMContentLoaded', configurarQuiz);
