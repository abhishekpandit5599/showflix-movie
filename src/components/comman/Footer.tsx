const Footer = () => {
  return (
    <footer className="bg-[#221f1f] py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <a
              href="/"
              className="text-[#e50914] font-heading font-bold text-xl flex items-center"
            >
              <i className="fas fa-tv mr-2"></i>
              <span>ShowFlix</span>
            </a>
            <p className="text-gray-400 text-sm mt-2">
              Your ultimate TV show explorer
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <a
              href="#"
              className="text-gray-400 hover:text-[#e50914] transition-colors"
            >
              <i className="fab fa-twitter text-xl"></i>
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-[#e50914] transition-colors"
            >
              <i className="fab fa-facebook text-xl"></i>
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-[#e50914] transition-colors"
            >
              <i className="fab fa-instagram text-xl"></i>
            </a>
          </div>
        </div>
        <div className="mt-6 pt-6 border-t border-[#564d4d]/30 text-center text-gray-400 text-sm">
          <p>
            © {new Date().getFullYear()} ShowFlix. All rights reserved. Data
            provided by TVMaze API.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
