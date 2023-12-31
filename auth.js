import { postData } from "./modules/httpReq.js";
import { setCookie } from "./modules/cookie.js";
import authHandler from "./modules/authorization.js";
import validateForm from "./modules/validation.js";

const inputsBox = document.querySelectorAll("input");
const LoginBtn = document.querySelector("button");

const submitHandler = async (event) => {
    event.preventDefault();
    const username = inputsBox[0].value;
    const password = inputsBox[1].value;
    const validation = validateForm(username, password);
    if (!validation) return;
   
    const response = await postData("auth/login", {
        username,
        password
    });
    setCookie(response.token);
    location.assign("index.html");
  };


LoginBtn.addEventListener("click", submitHandler);
document.addEventListener("DOMContentLoaded" , authHandler);
