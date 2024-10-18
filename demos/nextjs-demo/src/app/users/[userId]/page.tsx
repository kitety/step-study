import getUser from "@/lib/getUser";
import {FC} from "react";


interface UserProps {
    params: {
        userId: string
    }
}

const UserId: FC<UserProps> = async (props) => {
    console.log(props.params?.userId)
    const user = await getUser(props.params?.userId)
    console.log(user)
    return (
        <div >
            {user.username}
        </div>
    );
};

export default UserId;
