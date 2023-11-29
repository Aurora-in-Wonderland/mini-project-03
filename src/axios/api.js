import axios from "axios";

const instance = axios.create({
    baseURL: process.env.REACT_APP_SERVER_URL,
    // baseURL: "http://1.244.223.183",
});

instance.interceptors.request.use(
    // 요청을 보내기 전 수행되는 함수
    function (config) {
        console.log("인터셉터 요청 성공!");
        const accessToken = localStorage.getItem("accessToken");
        console.log(accessToken);
        accessToken && (config.headers.accesstoken = accessToken);
        console.log(config.headers.Authorization);
        console.log(config.headers);
        return config;
    },

    // 오류 요청을 보내기 전 수행되는 함수
    function (error) {
        console.log("인터셉터 요청 오류");
        return Promise.reject(error);
    }
);

instance.interceptors.response.use(
    // 응답을 내보내기 전 수행되는 함수
    function (response) {
        console.log("인터셉터 응답 받았습니다.");
        console.log(response);
        if (response.headers.accesstoken !== undefined) localStorage.setItem("accessToken", response.headers.accesstoken);
        if (response.headers.authorization !== undefined) localStorage.setItem("authorizationToken", response.headers.authorization);
        if (response.data.username !== undefined) localStorage.setItem("username", response.data.username);
        return response;
    },

    // 오류응답을 내보내기 전 수행되는 함수
    function (error) {
        console.log("인터셉터 응답 오류 발생");
        console.log(error);
        error.response.data.accessValidationError && localStorage.removeItem("accessToken");
        if (error.response.data.refreshValidationError) {
            localStorage.removeItem("authorizationToken");
            console.log("redirect");
            document.location.href = "/login";
        }
        const refreshToken = localStorage.getItem("authorizationToken");
        if (refreshToken !== null) {
            delete error.config.headers?.accesstoken;
            const body = error.config.data ? JSON.parse(error.config.data) : null;
            const headers = error.config.headers;
            headers.Authorization = refreshToken;
            if (error.config.method === "get") {
                console.log("1111111");
                console.log(11);
                console.log(error.config.url);
                console.log(headers);
                return (
                    refreshToken &&
                    instance[error.config.method](error.config.url, {
                        headers: headers,
                    })
                );
            } else {
                return (
                    refreshToken &&
                    instance[error.config.method](error.config.url, body, {
                        headers: headers,
                    })
                );
            }
        } else {
            if (!error.config.url.includes("login")) {
                alert("로그인 후 사용 가능합니다.");
                document.location.href = "/login";
            }
        }
        return Promise.reject(error);
    }
);

export default instance;
