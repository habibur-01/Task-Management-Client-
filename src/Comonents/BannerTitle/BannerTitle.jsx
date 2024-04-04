import { PropTypes } from "prop-types";


const SectionTitle = ({heading, subHeading}) => {
    return (
        <div className="mx-auto w-3/12 text-center my-8">
            
            <h3 className="text-[#ff9f9f] mb-2 italic">---{subHeading}---</h3>
            <h1 className=" text-3xl border-y-4 py-4 uppercase">{heading}</h1>
            
        </div>
    );
};
SectionTitle.propTypes = {
    heading: PropTypes.string,
    subHeading: PropTypes.string
}

export default SectionTitle;