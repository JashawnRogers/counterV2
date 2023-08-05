import { getElem, on, todaysDate, getPhxTimeStamp } from "/app.js";

const db = firebase.firestore();
let entriesRef = db.collection("Entries");
let unsubscribe;

const deleteAllRows = () => {
  const rowCount = getElem("table").rows.length;
  for (let i = rowCount - 1; i > 0; i--) {
    getElem("table").deleteRow(i);
  }
};

const deleteRow = (e) => {
  // if (!e.target.classList.contains("fa-trash-can")) return;

  const confirmation = confirm("Are you sure you want to delete?");
  if (confirmation) {
    entriesRef
      .doc(e.target.id)
      .delete()
      .then(() => console.log("successfully deleted"))
      .catch((err) => console.log("error removing document: ", err));
  } else {
    return;
  }
};

const renderList = (doc) => {
  const table = getElem("tableBody");
  const tableRow = table.insertRow(-1);

  let c1 = tableRow.insertCell(0);
  let c2 = tableRow.insertCell(1);
  let c3 = tableRow.insertCell(2);
  let c4 = tableRow.insertCell(3);
  let c5 = tableRow.insertCell(4);
  let c6 = tableRow.insertCell(5);
  let c7 = tableRow.insertCell(6);

  c1.innerText = doc.data().total;
  c2.innerText = doc.data().foundTotal;
  c3.innerText = doc.data().notFoundTotal;
  c4.innerText = doc.data().archiveTotal;
  c5.innerText = doc.data().date;
  c6.innerText = doc.data().time;
  c7.innerHTML = `<button class="table-delete-btn grow"><i id=${doc.id} class="fa-solid fa-trash-can fa-sm"></i><button>`;

  table.appendChild(tableRow);
};

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    on("click", getElem("saveEntry"), (e) => {
      e.preventDefault();
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

    unsubscribe = entriesRef
      .where("uid", "==", user.uid)
      .onSnapshot((snapshot) => {
        let changes = snapshot.docChanges();
        changes.forEach((change) => {
          if (change.type == "added") {
            renderList(change.doc);
          } else if (change.type == "removed") {
            const targetElem = getElem(`${change.doc.id}`);
            targetElem.closest("tr").remove();
          }
        });
      });
  } else {
    deleteAllRows();
    unsubscribe && unsubscribe();
  }
});
on("click", getElem("table"), (e) => {
  deleteRow(e);
});
// on intial load check for existing data
// on changes relay changes to ui
