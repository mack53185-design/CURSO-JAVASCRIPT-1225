async function cargarContenido(){
    cargarElementos();
    cargarTextos();

    await cargarCotizaciones(mostrarCotizacion);
}

async function cargarCotizaciones(callback){
    try{
    document.getElementById('imgEspera').style.visibility = 'visible';

    await delay(2500);
    
    const r1 = await fetch('https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT');
    const datos1 = await r1.json();
   /* console.log(datos1.price);*/
    callback(datos1);

    const r2 = await fetch('https://open.er-api.com/v6/latest/USD');
    const datos2 = await r2.json();
    /*console.log(datos2.rates.EUR);*/
   
    document.getElementById('UsdEur').append(datos2.rates.EUR);
     const datos3 = await crearPedido('https://open.er-api.com/v6/latest/ARS');
    document.getElementById('UsdArs').append(datos3.rates.USD);
   /* console.log(datos3.rates.USD);*/

    }catch(err){
        console.error(err);
    }finally{
        document.getElementById('imgEspera').style.visibility = 'hidden';
    }
}

function mostrarCotizacion(datos){
    const price = Number(datos.price);
    document.getElementById('BitcoinUsd').append(price);
}

async function crearPedido(url){
   return new Promise(function(resolve, reject){
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.onload = function(){
        if(xhr.status === 200){
            resolve(JSON.parse(xhr.responseText));
        }else{
            reject(xhr.statusText);
        }
    };
    xhr.onerror = () => reject("Error en red");
    xhr.send();
    });
}

function cargarElementos(){
    document.getElementById('imgLogo').setAttribute('src', 'logo.jpg');
    document.getElementById('titulo').textContent = 'Cotizaciones online';
    document.getElementById('imgEspera').setAttribute('src', 'loading.gif');
    }

function cargarTextos(){
    document.getElementById('UsdEur').append("EUR a USD: ");
    document.getElementById('UsdArs').append("ARG a USD: ");
    document.getElementById('BitcoinUsd').append("Bitcoin a USD: ");
    }

function delay(ms){
    return new Promise(res => setTimeout(res, ms));
}