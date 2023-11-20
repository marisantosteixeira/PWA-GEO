//registrando a service worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', async () => {
      try {
        let reg;
        reg = await navigator.serviceWorker.register('/sw.js', { type: "module" });
  
        console.log('Service worker registrada! 😎', reg);
      } catch (err) {
        console.log('😥 Service worker registro falhou: ', err);
      }
    });
  }

  
let posicaoInicial;
const capturarLocalizacao = document.getElementById('localizacao');
const latitude = document.getElementById('latitude');
const longitude = document.getElementById('longitude');
const mapcanvas = document.getElementById('mapcanvas');

const sucesso = (posicao) => {posicaoInicial = posicao;
    latitude.innerHTML = posicaoInicial.coords.latitude;
    longitude.innerHTML = posicaoInicial.coords.longitude;
    mapcanvas.scr = "https://maps.google.com/maps?width=" + posicaoInicial.coords.latitude + "," + posicaoInicial.coords.longitude + " &z=166&output=embed";
};

const erro = (error) => {
    let errorMessage;
    switch(error.code){
        case 0: errorMessage = "Erro desconhecido"
        break;
        case 1: errorMessage = "Permissao negada"
        break;
        case 2: errorMessage = "captura de posição indisponivel"
        break;
        case 3 : errorMessage = "tempo de solicitação excedido"
        break
    }
    console.log('ocorreu um erro' + errorMessage);
};

capturarLocalizacao.addEventListener('click', () => {
    navigator.geolocation.getCurrentPosition(sucesso, erro);
});