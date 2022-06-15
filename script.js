//Declaraçao de variaveis
const login=document.getElementById('login')
const botaologin=document.getElementById('btn-ok')
const questao=document.querySelector('#questao')
const caixaRespostas=document.querySelector('#caixa-respostas')
const nome=document.getElementById('nome')
const quizzContainer=document.querySelector('#quizz-container')
const placarContainer=document.querySelector('#placar-container')
const letras=['a','b','c','d']
const botaosalvo=document.getElementById('btn-salvo')
const ranking=document.getElementById('salvos')
let pontos=0
let questaAtual=0
let jogador

let jogadores=[]









//Perguntas

const questoes=[
    {
        'questao': 'Em JavaScript, a funçao:',
        'respostas':[
            {
                'resposta': 'prompt acessa o banco de dados',
                'correct': 'false'
            },
            {
                'resposta': 'parseInt converte numero em string',
                'correct': 'false'
            },
            {
                'resposta': 'eval executa strings com código JavaScript embutido',
                'correct': 'true'
            },
            {
                'resposta': 'todas sao falsas',
                'correct': 'false'
            }

        ]
    },

    {
        'questao': 'JavaScript é sensitive case',
        'respostas':[
            {
                'resposta': 'não',
                'correct': 'false'
            },
            {
                'resposta': 'as vezes',
                'correct': 'false'
            },
            {
                'resposta': 'sim',
                'correct': 'true'
            },
            {
                'resposta': 'todas sao falsas',
                'correct': 'false'
            }

        ]
    },

    {
        'questao': 'Java é mesma coisa que Java-Script?',
        'respostas':[
            {
                'resposta': 'sim',
                'correct': 'false'
            },
            {
                'resposta': 'não',
                'correct': 'true'
            },
            {
                'resposta': 'as vezes',
                'correct': 'false'
            },
            {
                'resposta': 'todas esta corretas',
                'correct': 'false'
            }

        ]
    },

    {
        'questao': 'O que são Arrow Functions?',
        'respostas':[
            {
                'resposta': 'funçoes para arrays',
                'correct': 'false'
            },
            {
                'resposta': 'funçao construtora',
                'correct': 'false'
               
            },
            {
                'resposta': 'São da linguagem Python',
                'correct': 'false'
            },
            {
               
                'resposta': 'Formas abreviadas de declarar funçoes',
                'correct': 'true'
            }

        ]
    }
]

//substituiçao do quizz para primeira pergunta

function inicia(){
    nome.focus()
    //criar a primeira pergunta
   criaQuestao(0)
}

    //cria uma pergunta

function criaQuestao(i){
    
    //limpa a questao anterior
    const oldButtons=caixaRespostas.querySelectorAll('button')
   
    oldButtons.forEach(function(btn){
        btn.remove()

    })


    //alterar o texto da pergunta
    const numeroQuestao=document.getElementById('questao-numero') 
    // ou const numeroQuestao=questao.querySelector('#questao-numero') etc
    const textoQuestao=document.getElementById('questao-texto')

    textoQuestao.textContent=questoes[i].questao
    numeroQuestao.textContent=i+1

    //Insere as alternativas
    questoes[i].respostas.forEach(function(resposta,i){
        //cria o template do botao do quizz
        const templateResposta=document.querySelector('.resposta-template').cloneNode(true)

        const letraBotao=templateResposta.querySelector('.btn-letra')
        const respostatexto=templateResposta.querySelector('.resposta-questao')

        letraBotao.textContent=letras[i]
        respostatexto.textContent=resposta['resposta']

        //console.log(templateResposta)
        templateResposta.setAttribute('resposta-correta',resposta['correct'])

        //remover hide e template class
        templateResposta.classList.remove('hide')
        templateResposta.classList.remove('resposta-template')

        //inserir a alternativa na tela
        caixaRespostas.appendChild(templateResposta)

        //inserir um evento de click no botão
        templateResposta.addEventListener('click',function(){
            verificaResposta(this)
        })

    })

    //incrementar o numero da questao
    questaAtual++

}

//verificando resposta do usuário
    function verificaResposta(btn){
        //seleciona todos os botoes
        const botoes=caixaRespostas.querySelectorAll('button')
        //verifica se a resposta esta correta e aplica classes nos botoes
        botoes.forEach(function(button){
            if(button.getAttribute('resposta-correta') ==='true'){
                button.classList.add('resposta-correta')

                //checa se o usuario acertou a pergunta
                if(btn === button){
                    pontos++
                }

            }else{
                button.classList.add('resposta-errada')
            }
        })

        //exibir a proxima pergunta
        proximaPergunta()
        
    }

    //exibe a proxima pergunta
    function proximaPergunta(){

        setTimeout(() => {
            if(questaAtual >=questoes.length){
                //msg
                gravaJogada(jogador,pontos)
                mostraMsgSucesso()
                return
            }

            criaQuestao(questaAtual)
            
        }, 500);
    }

    //exibe tela final
    function mostraMsgSucesso(){
        quizzContainer.classList.add('hide')
        placarContainer.classList.remove('hide')
        const porcentagem= ((pontos/questoes.length)*100).toFixed(1)

        document.getElementById('display-placar').textContent=porcentagem.toString()
        document.getElementById('resposta-correta').textContent=pontos
        document.getElementById('qtd-questoes').textContent=questoes.length


    }

    //grava 
    function gravaJogada(j,p){
        jogadores.push({
            'jogador':j,
            'Pontos':p})
       
        console.log(jogadores)
       
    }

           
       
    
        function gerar(){

           
            
            let lista = document.getElementById('lista');
            lista.textContent=''

            //coloca o array em ordem decrescente pelo atributo pontos
            jogadores.sort(function(a,b) {
                return a.Pontos > b.Pontos ? -1 : a.Pontos < b.Pontos ? 1 : 0;
            });

            for(var i = 0; i < 3; i++){
                let item = document.createElement('li');
                item.appendChild(document.createTextNode(jogadores[i].jogador));
                item.appendChild(document.createTextNode(' acertou '));
                item.appendChild(document.createTextNode(jogadores[i].Pontos));
                lista.appendChild(item);
            }
        }
    

    //
    botaosalvo.addEventListener('click',()=>{
        ranking.classList.remove('hide')
        placarContainer.classList.add('hide') 
        setTimeout(() => {
            ranking.classList.add('hide')
            placarContainer.classList.remove('hide')
         },3000);     
       gerar()
    }) 
   

    // coloca o evento no botao de login
    botaologin.addEventListener("click",()=>{

        if (document.getElementById('nome').value == '')
                {
                    document.getElementById('msg-input').innerHTML='Digite seu Apelido'
                    nome.focus()
                }else
                    {
                        login.classList.add('hide')
                        quizzContainer.classList.toggle('hide') 
                        jogador=document.getElementById('nome').value
                        //console.log(jogador)
                    }   

    })

       
   


    //reiniciar quiz
    const botaoReiniciar=document.getElementById('btn-reiniciar')
    botaoReiniciar.addEventListener('click',()=>{

        questaAtual=0
        pontos=0
        
        placarContainer.classList.add('hide')
        login.classList.remove('hide')
        nome.value=''
        nome.focus()
        document.getElementById('msg-input').innerHTML=''
        inicia()
    })


//inicia o quizz
inicia()
