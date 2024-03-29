const getElem = (id) => document.getElementById(id);

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

const resetUI = () => {
  getElem("userTaskInput").value = "";
  getElem("foundTotal").value = "0";
  getElem("notFoundTotal").value = "0";
  getElem("archiveTotal").value = "0";
};

if (!getElem("foundTotal").value) {
  getElem("foundTotal").value = "0";
}
if (!getElem("notFoundTotal").value) {
  getElem("notFoundTotal").value = "0";
}
if (!getElem("archiveTotal").value) {
  getElem("archiveTotal").value = "0";
}

on("click", getElem("resetBtn"), resetUI);

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

const expiryDate = () => {
  const expiry = new Date();
  expiry.setDate(expiry.getDate() + 30);
  return expiry;
};

const getPhxTimeStamp = () => {
  const now = new Date();
  return new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Phoenix",
    timeStyle: "medium",
    hour12: false,
  }).format(now);
};

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

//  counter cards even handlers
plus(getElem("foundPlus"));
minus(getElem("foundMinus"));

plus(getElem("notFoundPlus"));
minus(getElem("notFoundMinus"));

plus(getElem("archivePlus"));
minus(getElem("archiveMinus"));

export { getElem, on, todaysDate, getPhxTimeStamp, expiryDate, resetUI };
