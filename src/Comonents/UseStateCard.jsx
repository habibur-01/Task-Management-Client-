import {PropTypes} from "prop-types"

const UseStateCard = ({name, total}) => {
    return (
        <div>
            <div className="stats shadow bg-slate-100 text-[#ff9f9f]">

                <div className="stat">
                    <div className="stat-title"> {name} </div>
                    <div className="stat-value">{total}</div>
                </div>

            </div>

        </div>
    );
};
UseStateCard.propTypes = {
    name: PropTypes.string,
    total: PropTypes.any
}

export default UseStateCard;