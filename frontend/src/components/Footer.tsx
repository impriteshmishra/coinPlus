

function Footer() {
  return (
    <footer className="bg-white text-white py-6 mt-10">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl font-bold text-gray-400">CoinPlus</h2>
        <p className="text-sm text-gray-400 mt-1">Master the Market, One Coin at a Time!</p>

        <div className="flex justify-center space-x-6 mt-4 text-gray-400">
        <a href="#" className="hover:text-blue-400">About us</a>
          <a href="#" className="hover:text-blue-400">Privacy Policy</a>
          <a href="#" className="hover:text-blue-400">Terms of Service</a>
          <a href="#" className="hover:text-blue-400">Contact Us</a>
        </div>

        <div className="mt-4">
          <p className="text-xs text-gray-500">&copy; {new Date().getFullYear()} CoinPlus. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer