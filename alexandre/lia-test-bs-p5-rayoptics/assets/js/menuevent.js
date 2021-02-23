class Menuevent {
  constructor(pos, angle) {
    this.config = {};
    // initialized to ray...
    this.choiceChecked = 'ray';
  }

  init(options) {
    if(options.length > 0){
      for (let option in options){
        this.config[options[option]['name']] = options[option]['fields'];
      }
    }
    this.bindEvents();
  }

  getChoiceChecked(){return this.choiceChecked}

  bindEvents() {
    $(this.datajs('req', 'required')).on('blur', this.blurHandler);
    $('input[type=radio][name=radioButtonAdd]').on('click', this.clickRadioHandler.bind(this));
  }

  blurHandler(el) {}
  clickRadioHandler(el) {
      el.preventDefault();
      let vChecked = $("input[name='radioButtonAdd']:checked").val();
      if(vChecked !== ""){ // TODO : if not exist define
        this.choiceChecked = vChecked;
        $("#configForm").html(this.createParamForm(vChecked));
      }
  }

  datajs(key, value) {
    return document.querySelectorAll('[data-' + key + '=' + value + ']');
  }
  createParamForm(form) {
    let tableContent = `<table class="table table-iglht">
    <tr>
      <td>
        <h5>${form}</h5>
      </td>
    </tr>
    <tr>
    `;
    for (let field in this.config[form]){
      tableContent += ` 
        <td >${this.config[form][field]["title"]}
        <input id="${this.config[form][field]["id"]}" name="${this.config[form][field]["name"]}" type="${this.config[form][field]["type"]}" style="${this.config[form][field]["style"]}" value="${this.config[form][field]["value"]}"> 
        </td>`;
    }
    tableContent += `</tr>
    </table>`;
    return tableContent;
  }

}