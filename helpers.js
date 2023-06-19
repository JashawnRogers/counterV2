const getElem = (id) => document.getElementById(id);

const on = R.curry(function (eventType, element, callback) {
  element.addEventListener(eventType, callback);

  return function () {
    element.removeEventListener(eventType, callback);
  };
});

// Event handlers for account registration and sign in
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
