import { getElem, on } from "/app.js";

const userSignUp = async (e) => {
  e.preventDefault();
  const signUpUserName = `${getElem("signUpUserName").value}@tasktracker.com`;
  const signUpPassword = getElem("signUpPassword").value;

  firebase
    .auth()
    .createUserWithEmailAndPassword(signUpUserName, signUpPassword)
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

on("click", getElem("signUpSubmitBtn"), userSignUp);
