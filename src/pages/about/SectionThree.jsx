import React from "react";
import { StaggeredReveal, FadeInUp, Parallax } from "./about.motion";

const SectionThree = () => {
  const content = {
    heading: "Outside of work",
    paragraphs: [
      "Design is how I think. Storytelling is how I connect. Sustainability is how I live. I spend weekends at farmers markets, on kid-friendly trails, or sketching book ideas drawn from my Kodava heritage. I believe small decisions — in parenting, in pixels, in what we choose to buy — add up.",
      "I write and illustrate books for my kids that preserve traditions from Coorg. I also dabble in cross-stitch and textile art — a craft passed down by my mother. Lately, I've been exploring beginner-friendly needlepoint kits for other curious hands.",
    ],
    images: {
      stickyLeft: [
        { src: "/images/about/section_three/image_one.webp", alt: "A detailed cross-stitch artwork in progress." },
        { src: "/images/about/section_three/image_four.webp", alt: "A child's illustrated book with vibrant colors." },
      ],
      rightColumnLeft: [
        { src: "/images/about/section_three/image_two.webp", alt: "Fresh vegetables at a farmer's market." },
        { src: "/images/about/section_three/image_five.webp", alt: "A family hiking on a sunny trail." },
        { src: "/images/about/section_three/image_seven.webp", alt: "A sketchbook open with pencil drawings." },
        { src: "/images/about/section_three/image_nine.webp", alt: "Close-up of a needlepoint kit." },
      ],
      rightColumnRight: [
        { src: "/images/about/section_three/image_three.webp", alt: "A cup of coffee with a traditional Coorg pattern." },
        { src: "/images/about/section_three/image_six.webp", alt: "An illustrated storybook character." },
        { src: "/images/about/section_three/image_eight.webp", alt: "A display of colorful textile art." },
        { src: "/images/about/section_three/image_ten.webp", alt: "A child's hands working on a craft." },
      ],
      additionalSection: {
        topImage: { src: "/images/about/section_three/image_eleven.webp", alt: "A wide shot of a beautiful landscape." },
        bottomGrid: [
          { src: "/images/about/section_three/image_twelve.webp", alt: "Detail of a finished textile piece." },
          { src: "/images/about/section_three/image_thirteen.webp", alt: "A collection of illustrated children's books." },
          { src: "/images/about/section_three/image_fourteen.webp", alt: "A person sketching in a notebook." },
          { src: "/images/about/section_three/image_fifteen.webp", alt: "A beautiful, sustainable product." },
        ],
      },
    },
  };

  return (
    // Keep your grid & spacing exactly as-is; just add motion wrappers
    <StaggeredReveal className="grid grid-cols-1 lg:grid-cols-[45%_55%]">
      {/* Left Column (Text) */}
      <div className="bg-[#FFE6E2] h-auto p-8 flex flex-col justify-center items-start lg:h-screen lg:sticky lg:top-0 lg:items-end lg:pr-16">
        <div className="w-full max-w-md">
          <FadeInUp>
            <h1 className="text-4xl font-abril-fc mb-6 md:text-5xl lg:text-6xl">
              {content.heading}
            </h1>
          </FadeInUp>

          <div className="text-base leading-relaxed space-y-4 md:text-lg">
            <FadeInUp><p>{content.paragraphs[0]}</p></FadeInUp>
            <FadeInUp><p>{content.paragraphs[1]}</p></FadeInUp>
          </div>
        </div>
      </div>

      {/* Right Column (Image Collage) */}
      <div className="bg-white p-4 sm:p-8">
        {/* Top collage */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Sticky column (md+) */}
          <div className="hidden md:flex md:flex-col md:gap-4 md:sticky md:top-8 self-start">
            {content.images.stickyLeft.map((image, i) => (
              <FadeInUp key={i}>
                {/* Soft, subtle parallax; slightly different speeds for depth */}
                <Parallax speed={i === 0 ? 0.18 : 0.24}>
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-auto object-cover"
                  />
                </Parallax>
              </FadeInUp>
            ))}
          </div>

          {/* Scrolling columns */}
          <div className="grid grid-cols-2 gap-4 col-span-1 md:col-span-2">
            <div className="flex flex-col gap-4">
              {content.images.rightColumnLeft.map((image, i) => (
                <FadeInUp key={i}>
                  <Parallax speed={0.12 + i * 0.03}>
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-auto object-contain"
                    />
                  </Parallax>
                </FadeInUp>
              ))}
            </div>
            <div className="flex flex-col gap-4">
              {content.images.rightColumnRight.map((image, i) => (
                <FadeInUp key={i}>
                  <Parallax speed={0.12 + i * 0.03}>
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-auto object-contain"
                    />
                  </Parallax>
                </FadeInUp>
              ))}
            </div>
          </div>
        </div>

        {/* Additional bottom section */}
        <div className="mt-8 md:mt-16">
          <FadeInUp>
            <Parallax speed={0.2}>
              <img
                src={content.images.additionalSection.topImage.src}
                alt={content.images.additionalSection.topImage.alt}
                className="w-full h-auto object-cover mb-4"
              />
            </Parallax>
          </FadeInUp>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {content.images.additionalSection.bottomGrid.map((image, i) => (
              <FadeInUp key={i}>
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-auto object-cover"
                />
              </FadeInUp>
            ))}
          </div>
        </div>
      </div>
    </StaggeredReveal>
  );
};

export default SectionThree;
