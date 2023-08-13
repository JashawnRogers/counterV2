import { getElem, on, todaysDate, getPhxTimeStamp, expiryDate } from "/app.js";

const db = firebase.firestore();
let entriesRef = db.collection("Entries");
let unsubscribe;

const getTotal = () => {
  if (getElem("foundTotal").value === "") {
    getElem("foundTotal").value = "0";
  }
  if (getElem("notFoundTotal").value === "") {
    getElem("notFoundTotal").value = "0";
  }
  if (getElem("archiveTotal").value === "") {
    getElem("archiveTotal").value = "0";
  }

  const total =
    parseInt(getElem("foundTotal").value) +
    parseInt(getElem("notFoundTotal").value) +
    parseInt(getElem("archiveTotal").value);

  return total;
};

const deleteAllRowsFromDB = (user) => {
  const confirmation = confirm("Are you sure you want to delete all entries?");

  if (confirmation) {
    entriesRef.where("uid", "==", user.uid).onSnapshot((snapshot) => {
      snapshot.docs.forEach((doc) => {
        entriesRef
          .doc(doc.id)
          .delete()
          .catch((err) => {
            alert("Error Deleting all documents!");
            console.log("error removing document: ", err);
          });
      });
    });
  } else {
    return;
  }
};

const deleteAllRowsFromUI = () => {
  const rowCount = getElem("table").rows.length;
  for (let i = rowCount - 1; i > 0; i--) {
    getElem("table").deleteRow(i);
  }
};

const deleteRow = (e) => {
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
  let c8 = tableRow.insertCell(7);

  c1.innerText = doc.data().task;
  c2.innerText = doc.data().total;
  c3.innerText = doc.data().foundTotal;
  c4.innerText = doc.data().notFoundTotal;
  c5.innerText = doc.data().archiveTotal;
  c6.innerText = doc.data().date;
  c7.innerText = doc.data().time;
  c8.innerHTML = `<button class="table-delete-btn grow"><i id=${doc.id} class="fa-solid fa-trash-can fa-sm"></i><button>`;

  table.appendChild(tableRow);
};

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    on("click", getElem("saveEntry"), (e) => {
      e.preventDefault();

      console.log(getElem("notFoundTotal").value);

      if (getElem("userTaskInput").value) {
        entriesRef.add({
          uid: user.uid,
          task: getElem("userTaskInput").value,
          total: getTotal(),
          foundTotal: parseInt(getElem("foundTotal").value),
          notFoundTotal: parseInt(getElem("notFoundTotal").value),
          archiveTotal: parseInt(getElem("archiveTotal").value),
          date: todaysDate(),
          time: getPhxTimeStamp(),
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
          expiry: expiryDate(),
        });
      } else {
        alert("Please enter a task name");
      }
    });

    unsubscribe = entriesRef
      .where("uid", "==", user.uid)
      .where("date", "==", todaysDate())
      .orderBy("date")
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

    on("click", getElem("deleteAll"), () => {
      console.log("Delete all button clicked");
      deleteAllRowsFromDB(user);
    });
  } else {
    deleteAllRowsFromUI();
    unsubscribe && unsubscribe();
  }
});
on("click", getElem("table"), (e) => {
  deleteRow(e);
});
