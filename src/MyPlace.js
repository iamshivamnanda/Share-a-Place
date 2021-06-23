import {Map} from './UI/Map';
class LoadedPlace{
    constructor(coords,address){
        new Map(coords);
        const headertileEl = document.querySelector('header h1');
        headertileEl.textContent = address;
    }
}
const url  = new URL(location.href);
const queryparasms = url.searchParams;
const coords = {
    lat: +queryparasms.get('lat'),
    lng: +queryparasms.get('lng')
}

const address = queryparasms.get('address');
new LoadedPlace(coords,address);