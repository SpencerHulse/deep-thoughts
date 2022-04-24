import decode from "jwt-decode";

class AuthService {
  // Retrieve token data
  getProfile() {
    return decode(this.getToken());
  }

  // Check if the user is still logged in
  loggedIn() {
    // Check if there is a valid saved token (exists + not expired)
    const token = this.getToken();
    // Use type coersion to check if the token is NOT undefined and NOT expired
    return !!token && !this.isTokenExpired(token);
  }

  // Check if the token has expired
  isTokenExpired(token) {
    try {
      const decoded = decode(token);
      if (decoded.exp < Date.now() / 1000) {
        return true;
      } else {
        return false;
      }
    } catch (err) {
      return false;
    }
  }

  // Retrieve token from localStorage
  getToken() {
    return localStorage.getItem("id_token");
  }

  // Set token to localStorage and reload to homepage
  login(idToken) {
    localStorage.setItem("id_token", idToken);

    window.location.assign("/");
  }

  // Clear token from localStorage and force logout with reload
  logout() {
    localStorage.removeItem("id_token");

    window.location.assign("/");
  }
}

export default new AuthService();
