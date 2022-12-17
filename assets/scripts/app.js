//const listElement = document.querySelector(".data");
const itemTemplate = document.getElementById("data");
const form = document.querySelector("#new-item form");

function sendHttpRequest(method, url, data) {
  const promise = new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.open(method, url);

    xhr.responseType = 'json';

    xhr.onload = function() {
      resolve(xhr.response);
    };

    xhr.send(JSON.stringify(data));
  });

  return promise;
}



async function createItem(email, dodid, command, manufacturer) {
  const item = {
    Email: email,
    DODID: dodid,
    Command: command,
    Manufacturer: manufacturer,
  };

  sendHttpRequest(
    "POST",
    "https://prod-12.usdodcentral.logic.azure.us:443/workflows/3e697a0821fb41799132cbb5af5aa0f7/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=_vdgndR6YaqVuRwKWp_HKJIA2cm1y31ynxQ7Y_QtKU0",
    item
  );
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const enteredEmail = event.currentTarget.querySelector("#email").value;
  const enteredDODID = event.currentTarget.querySelector("#dodid").valueAsNumber;
  const enteredCommand = event.currentTarget.querySelector("#command").value;
  const enteredManufacturer = event.currentTarget.querySelector("#manufacturer").value;

  console.log(enteredEmail);
  console.log(enteredDODID);
  console.log(enteredCommand);
  console.log(enteredManufacturer);

  createItem(enteredEmail, enteredDODID, enteredCommand, enteredManufacturer);
});
