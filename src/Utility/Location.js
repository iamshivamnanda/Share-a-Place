export async function getaddress(coordinates) {
    
    const respone = await fetch(
      `https://api.opencagedata.com/geocode/v1/json?q=${coordinates.lat}+${coordinates.lng}&key=25a4134491b54c1a88cf456580dbd402`
    );
    const data = await respone.json();
    return   data.results[0].formatted;
    // console.log(add);
    //   .then((respone) => respone.json())
    //   .then((data) => console.log( data.results[0].formatted)).catch(error =>console.log(error));
  }


 export async function getcoord(address) {
    const urladdress=  encodeURI(address);
    const respone = await fetch(
      `https://api.opencagedata.com/geocode/v1/json?q=${urladdress}&key=25a4134491b54c1a88cf456580dbd402`
    )
    // .then((respone) => respone.json())
    // .then((data) => {return data.results[0]}).catch(error =>console.log(error));
    const data = respone.json();
    return  data;
  }

