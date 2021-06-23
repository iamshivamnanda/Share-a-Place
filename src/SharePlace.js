import { Modal } from "./UI/modal";
import { Map } from "./UI/Map";
import { getaddress, getcoord } from "./Utility/Location";

class PlaceFinder {
  constructor() {
    const addressform = document.querySelector("form");
    const locatuserbttn = document.getElementById("locate-btn");

    this.sharebttn = document.getElementById("share-btn");
    this.sharebttn.addEventListener("click", this.shareplacehandler);

    locatuserbttn.addEventListener(
      "click",
      this.locatuserbttnhandler.bind(this)
    );
    addressform.addEventListener("submit", this.findadresshandler.bind(this));
  }

  shareplacehandler() {
    const sharelinkinputElement = document.getElementById("share-link");
    if (!navigator.clipboard) {
      sharelinkinputElement.select();
      return;
    }
    navigator.clipboard.writeText(sharelinkinputElement.value).then(() => {
      alert("copied into clipboard");
    }).catch(error =>{ 
      console.log(error);
      sharelinkinputElement.select();
    });
  }
  selectplace(coordinates, address) {
    this.map = new Map(coordinates);
    this.sharebttn.disabled = false;
    const sharelinkinputElement = document.getElementById("share-link");
    sharelinkinputElement.value = `${
      location.origin
    }/my-place?address=${encodeURI(address)}&lat=${coordinates.lat}&lng=${
      coordinates.lng
    }`;
  }
  locatuserbttnhandler() {
    if (!navigator.geolocation) {
      alert(
        "location feature not available in your browser  -  please use a  mordern browser or enter the address."
      );
      return;
    }
    const modal = new Modal(
      "loading-modal-content",
      "Loading Location - please wait"
    );
    modal.show();
    navigator.geolocation.getCurrentPosition(
      async (successresult) => {
        const coordinates = {
          lat: successresult.coords.latitude,
          lng: successresult.coords.longitude,
        };
        // console.log(coordinates);
        const address = await getaddress(coordinates).then((data) => {
          console.log(data);
          const address = document.querySelector("#place-data input");
          address.value = data;
          return data;
        });
        await this.selectplace(coordinates, address);
        modal.hide();
        //  console.log(address);
      },

      (error) => {
        modal.hide();
        alert("could not locate you , add the address manually");
      }
    );
  }
  findadresshandler(event) {
    event.preventDefault();
    const address = document.querySelector("#place-data input").value;
    if (!address || address.trim().length === 0) {
      alert("Invalid address - please try again!");
      return;
    }
    const modal = new Modal(
      "loading-modal-content",
      "Loading Location - please wait"
    );
    modal.show();
    console.log(address);
    const coords = getcoord(address)
      .then((data) => {
        // console.log(data.results[0].annotations.DMS);
        const cooradd = data.results[0].annotations.DMS;
        const arrycords = Object.values(cooradd).map((i) => parseFloat(i));
        const coords = {
          lat: arrycords[0],
          lng: arrycords[1],
        };
        // console.log(coords);
        this.selectplace(coords, address);
        modal.hide();
      })
      .catch((error) => {
        console.log(error);
        modal.hide();
      });
  }
}

new PlaceFinder();
