let seuVotoPara = document.querySelector('.d-1-1 span');
let cargo = document.querySelector('.d-1-2 span');
let descricao = document.querySelector('.d-1-4');
let aviso = document.querySelector('.d-2');
let lateral = document.querySelector('.d-1-right');
let numero = document.querySelector('.d-1-3');

let etapaAtual =0;
let numeroatual ='';
let votoBranco = false;
votos = [];



function comecarEtapas(){

    let etapa =etapas[etapaAtual];

    let numeroHtml = '';
    numeroatual = '';
    votoBranco = false;

        for(let i=0;i<etapa.numero;i++){
           if(i === 0){ numeroHtml += '<div class="numero pisca"></div>';
        }else{
            numeroHtml += '<div class="numero"></div>';
        }
        }


    seuVotoPara.style.display = 'none';
    cargo.innerHTML = etapa.titulo;
    descricao.innerHTML ='';
    aviso.style.display = 'none';
    lateral.innerHTML =  '';
    numero.innerHTML = numeroHtml;
}

function atualizaInterface(){
    let etapa =etapas[etapaAtual];
    let candidato= etapa.candidatos.filter((item)=>{
        if(item.numero === numeroatual){
            return true;
        }else{
            return false;
        }
    });
    if(candidato.length > 0){
        candidato = candidato[0];
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        descricao.innerHTML = `Nome:${candidato.nome}<br/> Partido:${candidato.partido}`;

        let fotosHtml ='';

        for(let i in candidato.fotos){
            if(candidato.fotos[i].small){
                fotosHtml+=`<div class="d-1-image small"> <img src="images/${candidato.fotos[i].url}" alt="">${candidato.fotos[i].legenda} </div>`;

            }else{
            fotosHtml+=`<div class="d-1-image"> <img src="images/${candidato.fotos[i].url}" alt="">${candidato.fotos[i].legenda} </div>`;
            }
        }

        lateral.innerHTML = fotosHtml;
    }else{
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        descricao.innerHTML = '<div class="aviso--grande pisca">VOTO NULO</div>';
    }
};

function clicou(n){
    let elnumero = document.querySelector('.numero.pisca');
    if(elnumero !== null){
        elnumero.innerHTML=n;
        numeroatual=`${numeroatual}${n}`;

        elnumero.classList.remove('pisca');
        if(elnumero.nextElementSibling !== null){
            elnumero.nextElementSibling.classList.add('pisca');
        }else{
            atualizaInterface();
        }
    }
}
function branco(){
    if(numeroatual === ''){
        votoBranco=true;
       
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        numero.innerHTML="";
        descricao.innerHTML = '<div class="aviso--grande pisca">VOTO EM BRANCO</div>';
        
    }
    else{
        lateral.innerHTML =  '';
        numero.innerHTML="";
        descricao.innerHTML = '<div class="aviso--branco">Para votar em branco  não digite <br/> nem um número, aperte o botão corrige e logo após o branco.</div>';
    }
}
function corrige(){
    comecarEtapas();
}
function confirma(){
    let etapa = etapas[etapaAtual];

    let votoConfirma = false;

    if(votoBranco===true){
        votoConfirma=true;
        votos.push({
            etapa:etapas[etapaAtual].titulo,
            voto: 'branco'
        });
    }else if(numeroatual.length ===etapa.numero){
        votoConfirma=true;
        votos.push({
            etapa:etapas[etapaAtual].titulo,
            voto: numeroatual
        });
    }
    if(votoConfirma){
        etapaAtual++;
        if(etapas[etapaAtual]!== undefined){
            comecarEtapas();
        }else{
            document.querySelector('.tela').innerHTML='<div class="aviso--final pisca">FIM!</div>';
            console.log(votos)
        }
    }
}

comecarEtapas();