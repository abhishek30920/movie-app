import React from "react";
import { Link, useLocation } from "react-router-dom";
import SliderUtil from "../../component/SliderUtil";
import { useGetNewMoviesQuery } from "../../redux/api/movies";
import { Home, Film, PlayCircle } from "lucide-react";

const Header = () => {
  const { data, isLoading } = useGetNewMoviesQuery();
  const location = useLocation();

  const navItems = [
    { path: "/", label: "Home", icon: Home },
    { path: "/movies", label: "Browse Movies", icon: Film },
    { path: "/upcoming", label: "Coming Soon", icon: PlayCircle },
  ];

  return (
    <div className="w-full bg-black">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          {/* Navigation Column */}
     

          {/* Slider Column */}
          <div className="lg:col-span-6 w-full">
            {isLoading ? (
              <div className="w-full aspect-[21/9] bg-zinc-900 rounded-lg flex items-center justify-center">
                <div className="text-gray-400">Loading...</div>
              </div>
            ) : (
              <SliderUtil data={data} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;