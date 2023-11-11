import React, { useState } from 'react'
import useUserStore from '../Store/store';
function ItemList({ itemName, itemId, dropdownPart }) {
    const { channels, pushChannel, filterChannels, subchannels, filtersubChannels, pushsubChannel, pushdist, filterdist, pushZone, filterZone, pushState, filterState, pushRegion, filterRegion, pushCity, filterCity } = useUserStore();
    const [isClicked, setIsClicked] = useState(false);

    const handleAdd = (e) => {

        setIsClicked(!isClicked)
        if (dropdownPart === "1") {
            pushChannel(e);
        }
        else if (dropdownPart === "2") {
            pushsubChannel(e);
        }
        else if (dropdownPart === "3") {
            pushdist(e);
        }
        else if (dropdownPart === "4") {
            pushZone(e);
        }
        else if (dropdownPart === "5") {
            pushState(e);
        }
        else if (dropdownPart === "6") {
            pushRegion(e);
        }
        else if (dropdownPart === "7") {
            pushCity(e);
        }

    };

    const handleFilter = (e) => {

        setIsClicked(!isClicked)
        if (dropdownPart === "1") {
            filterChannels(e);
        }
        else if (dropdownPart === "2") {
            filtersubChannels(e);
        }
        else if (dropdownPart === "3") {
            filterdist(e);
        }
        else if (dropdownPart === "4") {
            filterZone(e);
        }
        else if (dropdownPart === "5") {
            filterState(e);
        }
        else if (dropdownPart === "6") {
            filterRegion(e);
        }
        else if (dropdownPart === "7") {
            filterCity(e);
        }

    };

    return (
        <div class="dropdown-item" style={{ display: "flex", cursor: "pointer" }}
            onClick={() => { (isClicked) ? handleFilter(itemName) : handleAdd(itemName); }}>
            <input type="checkbox" id="all" name="allx" value={isClicked} checked={isClicked}
            />
            <label for="allx" style={{ marginLeft: "2rem" }}>{itemName}</label>
        </div>
    )
}

export default ItemList