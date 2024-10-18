import getAllUser from "@/lib/getAllUser";
import Link from "next/link";

const User = async () => {
    const users:any[]= await getAllUser();
    console.log('hello')
    return (
        <div>
            <h1 className={'text-3xl'}>User Page</h1>
            {users?.map((user)=>{
                return (
                    <Link href={`/users/${user.id}`} key={user.id} >
                        <h2>{user.name}</h2>
                    </Link>
                )
            })}
        </div>
    )
}
export default User
