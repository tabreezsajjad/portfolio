import React from "react";
import { StaggeredReveal, FadeInUp, Parallax } from "./about.motion";

const SectionTwo = () => {
  const content = {
    heading: "Where I worked",
    paragraphs: [
      "My design journey spans 15 years and has taken me from roles at PayPal and Citrix, and now Google.",
      "As a passion project, I was also part of a core founding team of a startup that was later acquired by Zomato.",
      "Whether shaping analytics tools or streamlining knowledge systems, I've always been driven by clarity, curiosity, and care.",
    ],
    image: {
      src: "/images/about/section_two/image_one.png",
      alt: "Logos of companies including PayPal, Citrix, Google, and Zomato.",
    },
  };

  return (
    // Keep your grid + background exactly the same
    <StaggeredReveal className="grid grid-cols-1 lg:grid-cols-[45%_55%] bg-white">
      {/* Left Column (Text) */}
      <div className="bg-[#E5FBFF] h-full flex flex-col justify-center items-start p-8 lg:items-end lg:p-16">
        <div className="w-full max-w-md">
          <FadeInUp>
            <h1 className="text-4xl font-abril-fc mb-6 md:text-5xl lg:text-6xl">
              {content.heading}
            </h1>
          </FadeInUp>

          <div className="text-base leading-relaxed space-y-4 md:text-lg">
            <FadeInUp><p>{content.paragraphs[0]}</p></FadeInUp>
            <FadeInUp><p>{content.paragraphs[1]}</p></FadeInUp>
            <FadeInUp><p>{content.paragraphs[2]}</p></FadeInUp>
          </div>
        </div>
      </div>

      {/* Right Column (Image) */}
      <div className="bg-white flex items-center justify-center p-8 lg:p-16">
        <FadeInUp>
          <Parallax speed={0.25}>
            <img
              src={content.image.src}
              alt={content.image.alt}
              className="object-contain w-full h-auto max-h-[50vh] max-w-3xl"
            />
          </Parallax>
        </FadeInUp>
      </div>
    </StaggeredReveal>
  );
};

export default SectionTwo;
