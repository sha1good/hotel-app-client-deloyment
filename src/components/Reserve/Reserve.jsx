import "./reserve.css";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useContext, useState } from "react";
import { SearchContext } from "../../context/SearchContext";
import useFetch from "../../hooks/useFetch";
import { useNavigate } from "react-router-dom";


const Reserve = ({ setOpen, hotelId }) => {
  const reactBaseUrl = process.env.REACT_APP_BASE_URL;
  const { loading, data } = useFetch(`${reactBaseUrl}/hotels/room/${hotelId}`);
  const [selectedRooms, setSelectedRooms] = useState([]);
   const navigate = useNavigate(); 
  const { dates } = useContext(SearchContext);

  const getDateInRange = (start, end) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const date = new Date(startDate.getTime());
    let dateList = [];
    while (date <= endDate) {
      dateList.push(new Date(date).getTime());
      date.setDate(date.getDate() + 1);
    }

    return dateList;
  };

  const allDates = getDateInRange(dates[0]?.startDate, dates[0]?.endDate);

  const isAvailable = (roomNumber) => {
    const isFound = roomNumber.unAvailableDates.some((date) =>
      allDates.includes(new Date(date).getTime())
    );

    return !isFound;
  };
  const handleSelect = (event) => {
    const checked = event.target.checked;
    const value = event.target.value;
    setSelectedRooms(
      checked
        ? [...selectedRooms, value]
        : selectedRooms.filter((item) => item !== value)
    );
  };

  const handleReserve = async () => {
     //We are using Promise all here  because selectedRooms is an Array  of roomNumbers
    // selected that needs to be resolved and  going to return a single value of either 
    // error  or response  from the API
    try {
      await Promise.all(
        selectedRooms.map((roomNumberId) => {
          const response = axios.put(
            `${reactBaseUrl}/rooms/availability/${roomNumberId}`,
            { dates: allDates }
          );
          return response.data;
        })
      );
    } catch (error) {
      return error.message;
    }
    setOpen(false);
    navigate("/")
  };

  return (
    <div className="reserve">
      <div className="reserveContainer">
        <FontAwesomeIcon
          icon={faCircleXmark}
          onClick={() => setOpen(false)}
          className="faClose"
        />
        <span> Select your rooms:</span>
        {data.map((item) => (
          <div className="roomItem" key={item._id}>
            <div className="roomInfo">
              <div className="roomTitle">{item.title}</div>
              <div className="roomDesc">{item.desc}</div>
              <div className="roomMaxPeople">
                {" "}
                Max People: <b>{item.maxPeople}</b>
              </div>
              <div className="roomPrice">
                <b>{item.roomPrice}</b>
              </div>
              <div className="roomSelected">
                {item.roomNumbers.map((roomNumber) => (
                  <div className="room" key={roomNumber._id}>
                    <label>{roomNumber.number}</label>
                    <input
                      type="checkbox"
                      value={roomNumber._id}
                      onChange={handleSelect}
                      disabled={!isAvailable(roomNumber)}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
        <button className="reserveButton" onClick={handleReserve}  disabled={loading}>
          Reserve Now!
        </button>
      </div>
    </div>
  );
};

export default Reserve;
