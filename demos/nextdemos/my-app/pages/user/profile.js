import Link from 'next/link'

export default () => {
  function kl () {
    console.log(1);
  }
  return (
    <div>
      <p onClick={kl}>profile</p>
      <Link href="/"><a>Index</a></Link>
    </div>
  )
}

