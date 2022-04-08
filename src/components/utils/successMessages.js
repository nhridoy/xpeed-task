const successMessages = (url) => {
  fetch(url)
    .then((response) => response.json())
    .then((json) => {
      const messages = json.messages;

      if (json.status === "success") {
        messages.map((message, index) => {
          const div = document.createElement("div");
          div.innerHTML = index + 1 + ". " + message;
          div.setAttribute("class", "alert alert-success");
          document.querySelector("body").appendChild(div);
        });
      } else {
        messages.map((message, index) => {
          const div = document.createElement("div");
          div.innerHTML = index + 1 + ". " + message;
          div.setAttribute("class", "alert alert-danger");
          document.querySelector("body").appendChild(div);
        });
      }
      const cleaner = setTimeout(cleanDom, 2000);
      function cleanDom() {
        document.querySelectorAll(".alert").forEach((alert) => {
          alert.remove();
        });
      }
    });
};
export default successMessages;
