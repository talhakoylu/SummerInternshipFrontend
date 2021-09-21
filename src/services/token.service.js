class TokenService {
    getLocalRefreshToken() {
        const token = JSON.parse(localStorage.getItem("token"));
        return token?.refreshToken;
    }

    getLocalAccessToken() {
        const token = JSON.parse(localStorage.getItem("token"));
        return token?.accessToken;
    }

    updateLocalAccessToken(accessToken) {
        let token = JSON.parse(localStorage.getItem("token"));
        token.accessToken = accessToken;
        localStorage.setItem("token", JSON.stringify(token));
    }

    getToken() {
        return JSON.parse(localStorage.getItem("token"));
    }

    getUser() {
        return JSON.parse(localStorage.getItem("user"));
    }

    setUser(user) {
        localStorage.setItem("user", JSON.stringify(user));
    }

    setToken(token) {
        localStorage.setItem("token", JSON.stringify({
            accessToken: token.access,
            refreshToken: token.refresh,
        }));
    }

    removeUser() {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
    }
}

export default new TokenService();
