const Header = () => {
  const logo =
    "https://th.bing.com/th/id/OIP.pP8u4JOiKUrg7_TpugJ9NAAAAA?rs=1&pid=ImgDetMain";
  return (
    <header className="w-full h-20 flex justify-center items-center border-b-2">
      <img src={logo} alt="logo" className="h-full" />
    </header>
  );
};

export default Header;
