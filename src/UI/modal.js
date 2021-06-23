export class Modal{
    constructor(contentId,fallbackText){
        this.contentelementEl = document.getElementById(contentId);
        this.fallbackText = fallbackText;
        this.modaltemplateEl = document.getElementById('modal-template');
    }
    show(){
        if('content' in document.createElement('template')){
            const modalElements = document.importNode(this.modaltemplateEl.content,true);
            this.modalElement = modalElements.querySelector('.modal');
            this.backdropElement = modalElements.querySelector('.backdrop');
            
            const contentElement = document.importNode(this.contentelementEl.content,true);

            this.modalElement.appendChild(contentElement);
            document.body.insertAdjacentElement('afterbegin',this.modalElement);
            document.body.insertAdjacentElement('afterbegin',this.backdropElement);
        }
        else{
            //fallbackcode
            alert(this.fallbackText);
        }
    }
    hide(){
       if(this.modalElement){
           document.body.removeChild(this.modalElement);
           document.body.removeChild(this.backdropElement);
           this.modalElement = null;
           this.backdropElement = null;
       }
    }
}