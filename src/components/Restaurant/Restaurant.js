import React from "react";
import './Restaurant.css';
import McChicken from '../../images/McChickenBurger.png'

function Restaurant() {
    return(
        <div className="Restaurant-Container">
            <MenuItem />
            <MenuItem />
        </div>
    )
}

export default Restaurant;

function MenuItem() {
    return(
        <div className="MenuItem-Container">
            <img src={McChicken} />
            <p id="item-name">Chicken Burger</p>
            <div className="sub_div">
                <p id="item-description">Burger with chicken</p>
            </div>
        </div>
    )
}