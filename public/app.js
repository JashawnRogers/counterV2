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

on("click", getElem("saveEntry"), (e) => {
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

  c1.innerText = total;
  c2.innerText = foundTotal;
  c3.innerText = notFoundTotal;
  c4.innerText = archiveTotal;
  c5.innerText = todaysDate();

  table.appendChild(tableRow);
});

//Event handlers
//  account registration and sign in
const openSignInModal = on("click", getElem("headerSignInBtn"), () => {
  getElem("signIn").classList.replace("display-none", "display-block");
});
const openSignInLinkSignUpModal = on(
  "click",
  getElem("signInLink-signUpModal"),
  () => {
    getElem("signUp").classList.replace("display-block", "display-none");
    getElem("signIn").classList.replace("display-none", "display-block");
  }
);

const closeSignInModal = on("click", getElem("closeSignInBtn"), () => {
  getElem("signIn").classList.replace("display-block", "display-none");
});

const openSignUpModal = on("click", getElem("headerSignUpBtn"), () => {
  getElem("signUp").classList.replace("display-none", "display-block");
});

const openSignUpLink = on("click", getElem("signUpLink"), () => {
  getElem("signIn").classList.replace("display-block", "display-none");
  getElem("signUp").classList.replace("display-none", "display-block");
});

const closeSignUpModal = on("click", getElem("closeSignUpBtn"), () => {
  getElem("signUp").classList.replace("display-block", "display-none");
});

const openForgotPwModal = on("click", getElem("forgotPasswordLink"), () => {
  getElem("signIn").classList.replace("display-block", "display-none");
  getElem("forgotPassword").classList.replace("display-none", "display-block");
});

const openSignInLinkPwModal = on(
  "click",
  getElem("signInLink-forgotPwModal"),
  () => {
    getElem("forgotPassword").classList.replace(
      "display-block",
      "display-none"
    );
    getElem("signIn").classList.replace("display-none", "display-block");
  }
);

const closeForgotPwModal = on("click", getElem("closeForgotPwBtn"), () => {
  getElem("forgotPassword").classList.replace("display-block", "display-none");
});

//  counter cards even handlers
plus(getElem("foundPlus"));
minus(getElem("foundMinus"));

plus(getElem("notFoundPlus"));
minus(getElem("notFoundMinus"));

plus(getElem("archivePlus"));
minus(getElem("archiveMinus"));

export { getElem, on };
