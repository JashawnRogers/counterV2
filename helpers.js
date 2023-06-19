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
    console.log(total);
  });
};

const minus = (elem) => {
  on("click", elem, () => {
    const total = --elem.nextElementSibling.value;
    console.log(total);
  });
};

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
