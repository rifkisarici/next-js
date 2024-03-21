
import SecureLS from "secure-ls";
import { login, singup,logout} from "../api/apiCalls";

export const encodingAES = () => {
  if (global?.localStorage) {
    return new SecureLS({
      encodingType: 'aes',
      encryptionSecret: process.env.NEXT_PUBLIC_SECURELS_SECRET,
    });
  }
}

export const loginHandler = async (body, gContext) => {
  const response = await login(body);
  const user = {
    ...response.data.userDTO,
    token: response.data.token,
    isLoggedIn: true,
  };
  loginSuccess(user, gContext)
}

export const signupHandler  = async (body,gContext) => {
  await singup(body);
  loginHandler(body, gContext)
}
 

export const loginSuccess = (user, globalContext) => {
  if (user.token) {
    encodingAES().set("argebull-auth", user)
    globalContext.setCurrentUser(user)
    globalContext.setHeader(previousHeader => ({
      ...previousHeader,
      button: "profile"
    }));
  }
}

export const logoutSuccess = async (globalContext) => {
  try {
    await logout();
    encodingAES().remove("argebull-auth")
    globalContext.setCurrentUser({isLoggedIn: false});
    globalContext.setHeader(previousHeader => ({
      ...previousHeader,
      button: "account"
    }));
  } catch (error) { }
}






