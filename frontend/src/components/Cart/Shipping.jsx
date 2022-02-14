import React from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { saveShippingInfo } from "../../actions/cartAction";
import { Country, State } from "country-state-city";
import { useAlert } from "react-alert"
import "./Shipping.css";

const Shipping = ({ history }) => {
  const dispatch = useDispatch();
  const alert = useAlert()
  const { shippingInfo } = useSelector((state) => state.cart);

  const [ address, setAddress ] = useState(shippingInfo.address);
  const [ city, setCity ] = useState(shippingInfo.city);
  const [ state, setState ] = useState(shippingInfo.state);
  const [ country, setCountry ] = useState(shippingInfo.country);
  const [ postalCode, setPostalCode ] = useState(shippingInfo.postalCode);
  const [ phoneNo, setPhoneNo ] = useState(shippingInfo.phoneNo);

  const shippingSubmit = (e) => {
    e.preventDefault();

    if (phoneNo.length < 10 || phoneNo.length > 15) {
      alert.error("Phone Number should be more than 10 digits Long");
      return;
    }
    if (postalCode.length < 5 || postalCode.length > 5) {
      alert.error("Postal code should be 5 digits Long");
      return;
    }
    dispatch(
      saveShippingInfo({ address, city, state, country, postalCode, phoneNo })
    );
    history.push("/order/conform");
  };

  return (
    <div>
      <div className="auth-wrapper">
        <div className="auth-inner">
          <form encType="multipart/form-data" onSubmit={shippingSubmit}>
            <h3>Shipping Details</h3>

            <div className="form-group d-flex">
              <input
                type="text"
                className="form-control"
                placeholder="Address"
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>

            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="City"
                required
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <input
                type="number"
                placeholder="Postal Code"
                required
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
              />
            </div>

            <div className="form-group">
              <input
                type="number"
                className="form-control"
                placeholder="Phone Number"
                required
                value={phoneNo}
                onChange={(e) => setPhoneNo(e.target.value)}
                size="10"
              />
            </div>

            <div className="mb-3" id="registerImage">
              <select
                required
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              >
                <option value="">Country</option>
                {Country &&
                  Country.getAllCountries().map((item) => (
                    <option key={item.isoCode} value={item.isoCode}>
                      {item.name}
                    </option>
                  ))}
              </select>
            </div>

            {country && (
              <div className="mb-3">
                <select
                  required
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                >
                  <option value="">State</option>
                  {State &&
                    State.getStatesOfCountry(country).map((item) => (
                      <option key={item.isoCode} value={item.isoCode}>
                        {item.name}
                      </option>
                    ))}
                </select>
              </div>
            )}

            <button
              type="submit"
              className="btn btn-primary btn-block"
              disabled={state ? false : true}
            >
              Continue
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Shipping;
