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

  // Cerco contatto digitando sulla barra di ricerca. Non funziona incollando con il mouse.

  // $("#search-writer").keyup(
  //   function (event) {
  //     $(".contact_box").each(
  //       function () {
  //         var searchValue = $("#search-writer").val().toLowerCase();
  //         var nomeContatto = $(this).find("h2").text().toLowerCase();
  //         var esitoControllo = nomeContatto.includes(searchValue);
  //         if (esitoControllo == false) {
  //           $(this).hide();
  //         } else {
  //           $(this).show();
  //         }
  //       }
  //     );
  //   }
  // );

  // Con questo metodo prende anche l'inserimento con l'incolla del mouse.

  $("#search-writer").on("input", function(){
    $(".contact_box").each(
      function () {
        var searchValue = $("#search-writer").val().toLowerCase();
        var nomeContatto = $(this).find("h2").text().toLowerCase();
        var esitoControllo = nomeContatto.includes(searchValue);
        if (esitoControllo == false) {
          $(this).hide();
        } else {
          $(this).show();
        }
      }
    );
  });

  // Al click sull'icona apro il menu a tendina.
  // $(".open-menu").click(
  //   function () {
  //     $(this).children(".dropdown-menu").toggle();
  //   }
  // );

  $(document).on("click", ".open-menu",
    function () {
      $(this).children(".dropdown-menu").toggle();
    }
  );

  // Quando esco dal menu si nasconde.
  $(document).on("mouseleave", ".open-menu",
    function () {
      $(this).children(".dropdown-menu").hide();
    }
  );

  // Al click su elimina messaggio, rimuovo il messaggio.
  $(document).on("click", ".delete-message",
    function () {
      $(this).parents(".box-message-container").remove();
    }
  );


});
