import {PropTypes} from "prop-types"

const SectionTitle = ({title, icon}) => {
    return (
        <div className="py-2 border-b-4">
            <h1 className="text-3xl font-medium flex items-center gap-4">{icon}{title}</h1>
        </div>
    );
};
SectionTitle.propTypes ={
    title: PropTypes.string,
    icon: PropTypes.any
}

export default SectionTitle;