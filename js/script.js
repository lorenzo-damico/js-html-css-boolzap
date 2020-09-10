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
    $(".chat-screen-section.active").append(elemento);
  }

  // Funzione che risponde al messaggio.
  function answerMessage(answerValue) {

    var elemento = $(".template-received .box-message-container").clone();
    var time = currentTime();
    elemento.find("p").text(answerValue);
    elemento.find(".message-box-time").text(time);
    $(".chat-screen-section.active").append(elemento);
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

  $(document).on("click", ".open-menu",
    function () {
      $(this).children(".dropdown-menu").toggle();
    }
  );

  // Quando esco dal menu si nasconde.
  $(document).on("mouseleave", ".message-box",
    function () {
      $(this).find(".dropdown-menu").hide();
    }
  );

  // Al click su elimina messaggio, rimuovo il messaggio.
  $(document).on("click", ".delete-message",
    function () {
      $(this).parents(".box-message-container").remove();
    }
  );

  // Al click su un contatto, apro la chat corrispondente.
  $(".contact_box").click(
    function () {
      if ($(this).hasClass("active") == false) {
        $(".contact_box").removeClass("active");
        $(".chat-screen-section").removeClass("active");
        $(".chat-tools-section img").removeClass("active");
        $(".chat-tools-section h2").removeClass("active");
        var indice = $(this).index();
        $(this).addClass("active");
        $(".chat-screen-section").eq(indice).addClass("active");
        $(".chat-tools-section img").eq(indice).addClass("active");
        $(".chat-tools-section h2").eq(indice).addClass("active");
      }
    }
  );


});
