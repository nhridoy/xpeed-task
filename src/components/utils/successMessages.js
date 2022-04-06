const successMessages = (url) => {
  fetch(url)
    .then((response) => response.json())
    .then((json) => {
      const messages = json.messages;

      if (json.status === "success") {
        for (const message of messages) {
          const div = document.createElement("div");
          div.innerHTML = message;
          div.setAttribute("class", "alert alert-success");
          document.querySelector("body").appendChild(div);
        }
      } else {
        for (const message of messages) {
          const div = document.createElement("div");
          div.innerHTML = message;
          div.setAttribute("class", "alert alert-danger");
          document.querySelector("body").appendChild(div);
        }
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
