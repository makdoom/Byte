import {
  GitHubLogoIcon,
  LinkedInLogoIcon,
  TwitterLogoIcon,
} from "@radix-ui/react-icons";
import { Globe, Youtube } from "lucide-react";

export const About = () => {
  return (
    <div>
      <p className="leading-6">
        Heya 👋 This is Makdoom Shaikh, Frontend Web Developer who is passionate
        about the JavaScript web technologies building websites and web
        applications. I have done my internship at Digital Solution Media as
        Frontend Developer. I love to build beautiful and responsive websites
        using modern HTML5, CSS3, JavaScript and React. I can develop Responsive
        Web Apps (React). I have also hands-on experience in JavaScript, React
        and Redux ( State Management ).
      </p>

      <div className="mt-8">
        <h4 className="text-muted-foreground">Social Links</h4>
        <div className="mt-4 flex gap-4">
          <div className="group cursor-pointer h-10 w-10 bg-card flex justify-center items-center rounded-full hover:bg-black transition ease-in">
            <Globe
              size="17"
              className="group-hover:text-white transition ease-in"
            />
          </div>

          <div className="cursor-pointer group h-10 w-10 bg-card flex justify-center items-center rounded-full hover:bg-black">
            <GitHubLogoIcon fontSize={20} className="group-hover:text-white" />
          </div>

          <div className="cursor-pointer group h-10 w-10 bg-card flex justify-center items-center rounded-full hover:bg-blue-700">
            <LinkedInLogoIcon
              fontSize={20}
              className="group-hover:text-white"
            />
          </div>

          <div className="cursor-pointer group h-10 w-10 bg-card flex justify-center items-center rounded-full hover:bg-sky-500">
            <TwitterLogoIcon fontSize={20} className="group-hover:text-white" />
          </div>

          <div className="cursor-pointer group h-10 w-10 bg-card flex justify-center items-center rounded-full hover:bg-red-500">
            <Youtube size="17" className="group-hover:text-white" />
          </div>
        </div>
      </div>
    </div>
  );
};
