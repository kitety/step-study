export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <nav>About navBar</nav>
      <main>{children}</main>
    </>
  );
}
