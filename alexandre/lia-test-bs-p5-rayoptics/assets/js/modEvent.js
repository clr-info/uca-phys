$(function () {
  let eventMenu = (function ($) {
      let config = {
          'fields': $('form input[type=text], form input[type=password], form input[type=email], form[type=number]')
      };
      let init = function (options) {
          if(options.length > 0){
            for (let option in options){
              config[options[option]['name']] = options[option]['fields'];
            }
          }
          let color = 'red';
          bindEvents();
      };
      let bindEvents = function () {
          $(datajs('req', 'required')).on('blur', blurHandler);
          $('input[type=radio][name=radioButtonAdd]').on('click', clickRadioHandler);
          // TODO
          // onchange value of input pour changement dans sketch
      };

      let blurHandler = function (el) {};
      let clickRadioHandler = function (el) {
          el.preventDefault();
          vChecked = $("input[name='radioButtonAdd']:checked").val();
          if(vChecked !== ""){ // TODO : if not exist define
            $("#configForm").html(createParamForm(vChecked));
          }
      };
      // ---
      // helpers
      // ---
      let datajs = function (key, value) {
          return document.querySelectorAll('[data-' + key + '=' + value + ']');
      };
      let createParamForm = function (form) {
        let tableContent = `<table class="table table-iglht">
        <tr>
          <td>
            <h5>${form}</h5>
          </td>
        </tr>
        <tr>
        `;
        for (field in config[form]){
          tableContent += ` 
            <td >${config[form][field]["title"]}
            <input id="${config[form][field]["id"]}" name="${config[form][field]["name"]}" type="${config[form][field]["type"]}" style="${config[form][field]["style"]}" value="${config[form][field]["value"]}"> 
            </td>`;
        }
        tableContent += `</tr>
        </table>`;
        return tableContent;
      }

      return {
          init: init
      };

  })(jQuery);
  let beamForm = [
    { 
      "name":"BEAMS",
      "fields": [
        {"name":"field1","title":"field1 title", "type":"number", "style":"width: 45px;padding: 1px", "value":"20", "id":"BEAMS1"},
        {"name":"field2","title":"field2 title", "type":"number", "style":"width: 45px;padding: 1px", "value":"0", "id":"BEAMS2"},
        {"name":"field3","title":"field3 title", "type":"number", "style":"width: 45px;padding: 1px", "value":"0", "id":"BEAMS3"},
        {"name":"field4","title":"field4 title", "type":"text", "style":"width: 45px;padding: 1px", "value":"0", "id":"BEAMS4"},
      ]
    },
    { 
      "name":"couleur",
      "fields": [
        {"name":"couleur","title":"black couleur", "type":"radio", "style":"width: 45px;padding: 1px", "value":"black", "id":"couleur1"},
        {"name":"couleur","title":"red couleur", "type":"radio", "style":"width: 45px;padding: 1px", "value":"red", "id":"couleur2"},
        {"name":"couleur","title":"magenta couleur", "type":"radio", "style":"width: 45px;padding: 1px", "value":"magenta", "id":"couleur2"},
        {"name":"couleur","title":"orange couleur", "type":"radio", "style":"width: 45px;padding: 1px", "value":"orange", "id":"couleur2"},
      ]
    }
  ];
  eventMenu.init(beamForm);
  let color = 'black';
});