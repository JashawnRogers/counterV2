import { getElem, on, todaysDate, getPhxTimeStamp } from "/app.js";

const db = firebase.firestore();
let entriesRef;
let unsubscribe;

const deleteRow = (e) => {
  if (!e.target.classList.contains("fa-trash-can")) return;

  confirm("Are you sure you want to delete?");
  const btn = e.target;
  btn.closest("tr").remove();
};

const createNewEntry = () => {
  let foundTotal = getElem("foundTotal").value;
  let notFoundTotal = getElem("notFoundTotal").value;
  let archiveTotal = getElem("archiveTotal").value;
  if (!foundTotal) {
    foundTotal = "0";
  }
  if (!notFoundTotal) {
    notFoundTotal = "0";
  }
  if (!archiveTotal) {
    archiveTotal = "0";
  }
  const total =
    parseInt(foundTotal) + parseInt(notFoundTotal) + parseInt(archiveTotal);

  console.log(foundTotal, notFoundTotal, archiveTotal);

  const table = getElem("tableBody");
  const tableRow = table.insertRow(-1);

  let c1 = tableRow.insertCell(0);
  let c2 = tableRow.insertCell(1);
  let c3 = tableRow.insertCell(2);
  let c4 = tableRow.insertCell(3);
  let c5 = tableRow.insertCell(4);
  let c6 = tableRow.insertCell(5);
  let c7 = tableRow.insertCell(6);

  c1.innerText = total;
  c2.innerText = foundTotal;
  c3.innerText = notFoundTotal;
  c4.innerText = archiveTotal;
  c5.innerText = todaysDate();
  c6.innerText = getPhxTimeStamp();
  c7.innerHTML = `<button class="table-delete-btn grow"><i class="fa-solid fa-trash-can fa-sm"></i><button>`;

  table.appendChild(tableRow);

  return total;
};

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    entriesRef = db.collection("Entries");

    on("click", getElem("saveEntry"), () => {
      createNewEntry();

      if (!getElem("foundTotal").value) {
        getElem("foundTotal").value = "0";
      }
      if (!getElem("notFoundTotal").value) {
        getElem("notFoundTotal").value = "0";
      }
      if (!getElem("archiveTotal").value) {
        getElem("archiveTotal").value = "0";
      }

      const total =
        parseInt(getElem("foundTotal").value) +
        parseInt(getElem("notFoundTotal").value) +
        parseInt(getElem("archiveTotal").value);

      entriesRef.add({
        uid: user.uid,
        total: total,
        foundTotal: parseInt(getElem("foundTotal").value),
        notFoundTotal: parseInt(getElem("notFoundTotal").value),
        archiveTotal: parseInt(getElem("archiveTotal").value),
        date: todaysDate(),
        time: getPhxTimeStamp(),
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      });
    });
  }
});
on("click", getElem("table"), deleteRow);
