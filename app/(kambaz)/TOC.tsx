import Link from "next/link";
export default function TOC() {
 return (
   <ul>
     <li>
       <Link href="/labs" id="wd-lab1-link">
         Home </Link> </li>
     ...
     <li>
       <Link href="/" id="wd-kambaz-link">
         Kambaz </Link> </li>
   </ul>
);}
