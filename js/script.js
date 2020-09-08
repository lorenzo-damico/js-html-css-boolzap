$(document).ready(function () {

  // Funzione che scrive il messaggio.
  function writeMessage() {
    var inputValue = $("#writer").val();

    if (inputValue != "") {
      var elemento = $(".template-send > div").clone();
      elemento.find("p").text(inputValue);
      $(".chat-screen-section").append(elemento);
      $("#writer").val("");
    }
  }

  // Stampo alla pressione del tasto.
  $("#writer").keyup(
    function (event) {
      if (event.which == 13) {
        writeMessage();
      }
    }
  );
  
  // Stampo al click sul pulsante.
  $(".fa-paper-plane").click(
    function () {
      writeMessage();
    }
  );





});
