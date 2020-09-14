$(document).ready(function () {


  // -------------------
  // FUNZIONI GENERICHE
  // -------------------
  // ----------------
  // FUNZIONE ORARIO
  // ----------------

  // Funzione che acquisisce l'orario corrente.
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


  // -------------------------
  // FUNZIONE INVIO MESSAGGIO
  // -------------------------


  // Funzione che scrive il messaggio contenuto in un certo inputGenerico sulla chat attiva in quel momento.
  function writeMessage(inputGenerico) {

    // Creo un clone del template messaggio, lo manipolo e lo aggiungo alla finestra chat attiva in quel momento.
    var elemento = $(".template .box-message-container").clone();
    var time = currentTime();
    elemento.addClass("send");
    elemento.find("p").text(inputGenerico);
    elemento.find(".message-box-time").text(time);
    $(".chat-screen-section.active").append(elemento);

    // Imposto lo scroll automatico a fondo pagina dopo l'invio del messaggio.
    var currentHeight = $(".chat-screen-section.active")[0].scrollHeight;
    $(".chat-screen-section.active").scrollTop(currentHeight);

    // Aggiorno l'orario dell'ultimo messaggio inviato nel box contatto.
    $(".contact-box.active .message-time").text(time);

    // Aggiorno l'ultimo messaggio nel box contatto.
    $(".contact-box.active p").text(inputGenerico);
  }


  // ----------------------------
  // FUNZIONE RISPOSTA MESSAGGIO
  // ----------------------------


  // Funzione che risponde al messaggio con una certa answerValue e in una chat con un determinato indice.
  function answerMessage(answerValue, indice) {

    // Alla partenza della funzione, modifico lo status del contatto in "Online".
    $(".chat-tools-section p").eq(indice).text("Online");

    // Dopo 1 secondo, modifico lo status del contatto in "Sta scrivendo...".
    setTimeout(
      function () {
        $(".chat-tools-section p").eq(indice).text("Sta scrivendo...");
      }, 1000
    );

    // Dopo 1 secondo, parte la funzione di stampa del messaggio di risposta.
    setTimeout(
      function () {

        // Creo un clone del template messaggio, lo manipolo e lo aggiungo alla finestra con indice registrato in precedenza.
        var elemento = $(".template .box-message-container").clone();
        var time = currentTime();
        elemento.find("p").text(answerValue);
        elemento.find(".message-box-time").text(time);
        $(".chat-screen-section").eq(indice).append(elemento);

        // Imposto lo scroll automatico a fondo pagina dopo la risposta.
        var currentHeight = $(".chat-screen-section")[indice].scrollHeight;
        $(".chat-screen-section").eq(indice).scrollTop(currentHeight);

        // Aggiorno l'orario dell'ultimo messaggio ricevuto nel box contatto.
        $(".contact-box").eq(indice).find(".message-time").text(time);

        // Aggiorno l'ultimo messaggio ricevuto nel box contatto.
        $(".contact-box").eq(indice).find("p").text(answerValue);

        // Aggiorno lo status del contatto indicando l'orario di invio del messaggio come ultimo accesso.
        $(".chat-tools-section p").eq(indice).text("Ultimo accesso oggi alle " + time);

      }, 2000
    );
  }


  // -----------------
  // SCAMBIO PULSANTI
  // -----------------


  // Scambio i pulsanti aeroplanino e microfono al variare del contenuto dell'input (anche incollando con il mouse).
  $("#writer").on("input",
    function () {

      // Se l'input non è vuoto, inverto i pulsanti e faccio comparire l'invio.
      if ($("#writer").val() != "") {
        $(".fa-paper-plane").show();
        $(".fa-microphone").hide();

        // Invece ripristino la situazione iniziale se il campo si svuota.
      } else {
        $(".fa-paper-plane").hide();
        $(".fa-microphone").show();
      }
    }
  );


  // ----------------------
  // SCRIVO PREMENDO INVIO
  // ----------------------


  // Stampo il contenuto dell'input alla pressione del tasto invio, e ricevo risposta automatica.
  $("#writer").keyup(
    function (event) {

      // Se il tasto premuto è invio, procedo.
      if (event.which == 13) {

        // Acquisisco il contenuto dell'input.
        var inputValue = $("#writer").val();

        // Se l'input contiene qualcosa, procedo.
        if (inputValue != "") {

          // Scrivo il messaggio passando l'inputValue alla funzione creata in precedenza.
          writeMessage(inputValue);

          // Mi salvo l'indice della chat attiva al momento della digitazione di modo da poter continuare ad operare su di essa.
          var indice = $(".chat-screen-section").index($(".chat-screen-section.active"));

          // Dopo 1 secondo, parte la funzione di risposta creata in precedenza. Gli passo una answerValue a piacere e l'indice da utilizzare nelle operazioni.
          setTimeout(
            function () {
              answerMessage("OK", indice);
            }, 1000
          );

          // Dopo l'invio, svuoto il campo input.
          $("#writer").val("");
        }

        // Dopo l'invio, faccio un reset dei pulsanti aeroplanino e microfono.
        $(".fa-paper-plane").hide();
        $(".fa-microphone").show();
      }
    }
  );

  // -----------------------------
  // SCRIVO AL CLICK SUL PULSANTE
  // -----------------------------


  // Scrivo il messaggio al click sul pulsante, e ricevo risposta automatica.
  $(".fa-paper-plane").click(
    function () {

      // Acquisisco il contenuto del campo input.
      var inputValue = $("#writer").val();

      // Se contiene qualcosa,procedo.
      if (inputValue != "") {

        // Scrivo il messaggio passando l'inputValue alla funzione creata in precedenza.
        writeMessage(inputValue);

        // Mi salvo l'indice della chat attiva al momento della digitazione di modo da poter continuare ad operare su di essa.
        var indice = $(".chat-screen-section").index($(".chat-screen-section.active"));

        // Dopo 1 secondo, parte la funzione di risposta creata in precedenza. Gli passo una answerValue a piacere e l'indice da utilizzare nelle operazioni.
        setTimeout(
          function () {
            answerMessage("OK", indice);
          }, 1000
        );

        // Dopo l'invio, svuoto il campo input.
        $("#writer").val("");
      }

      // Dopo l'invio, faccio un reset dei pulsanti aeroplanino e microfono.
      $(".fa-paper-plane").hide();
      $(".fa-microphone").show();
    }
  );

  // -----------------
  // RICERCA CONTATTI
  // -----------------

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


  // Cerco contatto digitando sulla barra di ricerca. Con questo metodo prende anche l'inserimento con l'incolla del mouse.
  $("#search-writer").on("input",
    function () {

      // Ciclo su ogni elemento di classe contact-box.
      $(".contact-box").each(
        function () {

          // Acquisisco i valori del campo di ricerca e del nome contatto, li rendo minuscoli e li confronto.
          var searchValue = $("#search-writer").val().toLowerCase();
          var nomeContatto = $(this).find("h2").text().toLowerCase();
          var esitoControllo = nomeContatto.includes(searchValue);

          // Se il contatto non combacia, lo nascondo.
          if (esitoControllo == false) {
            $(this).hide();

          // Altrimenti, lo mostro.
          } else {
            $(this).show();
          }
        }
      );
    }
  );


  // -----------------------------------------------------
  // CREAZIONE MENU A TENDINA CON TASTO ELIMINA MESSAGGIO
  // -----------------------------------------------------


  // Al click sull'icona, apro il menu a tendina.
  $(document).on("click", ".open-menu",
    function () {
      $(this).children(".dropdown-menu").toggle();

      // Imposto lo scroll nel caso in cui la tendina uscisse fuori dallo schermo in basso.
      var currentHeight = $(".chat-screen-section.active")[0].scrollHeight;
      $(".chat-screen-section.active").scrollTop(currentHeight);
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


  // ----------------------------------
  // CAMBIO CHAT AL CLICK SUI CONTATTI
  // ----------------------------------


  // Al click su un contatto, apro la chat corrispondente e aggiorno le info del contatto.
  $(".contact-box").click(
    function () {

      // Se il contatto non è già classe active, allora procedo.
      if ($(this).hasClass("active") == false) {

        // Rimuovo la classe active a tutti gli elementi che la possiedono attualmente.
        $(".contact-box").removeClass("active");
        $(".chat-screen-section").removeClass("active");
        $(".chat-tools-section p").removeClass("active");

        // Mi salvo l'indice del contact-box che ho cliccato.
        var indice = $(".contact-box").index(this);

        // Aggiungo la classe active a tutti gli elementi con l'indice corrispondente (contact-box, finestra chat ,info status utente).
        $(this).addClass("active");
        $(".chat-screen-section").eq(indice).addClass("active");
        $(".chat-tools-section p").eq(indice).addClass("active");

        // Acquisisco l'src dell'immagine e il nome del contatto cliccato e li sostituisco nelle info contatto correnti.
        var img = $(this).find("img").attr("src");
        var nome = $(this).find("h2").text();
        $(".chat-tools-section img").attr("src", img);
        $(".chat-tools-section h2").text(nome);
      }
    }
  );



});
