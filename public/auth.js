import { getElem, on } from "/app.js";

const userSignUp = async (e) => {
  e.preventDefault();
  const signUpUserName = `${getElem("signUpUserName").value}@tasktracker.com`;
  const signUpUserPassword = getElem("signUpUserPassword").value;

  firebase
    .auth()
    .createUserWithEmailAndPassword(signUpUserName, signUpUserPassword)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log(user);
      alert("successfull sign in");
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorCode, errorMessage);
    });
};

const userSignIn = async (e) => {
  e.preventDefault();
  const signInUserName = `${getElem("signInUserName").value}@tasktracker.com`;
  const signInUserPassword = getElem("signInUserPassword").value;

  firebase
    .auth()
    .signInWithEmailAndPassword(signInUserName, signInUserPassword)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log(user);
      alert("successfull sign in");
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorCode, errorMessage);
    });
};

const userSignOut = async () => {
  firebase
    .auth()
    .signOut()
    .then(() => {
      alert("successfull sign out");
      console.log("successfull sign out");
    })
    .catch((error) => {
      console.log(error, "error signing out");
    });
};

const checkAuthState = async () => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // signed in
      // take out display classes in html and just add them here instead of replacing them
      getElem("authSection").classList.add("display-none");
      getElem("counterSection").classList.add("display-block");
      getElem("signIn").classList.replace("display-block", "display-none");
      getElem("headerSignInBtn").classList.add("display-none");
      getElem("headerSignUpBtn").classList.add("display-none");
      getElem("headerSignOutBtn").classList.add("display-block");
      getElem("circle1").style.top = "2%";
      getElem("circle1").style.right = "11%";
      getElem("circle2").style.bottom = "9%";
      getElem("htmlBody").style.height = "100%";

      console.log("signed in");
    } else {
      // signed out
      // take out display classes in html and just add them here instead of replacing them
      getElem("counterSection").classList.add("display-none");
      getElem("authSection").classList.add("display-block");
      getElem("headerSignOutBtn").classList.add("display-none");
      getElem("htmlBody").style.height = "100vh";
      console.log("signed out");
    }
  });
};

checkAuthState();
on("click", getElem("headerSignOutBtn"), userSignOut);
on("click", getElem("signUpSubmitBtn"), userSignUp);
on("click", getElem("signInSubmitBtn"), userSignIn);
