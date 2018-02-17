// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function() {
    $(".change-devour").on("click", function(event) {
        var id = $(this).data("id");
        update = {
            devoured: '1'
        };   
      // Send the PUT request.
      $.ajax("/api/burgers/" + id, {
        type: "PUT",
        data: update
      }).then(
        function() {
          console.log("changed devoured to", update);
          // Reload the page to get the updated list
          location.reload();
        }
      );
    });
  
    $(".create-form").on("submit", function(event) {
      // Make sure to preventDefault on a submit event.
      event.preventDefault();
  
      var burger = {
        burgerName: $("#burgerName").val().trim(),
        devoured: '0'
      };
  
      // Send the POST request.
      $.ajax("/api/burgers", {
        type: "POST",
        data: burger
      }).then(
        function() {
          console.log("created new burger");
          // Reload the page to get the updated list
          location.reload();
        }
      );
    });
  });
  