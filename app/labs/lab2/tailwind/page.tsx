import "./index.css";
import TailwindSpacing from "./TailwindSpacing";
import TailwindTypography from "./TailwindTypography";
import TailwindBackgroundColors from "./TailwindBackgroundColors";
import TailwindResponsiveDesign from "./TailwindResponsiveDesign";
import TailwindFilters from "./TailwindFilters";
import TailwindGrids from "./TailwindGrids";


export default function TailwindLab() {
 return (
   <div className="p-8">
     <h1 className="text-4xl font-bold mb-8">Tailwind CSS</h1>
     <div>
        <TailwindSpacing/>
    </div>
    <div>
        <TailwindTypography/>
    </div>
    <div>
        <TailwindBackgroundColors/>
    </div>
    <div>
        <TailwindResponsiveDesign/>
    </div>
    <div>
        <TailwindFilters/>
    </div>
    <div>
        <TailwindGrids/>
    </div>
   </div>
 );
}
// left off at 2.4