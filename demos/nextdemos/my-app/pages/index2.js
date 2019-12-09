import Link from 'next/link'
function A () {
  return <div>
    <p>首页Index</p>
    <Link href="user/profile" ><a title="profile">Profile</a></Link>
  </div>
}
export default A

