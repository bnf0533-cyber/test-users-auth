import { useEffect, useState } from "react";
import { getUsers } from "../services/api";

function Users() {
    const [users, setUsers] = useState<any[]>([]);
    const [error, setError] = useState("");

    useEffect(() => {
        getUsers()
            .then((data) => setUsers(data))
            .catch((err) => setError(err.response?.data || "error : users error"));
    }, []);

    return (
        <div>
            <h2>USERS</h2>
            <div>
                {users.map((u: any) => (
                    <div key={u._id}>
                        {u.email} - {u.username}
                    </div>
                ))}
            </div>
            {error && <div>{error}</div>}
        </div>
    );
}

export default Users;
