import { Link } from "react-router-dom";
import "./searchItem.css";
const SearchItem = ({ searchData }) => {
  return (
    <div className="searchItem">
      <img
        alt=""
        src={
          searchData?.photos[0]
            ? searchData.photos[0]
            : "https://cf.bstatic.com/xdata/images/hotel/square600/261707778.webp?k=fa6b6128468ec15e81f7d076b6f2473fa3a80c255582f155cae35f9edbffdd78&o=&s=1"
        }
        className="siImg"
      />
      <div className="siDesc">
        <h1 className="siTitle">{searchData.name}</h1>
        <span className="siDistance">{searchData.distance} from center</span>
        <span className="siTaxiOp">Free airport taxi</span>
        <span className="siSubtitle">
          Studio Apartment with Air conditioning
        </span>
        <span className="siFeatures">{searchData?.desc}</span>
        <span className="siCancelOp">Free cancellation </span>
        <span className="siCancelOpSubtitle">
          You can cancel later, so lock in this great price today!
        </span>
      </div>
      <div className="siDetails">
        {searchData?.rating && (
          <div className="siRating">
            <span>Excellent</span>
            <button>{searchData?.rating}</button>
          </div>
        )}
        <div className="siDetailTexts">
          <span className="siPrice">${searchData?.cheapestPrice}</span>
          <span className="siTaxOp">Includes taxes and fees</span>
          <Link to={`/hotels/${searchData._id}`}><button className="siCheckButton">See availability</button></Link>
        </div>
      </div>
    </div>
  );
};

export default SearchItem;
