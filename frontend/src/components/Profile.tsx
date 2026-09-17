import { useEffect, useState } from "react";
import { useUserStore } from "../store/useUserStore";
import { getProfile } from "../services/api";

function Profile() {
    const token = useUserStore((s) => s.token);
    const user = useUserStore((s) => s.user);
    const logout = useUserStore((s) => s.logout);
    const setAuth = useUserStore((s) => s.login);
    const [profile, setProfile] = useState<any>(user);

    useEffect(() => {
        if (token) {
            getProfile(token)
                .then((data) => {
                    setProfile(data);
                    setAuth(token, data);
                })
                .catch(() => {});
        }
    }, [setAuth, token]);

    return (
        <div>
            <h2>PROFILE</h2>
            {profile && (
                <div>
                    <p>username: {profile.username}</p>
                    <p>email: {profile.email}</p>
                </div>
            )}
            <button onClick={logout}>Log out</button>
        </div>
    );
}

export default Profile;
