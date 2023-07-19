import React from "react";

export default function ImageComponent({ url }) {
    const [loading, setLoading] = useState(true);
    const [avatar, setAvatar] = useState("https://img.studiomate.kr/avatars/4N0XfNT3na2FbjSKzZQ20WzxWVxlV0Ft5CbI6nmx_2048x2048.png");

    useEffect(() => (loading ? Toast.loading("Loading", 50000) : Toast.hide()), [loading]);
    const getError = () => {
        setAvatar("default_img.png");
        setLoading(false);
    };
    return (
        <img
            src={url}
            alt="음식내역"
            onLoad={() => setLoading(false)}
            onError={getError}
        />
    );
}
