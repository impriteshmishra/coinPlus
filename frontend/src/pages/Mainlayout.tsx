
import Navbar from '../components/Navbar'
import Homepage from '../components/Homepage';
import Footer from '../components/Footer';
import Subscribe from '../components/Subscribe';

function Mainlayout() {
  return (
    <div>
      <Navbar />
      <Homepage />
      <Subscribe />
      <Footer />
    </div>
  )
}

export default Mainlayout