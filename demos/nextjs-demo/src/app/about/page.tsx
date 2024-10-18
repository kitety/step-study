import Link from "next/link";

const About = () => {
  let a = 1;
  // console.log((an as unknown as string).charAt(23));
  return (
    <div>
      <h1>About</h1>
      <Link href='/' className='text-red-900'>
        Home Page
      </Link>
    </div>
  );
};

export default About;
