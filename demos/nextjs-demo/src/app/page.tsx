export default function Home() {
  return (
    <main className=' min-h-screen  '>
      <div
        className=' bg-red-300 bg-[url("/4.svg")] bg-center bg-no-repeat inline-block'
        style={{ fontSize: 0, backgroundSize: "40%" }}
      >
        <div className='inline-block'></div>
        {/* <Image
          className='inline-block'
          src='https://cdn.jsdelivr.net/gh/kitety/blog_img@master/img/2.jpg'
          alt='Next.js Logo'
          width={400}
          height={400}
        /> */}
        {/* <img
          src='/4.svg'
          alt=''
          className='w-1/2 ml-[50%] mt-[50%] -translate-x-1/2 -translate-y-1/2'
        /> */}
      </div>
    </main>
  );
}
