import Link from "next/link";
import Image from "next/image";
export default function Dashboard() {
 return (
  <div id="wd-dashboard">
   <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
   <h2 id="wd-dashboard-published">Published Courses (7)</h2> <hr />
   <div id="wd-dashboard-courses">
    <div className="wd-dashboard-course">
     <Link href="/courses/1234" className="wd-dashboard-course-link">
      <Image src="/images/reactjs.jpg" width={200} height={150} alt="reactjs" />
      <div>
       <h5> CS1234 React JS </h5>
       <p className="wd-dashboard-course-title">
        Full Stack software developer
       </p>
       <button> Go </button>
      </div>
     </Link>
    </div>
    <div className="wd-dashboard-course">
         <Link href="/courses/4700" className="wd-dashboard-course-link">
      <Image src="/images/networks.jpg" width={200} height={150} alt="networks" />
      <div>
       <h5> CS4700 Network Fundamentals </h5>
       <p className="wd-dashboard-course-title">
        Networks
       </p>
       <button> Go </button>
      </div>
     </Link>
    </div>
    </div>
    <div className="wd-dashboard-course"> 
    <Link href="/courses/4530" className="wd-dashboard-course-link">
      <Image src="/images/software.jpg" width={200} height={150} alt="software" />
      <div>
       <h5> CS4530 Fundamentals of Software Engineering </h5>
       <p className="wd-dashboard-course-title">
        Software Engineer
       </p>
       <button> Go </button>
      </div>
     </Link>
    </div>
    <Link href="/courses/4550" className="wd-dashboard-course-link">
      <Image src="/images/html.jpg" width={200} height={150} alt="html" />
      <div>
       <h5> CS4550 Web Development </h5>
       <p className="wd-dashboard-course-title">
        Wed developer
       </p>
       <button> Go </button>
      </div>
     </Link>
     <Link href="/courses/3386" className="wd-dashboard-course-link">
      <Image src="/images/game.jpg" width={200} height={150} alt="game" />
      <div>
       <h5> CS3386 Game Programming II </h5>
       <p className="wd-dashboard-course-title">
        Full Stack software developer
       </p>
       <button> Go </button>
      </div>
     </Link>
     <Link href="/courses/1205" className="wd-dashboard-course-link">
      <Image src="/images/piano.jpg" width={200} height={150} alt="piano" />
      <div>
       <h5> MUSC1205 Piano Class 1 </h5>
       <p className="wd-dashboard-course-title">
        Pianist
       </p>
       <button> Go </button>
      </div>
     </Link>
     <Link href="/courses/1501" className="wd-dashboard-course-link">
      <Image src="/images/portugal.jpg" width={200} height={150} alt="portugal" />
      <div>
       <h5> PORT1501  Accelerated Elementary Portuguese 1 </h5>
       <p className="wd-dashboard-course-title">
        Portugal
       </p>
       <button> Go </button>
      </div>
     </Link>

   </div>
);}
