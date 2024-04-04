import { PropTypes } from "prop-types";


const BannerTitle = ({heading, subHeading}) => {
    return (
        <div className="mx-auto md:w-3/12 w-3/4 text-center my-8">
            
            <h3 className="text-[#ff9f9f] mb-2 italic">---{subHeading}---</h3>
            <h1 className=" text-3xl border-y-4 py-4 uppercase">{heading}</h1>
            
        </div>
    );
};
BannerTitle.propTypes = {
    heading: PropTypes.string,
    subHeading: PropTypes.string
}

export default BannerTitle;