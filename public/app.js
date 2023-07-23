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

export { getElem, on, todaysDate, getPhxTimeStamp };
