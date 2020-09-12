async function handleSubmit(event) {
  event.preventDefault();
  document.getElementById("results").innerHTML = "";

  // check what text was put into the form field
  let formText = document.getElementById("text").value;

  if (Client.checkForText(formText)) {
    let d = {};
    d.text = formText;
    // Code inspired from https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
    const response = await fetch("http://localhost:8081/test", {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url

      body: JSON.stringify(d),
    });

    const r = await response.json();

    document.getElementById("results").innerHTML = JSON.stringify(r);
  } else {
    document.getElementById("results").innerHTML =
      "ERROR: Please enter text to be analyze!";
  }
}

export { handleSubmit };
