import {
  getElem,
  on,
  total,
  foundTotal,
  notFoundTotal,
  archiveTotal,
  todaysDate,
  getPhxTimeStamp,
} from "/public/app.js";

const db = firebase.firestore();

on("click", getElem("saveEntry"), () => {
  console.log(
    total,
    foundTotal,
    notFoundTotal,
    archiveTotal,
    todaysDate,
    getPhxTimeStamp
  );
});
