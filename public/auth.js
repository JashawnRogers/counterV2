import { getElem, on } from "/app.js";

let unsubscribe;

const checkPassword = (pw, confirmPw, username) => {
  const errors = [];
  console.log(username);
  if (pw.length < 5) {
    errors.push("Your password must be at least 5 characters. ");
  }
  if (pw.search(/(?=.*\d)/) < 0) {
    errors.push("Your password must contain at least one number. ");
  }
  if (pw.search(/(?=.*[a-z])/) < 0) {
    errors.push("Your password must contain at least one lowercase letter. ");
  }
  if (pw.search(/(?=.*[A-Z])/) < 0) {
    errors.push("Your password must contain at least one uppercase letter. ");
  }
  if (pw !== confirmPw) {
    errors.push("The confirmation password does not match. ");
  }
  if (username.length < 4) {
    errors.push("Username must be at least 4 characters. ");
  }
  if (!username.search(/^[a-zA-Z0-9_]$/)) {
    errors.push(
      "Username can only contain alphanumeric characters with the exception of the underscore. "
    );
  }
  if (errors.length > 0) {
    alert(errors.join("\n"));
    return false;
  }
  return true;
};

const userSignUp = async (e) => {
  e.preventDefault();
  const signUpUserName = `${getElem("signUpUserName").value}@tasktracker.com`;
  const signUpUserPassword = getElem("signUpUserPassword").value;
  const confirmPassword = getElem("confirmPassword").value;

  if (
    checkPassword(
      signUpUserPassword,
      confirmPassword,
      getElem("signUpUserName").value
    )
  ) {
    firebase
      .auth()
      .createUserWithEmailAndPassword(signUpUserName, signUpUserPassword)
      .then(() => {
        console.log("successfull sign up");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorCode, errorMessage);
      });
  }
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
      getElem("authSection").style.display = "none";
      getElem("counterSection").style.display = "flex";
      getElem("signIn").style.display = "none";
      getElem("signUp").style.display = "none";
      getElem("userTaskInput").style.display = "flex";
      getElem("headerSignInBtn").style.display = "none";
      getElem("headerSignUpBtn").style.display = "none";
      getElem("headerSignOutBtn").style.display = "block";
      getElem("circle1").style.top = "2%";
      getElem("circle1").style.right = "11%";
      getElem("circle2").style.bottom = "9%";

      console.log("signed in");
    } else {
      // signed out
      getElem("signIn").style.display = "block";
      getElem("signUp").style.display = "none";
      getElem("userTaskInput").style.display = "none";

      getElem("headerSignInBtn").style.display = "block";
      getElem("headerSignUpBtn").style.display = "block";

      getElem("circle1").style.top = "23%";
      getElem("circle1").style.right = "20%";
      getElem("circle2").style.bottom = "5%";

      getElem("counterSection").style.display = "none";
      getElem("authSection").style.display = "flex";

      getElem("headerSignOutBtn").style.display = "none";
      console.log("signed out");

      unsubscribe && unsubscribe();
    }
  });
};

checkAuthState();
on("click", getElem("headerSignOutBtn"), userSignOut);
on("click", getElem("signUpSubmitBtn"), userSignUp);
on("click", getElem("signInSubmitBtn"), userSignIn);
