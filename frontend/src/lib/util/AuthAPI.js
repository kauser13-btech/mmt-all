"use client";
import Cookies from "js-cookie";

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost/api";

const AuthAPI = {
  // Login function
  login: async (email, password) => {
    try {
      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          error: data.message || "Login failed",
          errors: data.errors || {},
        };
      }

      // Store user session
      if (data.token) {
        Cookies.set("mmt_user_session", data.token, { expires: 7 });
        Cookies.set("mmt_user_name", data.user.name, { expires: 7 });
        Cookies.set("mmt_user_id", data.user.id, { expires: 7 });
      }

      return {
        success: true,
        user: data.user,
        token: data.token,
      };
    } catch (error) {
      console.error("Login error:", error);
      return {
        success: false,
        error: "Network error. Please try again.",
      };
    }
  },

  // Register function
  register: async (name, email, password, password_confirmation) => {
    try {
      const response = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ name, email, password, password_confirmation }),
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          error: data.message || "Registration failed",
          errors: data.errors || {},
        };
      }

      // Store user session
      if (data.token) {
        Cookies.set("mmt_user_session", data.token, { expires: 7 });
        Cookies.set("mmt_user_name", data.user.name, { expires: 7 });
        Cookies.set("mmt_user_id", data.user.id, { expires: 7 });
      }

      return {
        success: true,
        user: data.user,
        token: data.token,
      };
    } catch (error) {
      console.error("Registration error:", error);
      return {
        success: false,
        error: "Network error. Please try again.",
      };
    }
  },

  // Logout function
  logout: async () => {
    try {
      const userToken = Cookies.get("mmt_user_session");

      if (userToken) {
        await fetch(`${API_URL}/logout`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${userToken}`,
          },
        });
      }
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      // Clear cookies regardless of API call success
      Cookies.remove("mmt_user_session");
      Cookies.remove("mmt_user_name");
      Cookies.remove("mmt_user_id");
    }
  },

  // Check if user is authenticated
  isAuthenticated: () => {
    return !!Cookies.get("mmt_user_session");
  },

  // Get current user info from cookies
  getCurrentUser: () => {
    const token = Cookies.get("mmt_user_session");
    const name = Cookies.get("mmt_user_name");
    const id = Cookies.get("mmt_user_id");

    if (!token) return null;

    return { id, name, token };
  },
};

export default AuthAPI;
