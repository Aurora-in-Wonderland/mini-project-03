import axios from "axios";

const instance = axios.create({
    baseURL: process.env.REACT_APP_SERVER_URL,
});

instance.interceptors.request.use(
    // 요청을 보내기 전 수행되는 함수
    function (config) {
        console.log("인터셉터 요청 성공!");
        const accessToken = localStorage.getItem("accessToken");
        accessToken && (config.headers.accesstoken = accessToken);
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
        response.headers.accesstoken && localStorage.setItem("accessToken", response.headers.accesstoken);
        response.headers.authorization && localStorage.setItem("authorizationToken", response.headers.authorization);
        response.data.username && localStorage.setItem("username", response.data.username);
        return response;
    },

    // 오류응답을 내보내기 전 수행되는 함수
    function (error) {
        console.log("인터셉터 응답 오류 발생");
        console.log(error);
        error.response.data.accessValidationError && localStorage.removeItem("accessToken");
        if (error.response.data.refreshValidationError) {
            localStorage.removeItem("authorizationToken");
            document.location.href = "/login";
        }

        const refreshToken = localStorage.getItem("authorizationToken");
        if (refreshToken !== null) {
            delete error.config.headers?.accesstoken;
            const body = JSON.parse(error.config.data);
            const headers = error.config.headers;
            headers.authorization = refreshToken;
            return (
                refreshToken &&
                instance[error.config.method](error.config.url, body, {
                    headers: headers,
                })
            );
        } else {
            alert("로그인 후 사용 가능합니다.")
            document.location.href = "/login";
        }
        console.log("End");

        return Promise.reject(error);
    }
);

export default instance;
