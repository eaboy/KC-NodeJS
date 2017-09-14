'use strict';

// función que retorna una promesa

function sleep(ms) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, ms);
    });
}

async function main() {
    await sleep(2000);
    console.log('Pasaron los segundos');
}

main();