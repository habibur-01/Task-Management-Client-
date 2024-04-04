
import BannerTitle from "../../../Comonents/BannerTitle/BannerTitle";
import think from "../../../assets/think.jpg"

const Whyus = () => {
    return (
        <div className="px-6">
            <div className="my-20">
            <BannerTitle heading={'Why Choose Us'} subHeading={'Featured'}></BannerTitle>
            </div>
            <div className="flex justify-around items-center gap-6">
            <div className="h-[300px] w-[500px]">

            <img src={think} alt="image" className="w-full h-full object-cover rounded-md overflow-hidden" />

            </div>
            <div>
                
                <h3 className="text-[#ff9f9f] text-sm">Find task</h3>
                <h1 className="text-2xl font-bold border-b-4 py-2">Forget Your Task</h1>
                <div className="w-96 mt-2">
                    <p>Now you do not think about, you can forgot about your task. We are here to notify about your task. So, do not take any pressure about it.You can believe us with closing your eyes.</p>
                </div>

            </div>
            
        </div>
        <div className="flex justify-around items-center gap-10 my-8">
            <div className="h-[300px] w-[500px] order-2">

            <img src={think} alt="image" className="w-full h-full object-cover rounded-md overflow-hidden" />

            </div>
            <div>
                
                <h3 className="text-[#ff9f9f] text-sm">What is important</h3>
                <h1 className="text-2xl font-bold border-b-4 py-2">Achieve the mental stability</h1>
                <div className="w-96 mt-2">
                    <p>Now you do not think about, you can forgot about your task. Task Autometically categorized with is status.No need to categorized manually.It is divided into three parts progress, to do, completed.  So, do not take any pressure about it.You can believe us with closing your eyes.</p>
                </div>

            </div>
            
        </div>
        </div>
    );
};

export default Whyus;