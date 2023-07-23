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
      getElem("authSection").style.display = "none";
      getElem("counterSection").style.display = "flex";
      // getElem("counterSection").style.height = "100%";
      getElem("signIn").style.display = "none";
      getElem("signUp").style.display = "none";
      getElem("headerSignInBtn").style.display = "none";
      getElem("headerSignUpBtn").style.display = "none";
      getElem("headerSignOutBtn").style.display = "block";
      getElem("circle1").style.top = "2%";
      getElem("circle1").style.right = "11%";
      getElem("circle2").style.bottom = "9%";
      // getElem("html").style.height = "100vh";

      console.log("signed in");
    } else {
      // signed out
      // take out display classes in html and just add them here instead of replacing them
      getElem("signIn").style.display = "block";
      getElem("signUp").style.display = "none";

      getElem("headerSignInBtn").style.display = "block";
      getElem("headerSignUpBtn").style.display = "block";

      getElem("circle1").style.top = "23%";
      getElem("circle1").style.right = "20%";
      getElem("circle2").style.bottom = "5%";

      getElem("counterSection").style.display = "none";
      getElem("authSection").style.display = "flex";

      getElem("headerSignOutBtn").style.display = "none";

      // getElem("htmlBody").style.minHeight = "100vh";
      console.log("signed out");
    }
  });
};

checkAuthState();
on("click", getElem("headerSignOutBtn"), userSignOut);
on("click", getElem("signUpSubmitBtn"), userSignUp);
on("click", getElem("signInSubmitBtn"), userSignIn);
