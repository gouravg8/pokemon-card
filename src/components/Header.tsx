const Header = () => {
	const logo =
		"https://pluspng.com/img-png/pokemon-logo-png-file-pokemon-logo-png-500.png";
	return (
		<header className="w-full h-20 md:h-24 py-4 flex justify-center items-center">
			<img src={logo} alt="logo" className="h-full" />
		</header>
	);
};

export default Header;
