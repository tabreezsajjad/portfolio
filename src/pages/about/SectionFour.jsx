import React from "react";
import { StaggeredReveal, FadeInUp, Parallax } from "./about.motion";

const SectionFour = () => {
  const content = {
    title: "Where I've lived",
    description:
      "I grew up in the green hills of Coorg, India, a place steeped in tradition and coffee. After formative years in Bangalore, I moved to the US in 2016. Since then, I've lived in Raleigh before landing in the SF Bay Area, where my roots are now replanted.",
    images: {
      main: "/images/about/section_four/image_one.webp",
      grid: [
        "/images/about/section_four/image_two.webp",
        "/images/about/section_four/image_three.webp",
        "/images/about/section_four/image_four.webp",
        "/images/about/section_four/image_five.webp",
      ],
    },
  };

  return (
    // Keep your existing grid & backgrounds; only motion wrappers added
    <StaggeredReveal className="grid grid-cols-1 lg:grid-cols-[45%_55%]">
      {/* Left Column (Text) */}
      <div className="bg-[#F3FFE6] h-auto p-8 flex flex-col justify-center items-start lg:h-screen lg:sticky lg:top-0 lg:items-end lg:pr-16">
        <div className="w-full max-w-md">
          <FadeInUp>
            <h1 className="text-4xl font-abril-fc mb-6 md:text-5xl lg:text-6xl">
              {content.title}
            </h1>
          </FadeInUp>
          <FadeInUp>
            <p className="text-base leading-relaxed md:text-lg">
              {content.description}
            </p>
          </FadeInUp>
        </div>
      </div>

      {/* Right Column (Images) */}
      <div className="bg-white flex flex-col items-center">
        {/* Main Image with subtle parallax */}
        <FadeInUp>
          <Parallax speed={0.22}>
            <img
              src={content.images.main}
              alt="A scenic landscape of Coorg, India."
              className="w-full h-auto object-cover max-w-xl"
            />
          </Parallax>
        </FadeInUp>

        {/* 2x2 Image Grid with stagger + tiny parallax per tile */}
        <div className="grid grid-cols-2 gap-0 w-full">
          {content.images.grid.map((src, index) => (
                <img
                  src={src}
                  alt={`A photo from one of the places lived, image ${index + 1}`}
                  className="w-full h-auto object-cover"
                />
          ))}
        </div>
      </div>
    </StaggeredReveal>
  );
};

export default SectionFour;
