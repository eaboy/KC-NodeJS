'use strict';

function escribeTras2Segundos(texto, callback) {
    setTimeout(() => {
        console.log(texto);
        callback();
    }, 2000);
}

function serie(arr, fn, callbackFinalizacion){
    if(arr.length === 0) {
        callbackFinalizacion();
        return;
    }
    fn('texto' + arr.shift(), () => {
        serie(arr, fn, callbackFinalizacion);
    })
}

serie([1,2,3,4,5], escribeTras2Segundos, () => {
    console.log('fin');
});
