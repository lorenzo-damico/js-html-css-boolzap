$(document).ready(function () {

  // Funzione che acquisisce l'orario.
  function currentTime() {
    var date = new Date();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    if (minutes > 9) {
      var time = hours + ":" + minutes;
    } else {
      var time = hours + ":0" + minutes;
    }
    return time;
  }

  // Funzione che scrive il messaggio.
  function writeMessage(inputValue) {

    var elemento = $(".template-send .box-message-container").clone();
    var time = currentTime();
    elemento.find("p").text(inputValue);
    elemento.find(".message-box-time").text(time);
    $(".chat-screen-section").append(elemento);
  }

  // Funzione che risponde al messaggio.
  function answerMessage(answerValue) {

    var elemento = $(".template-received .box-message-container").clone();
    var time = currentTime();
    elemento.find("p").text(answerValue);
    elemento.find(".message-box-time").text(time);
    $(".chat-screen-section").append(elemento);
  }


  // Stampo alla pressione del tasto.
  $("#writer").keyup(
    function (event) {
      if (event.which == 13) {
        var inputValue = $("#writer").val();
        if (inputValue != "") {
          writeMessage(inputValue);
          setTimeout(
            function () {
              answerMessage("OK");
            }, 1000
          );
          $("#writer").val("");
        }
      }
    }
  );

  // Stampo al click sul pulsante.
  $(".fa-paper-plane").click(
    function () {
      var inputValue = $("#writer").val();
      if (inputValue != "") {
        writeMessage(inputValue);
        setTimeout(
          function () {
            answerMessage("OK");
          }, 1000
        );
        $("#writer").val("");
      }
    }
  );





});
