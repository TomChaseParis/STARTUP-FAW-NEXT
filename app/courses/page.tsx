import Breadcrumb from "@/components/Common/Breadcrumb";
import Contact from "@/components/Contact";
import CoursesSectionOne from "@/components/Courses/CoursesSectionBeginner";
import CoursesSectionTwo from '@/components/Courses/CoursesSectionTwo'

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Page | Free Next.js Template for Startup and SaaS",
  description: "This is Contact Page for Startup Nextjs Template",
  // other metadata
};

const CoursesPage = () => {
  return (
    <>
    {/*   <Breadcrumb
        pageName="Courses Page"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. In varius eros eget sapien consectetur ultrices. Ut quis dapibus libero."
      /> */}
<div className="pt-[120px] bg-white">

      <CoursesSectionOne />
      <CoursesSectionTwo />
      
</div>
  
    </>
  );
};

export default CoursesPage;
