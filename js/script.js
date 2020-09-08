$(document).ready(function () {

  // Funzione che scrive il messaggio
  function writeMessage() {
    var inputValue = $("#writer").val();

    if (inputValue != "") {
      var elemento = $(".template-send > div").clone();
      elemento.find("p").text(inputValue);
      console.log(elemento);
      $(".chat-screen-section").append(elemento);
      $("#writer").val("");
    }
  }


  $("#writer").keyup(
    function (event) {
      if (event.which == 13) {
        writeMessage();
      }
    }
  );

  $(".fa-paper-plane").click(
    function () {
      writeMessage();
    }
  );





});
