import "./home.css";
import Navbar from "../../components/navbar/Navbar";
import Headers from "../../components/headers/Headers";
import Featured from "../../components/Featured/Featuered";
import PropertyList from "../../components/propertyList/PropertyList";
import FeaturedProperties from "../../components/FeaturedProperties/FeaturedProperties";
import MailList from "../../components/MailList/MailList";
import Footer from "../../components/Footer/Footer";
const Home = () => {
  return <div>
      <Navbar/>
      <Headers/>
      <div className="homeContainer">
        <Featured/>
        <h1 className="homeTitle">Browse by property type</h1>
        <PropertyList/>
        <h1 className="homeTitle">Home guests love</h1>
        <FeaturedProperties />
        <MailList/>
        <Footer/>
      </div>
  </div>;
};

export default Home;
