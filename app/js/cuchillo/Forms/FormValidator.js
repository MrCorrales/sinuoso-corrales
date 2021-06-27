class FormValidator {
  _form;
  _fields = [];
  _dataSend = {};
  _files = null;

  constructor(__form) {
    this._form = __form;

    this._form.addEventListener("submit", (e)=> {this.prepareSubmit(e)});

    let items = C.GetBy.selector("input", this._form);
    for(let i=0; i<items.length; i++) {
      this._fields.push(items[i]);
      this.setupFocus(items[i]);
    }

    items = C.GetBy.selector("select", this._form);
    for(let i=0; i<items.length; i++) {
      this._fields.push(items[i]);
      this.setupFocus(items[i]);
    }

    items = C.GetBy.selector("textarea", this._form);
    for(let i=0; i<items.length; i++) {
      this._fields.push(items[i]);
      this.setupFocus(items[i]);
    }
  }

  setupFocus (__item) {
    var tClass = this;

    __item.addEventListener('focus', (event) => {
      __item.classList.remove("error");
      __item.parentNode.classList.remove("error");
    });

    __item.addEventListener('blur', (event) => {});
  }

  check() {

    let bolContinuar = true;
    let field;

    for(var i = 0,j=this._fields.length; i<j; i++) {
      field   =   this._fields[i];

      switch(field.getAttribute("type")) {
        case "text":

          this._dataSend[field.getAttribute("name")] = "";

          if(field.value.split(" ").join("") === "" && field.getAttribute("data-form-required") === "true") {
            bolContinuar = false;
            field.parentNode.classList.add("error");
          } else {
            this._dataSend[field.getAttribute("name")] = field.value;
          }

          break;

        case "email":

          this._dataSend[field.getAttribute("name")] = "";

          var filter = /^([a-zA-Z0-9_\.\ñ\Ñ\-])+\@(([a-zA-Z0-9\-\ñ\Ñ])+\.)+([a-zA-Z0-9]{2,4})+$/;

          if(field.value.split(" ").join("") === "" && field.getAttribute("data-form-required") === "true") {
            bolContinuar    =   false;
            field.parentNode.classList.add("error");
          } else if (!filter.test(field.value)) {
            bolContinuar    =   false;
            field.parentNode.classList.add("error");
          } else {
            this._dataSend[field.getAttribute("name")] = field.value;
          }

          break;

        case "tel":

          this._dataSend[field.getAttribute("name")] = "";

          var filter  =  /^([0-9]+){9}$/;//<--- con esto vamos a validar el numero

          if(field.value.split(" ").join("") === "" && field.getAttribute("data-form-required") === "true") {
            bolContinuar = false;
            field.parentNode.classList.add("error");
          } else if (!filter.test(field.value.split(" ").join("")) && field.getAttribute("data-form-required")) {
            bolContinuar    =   false;
            field.parentNode.classList.add("error");
          } else {
            this._dataSend[field.getAttribute("name")] = field.value;
          }
          break;

        case "file": {
          if(field.getAttribute("data-form-required")==="true" && field.prop('files').length < 1) {
            bolContinuar = false;
            field.parentNode.classList.add("error");
          }

          break;
        }

        case "checkbox": {
          if(field.getAttribute("data-form-required")==="true" && !field.checked) {
            bolContinuar = false;
            field.parentNode.classList.add("error");
          }

          break;
        }

        case "radio": {
          if(field.checked) {
            this._dataSend[field.getAttribute("name")] = field.value;
          }

          break;
        }

        default:

          this._dataSend[field.getAttribute("name")] = "";

          if(field.value.split(" ").join("") === "" && field.getAttribute("data-form-required") === "true") {
            bolContinuar = false;
            field.parentNode.classList.add("error");
          } else {
            this._dataSend[field.getAttribute("name")] = field.value;
          }
          
          break;
      }
    }

    return bolContinuar;
  }

  prepareSubmit(e) {
    e.preventDefault();
    if(this.check())  {
      this.parseToSend();
    } else if(WinMessage) {
      const MSSG = this._form.getAttribute("data-inputs-nok")===undefined? "ERROR" :  this._form.getAttribute("data-inputs-nok");
      WinMessage.error(MSSG);
    }
  }

  parseToSend() {

    this._dataSend["token"] = this._form.getAttribute("data-token");
    if(this._form.getAttribute("data-to")!==undefined) this._dataSend["to"] = this._form.getAttribute("data-to");
    FormSender.send(this, this._dataSend, this._form, this._files);
  }

  reset() {
    this._dataSend = {};
    for(let i = 0,j=this._fields.length; i<j; i++) {
      this._fields[i].val("");
    }
  }

  dispose() {

  }
}