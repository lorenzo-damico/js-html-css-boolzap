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
  function writeMessage(inputGenerico) {

    var elemento = $(".template .box-message-container").clone();
    var time = currentTime();
    elemento.addClass("send");
    elemento.find("p").text(inputGenerico);
    elemento.find(".message-box-time").text(time);
    $(".chat-screen-section.active").append(elemento);

    // Imposto la funzione di scroll automatico a fondo pagina dopo l'invio del messaggio.
    var currentHeight = $(".chat-screen-section.active").height();
    $(".chat-screen-section.active").scrollTop(currentHeight);

    // Aggiorno l'orario dell'ultimo messaggio inviato nel box contatto.
    $(".contact-box.active .message-time").text(time);

    // Aggiorno l'ultimo messaggio nel box contatto.
    $(".contact-box.active p").text(inputGenerico);
  }

  // Funzione che risponde al messaggio.
  function answerMessage(answerValue) {

    var elemento = $(".template .box-message-container").clone();
    var time = currentTime();
    elemento.find("p").text(answerValue);
    elemento.find(".message-box-time").text(time);
    $(".chat-screen-section.active").append(elemento);

    // Imposto la funzione di scroll automatico a fondo pagina dopo la risposta.
    var currentHeight = $(".chat-screen-section.active").height();
    $(".chat-screen-section.active").scrollTop(currentHeight);

    // Aggiorno l'orario dell'ultimo messaggio ricevuto nel box contatto e anche l'ultimo accesso.
    $(".contact-box.active .message-time").text(time);
    $(".chat-tools-section time").text(time);

    // Aggiorno l'ultimo messaggio nel box contatto.
    $(".contact-box.active p").text(answerValue);

  }


  // Scrivo alla pressione del tasto invio, e ricevo risposta automatica.
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

      // Faccio comparire il tasto invio quando digito sulla tastiera.
      $(".fa-paper-plane").hide();
      $(".fa-microphone").show();
      if ($("#writer").val() != "") {
        $(".fa-paper-plane").show();
        $(".fa-microphone").hide();
      }
    }
  );

  // Scrivo il messaggio al click sul pulsante, e ricevo risposta automatica.
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

      // Scambio l'invio con il microfono quando invio il messaggio.
      $(".fa-paper-plane").hide();
      $(".fa-microphone").show();
    }
  );

  // Cerco contatto digitando sulla barra di ricerca. Non funziona incollando con il mouse.

  // $("#search-writer").keyup(
  //   function (event) {
  //     $(".contact-box").each(
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
    $(".contact-box").each(
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

  // Al click sull'icona, apro il menu a tendina.
  $(document).on("click", ".open-menu",
    function () {
      $(this).children(".dropdown-menu").toggle();
    }
  );

  // Quando esco dal menu, si nasconde.
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

  // Al click su un contatto, apro la chat corrispondente e aggiorno le info del contatto.
  $(".contact-box").click(
    function () {
      if ($(this).hasClass("active") == false) {
        $(".contact-box").removeClass("active");
        $(".chat-screen-section").removeClass("active");

        var indice = $(".contact-box").index(this);

        $(this).addClass("active");
        $(".chat-screen-section").eq(indice).addClass("active");

        var img = $(this).find("img").attr("src");
        var nome = $(this).find("h2").text();
        var tempo = $(this).find(".message-time").text();
        $(".chat-tools-section img").attr("src", img);
        $(".chat-tools-section h2").text(nome);
        $(".chat-tools-section time").text(tempo);
      }
    }
  );



});
