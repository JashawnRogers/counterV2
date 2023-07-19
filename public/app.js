const getElem = (id) => document.getElementById(id);
const createElem = (elem) => document.createElement(elem);

const on = R.curry(function (eventType, element, callback) {
  element.addEventListener(eventType, callback);

  return function () {
    element.removeEventListener(eventType, callback);
  };
});

const plus = (elem) => {
  on("click", elem, () => {
    const total = ++elem.previousElementSibling.value;
  });
};

const minus = (elem) => {
  on("click", elem, () => {
    const total = --elem.nextElementSibling.value;
  });
};

const todaysDate = () => {
  const today = new Date();
  const date =
    today.getMonth() +
    1 +
    " / " +
    today.getDate() +
    " / " +
    today.getFullYear();
  return date;
};

const getPhxTimeStamp = () => {
  const now = new Date();
  return new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Phoenix",
    timeStyle: "medium",
    hour12: false,
  }).format(now);
};

const createNewEntry = (e) => {
  e.preventDefault();
  const foundTotal = getElem("foundTotal").value;
  const notFoundTotal = getElem("notFoundTotal").value;
  const archiveTotal = getElem("archiveTotal").value;
  const total =
    parseInt(foundTotal) + parseInt(notFoundTotal) + parseInt(archiveTotal);

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
  c7.innerHTML = '<button><i class="fa-solid fa-trash-can fa-sm"></i><button>';

  table.appendChild(tableRow);

  return (
    total, foundTotal, notFoundTotal, archiveTotal, todaysDate, getPhxTimeStamp
  );
};

on("click", getElem("saveEntry"), createNewEntry);

//Event handlers
//  account registration and sign in
const openSignInModal = on("click", getElem("headerSignInBtn"), () => {
  getElem("signIn").style.display = "block";
  getElem("signUp").style.display = "none";
});
const openSignInLinkSignUpModal = on(
  "click",
  getElem("signInLink-signUpModal"),
  () => {
    getElem("signUp").style.display = "none";
    getElem("signIn").style.display = "block";
  }
);

const closeSignInModal = on("click", getElem("closeSignInBtn"), () => {
  getElem("signIn").style.display = "none";
});

const openSignUpModal = on("click", getElem("headerSignUpBtn"), () => {
  getElem("signIn").style.display = "none";
  getElem("signUp").style.display = "block";
});

const openSignUpLink = on("click", getElem("signUpLink"), () => {
  getElem("signIn").style.display = "none";
  getElem("signUp").style.display = "block";
});

const closeSignUpModal = on("click", getElem("closeSignUpBtn"), () => {
  getElem("signUp").style.display = "none";
});

// const openForgotPwModal = on("click", getElem("forgotPasswordLink"), () => {
//   getElem("signIn").classList.replace("display-block", "display-none");
//   getElem("forgotPassword").classList.replace("display-none", "display-block");
// });

// const openSignInLinkPwModal = on(
//   "click",
//   getElem("signInLink-forgotPwModal"),
//   () => {
//     getElem("forgotPassword").classList.replace(
//       "display-block",
//       "display-none"
//     );
//     getElem("signIn").classList.replace("display-none", "display-block");
//   }
// );

// const closeForgotPwModal = on("click", getElem("closeForgotPwBtn"), () => {
//   getElem("forgotPassword").classList.replace("display-block", "display-none");
// });

//  counter cards even handlers
plus(getElem("foundPlus"));
minus(getElem("foundMinus"));

plus(getElem("notFoundPlus"));
minus(getElem("notFoundMinus"));

plus(getElem("archivePlus"));
minus(getElem("archiveMinus"));

export { getElem, on };
