
import { endpoints } from "../api";
import { setLoading, setToken, setSignupData } from "../../slices/authSlice";
import { apiConnector } from "../apiconnector";
import { toast } from "react-hot-toast";
import { setUser } from "../..//slices/profileSlice"; 
const { SIGNUP_API ,  LOGIN_API} = endpoints;





export function signUp( firstName, lastName, email, password, confirmPassword) {
  
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("POST", SIGNUP_API, {
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
      });

      console.log("SIGNUP API RESPONSE:", response);

      if (!response?.data?.success) {
        toast.error(response?.data?.message || "Signup failed");
        throw new Error(response?.data?.message || "Signup failed");
      }

      
      dispatch(setSignupData(response.data));

      toast.success("Signup Successful");

      // If backend returns token on signup:
      if (response?.data?.token) {
        const token = response.data.token;
        dispatch(setToken(token));
        if (typeof window !== "undefined") {
          localStorage.setItem("token", JSON.stringify(token));
        }
      }

      return { success: true, data: response.data };
    } catch (error) {
      console.error("SIGNUP API ERROR:", error);
      toast.error(error?.message || "Signup Failed");
      return { success: false, error };
    } finally {
      dispatch(setLoading(false));
      toast.dismiss(toastId);
    }
  };
}

export function login(email, password) {
  
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));

    try {
      const response = await apiConnector("POST", LOGIN_API, { email, password });

      console.log("LOGIN API RESPONSE:", response);

      if (!response?.data?.success) {
        const msg = response?.data?.message || "Login failed";
        throw new Error(msg);
      }

      const token = response?.data?.token ?? null;
      const loginUser = response?.data?.LoginUserExist ?? null;

      if (loginUser) {
        toast.success("Login Successful");

        if (token) {
          dispatch(setToken(token));
        }

        
        const userImage = loginUser?.image
          ? loginUser.image
          : `https://api.dicebear.com/5.x/initials/svg?seed=${loginUser.firstName}${loginUser.lastName}`;

      
        dispatch(setUser({ ...loginUser, image: userImage }));

       
        if (typeof window !== "undefined") {
          if (token) localStorage.setItem("token", JSON.stringify(token));
          localStorage.setItem("user", JSON.stringify({ ...loginUser, image: userImage }));
        }
      } else {
      
        dispatch(setUser(null));
        if (typeof window !== "undefined") {
          localStorage.removeItem("user");
        }
      }

      toast.dismiss(toastId);
      dispatch(setLoading(false));

      return { success: true, data: response.data };
    } catch (error) {
      console.error("LOGIN API ERROR:", error);
      toast.error("Login Failed");

      toast.dismiss(toastId);
      dispatch(setLoading(false));

      return { success: false, error };
    }
  };
}


export function logout(navigate) {
  return (dispatch) => {
    dispatch(setToken(null))
    dispatch(setUser(null))
  
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    toast.success("Logged Out")
    navigate("/")
  }
}
