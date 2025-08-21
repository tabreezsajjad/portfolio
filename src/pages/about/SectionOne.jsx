import React from 'react';
// Import your reusable animation components
import { StaggeredReveal, FadeInUp, Parallax } from './about.motion'; 

const SectionOne = () => {
    const content = {
        heading: "What I do now",
        paragraphs: [
            "By day, I'm an Interaction Designer at Google Search, where I wrangle design challenges at scale and advocate for the billions searching for answers.",
            "By night (and often early mornings), I referee two tiny humans and serve as caretaker to a lively cast of 37 adopted backyard creatures. Some furry, feathered, and occasionally imaginary."
        ],
        images: {
            topImage: {
                src: "/images/about/section_one/image_one.webp",
                alt: "A designer's workspace with two large monitors showing user interface designs."
            },
            bottomImage: {
                src: "/images/about/section_one/image_two.png",
                alt: "An illustration of a diverse cast of cartoon backyard animals."
            }
        }
    };

    return (
        // Main container: No changes here
        <div className="grid grid-cols-1 lg:grid-cols-[45%_55%]">

            {/* Left Column (Text): No changes to the outer div */}
            <div className="bg-[#F4EDBA] h-auto p-8 flex flex-col justify-center items-start lg:h-screen lg:sticky lg:top-0 lg:items-end lg:pr-16">
                
                {/* Text content wrapper now uses StaggeredReveal for animation */}
                <StaggeredReveal className="w-full max-w-md">
                    {/* The h1 is wrapped in FadeInUp to animate it */}
                    <FadeInUp>
                        <h1 className="text-4xl font-abril-fc mb-6 md:text-5xl lg:text-6xl">
                            {content.heading}
                        </h1>
                    </FadeInUp>
                    {/* The div containing the paragraphs is wrapped in FadeInUp to animate it */}
                    <FadeInUp>
                        <div className="text-base leading-relaxed space-y-4 md:text-lg">
                            <p>{content.paragraphs[0]}</p>
                            <p>{content.paragraphs[1]}</p>
                        </div>
                    </FadeInUp>
                </StaggeredReveal>
            </div>

            {/* Right Column (Images): No changes to the outer div */}
            <div className="bg-[#43b4fe]">
                
                {/* The first image container is wrapped in the Parallax component */}
                <Parallax speed={0.3}>
                    <div className="h-screen">
                        <img
                            src={content.images.topImage.src}
                            alt={content.images.topImage.alt}
                            className="w-full h-full object-cover"
                        />
                    </div>
                </Parallax>
                
                {/* The second image container is also wrapped in the Parallax component */}
                <Parallax speed={0.4}>
                     <div className="h-screen">
                        <img
                            src={content.images.bottomImage.src}
                            alt={content.images.bottomImage.alt}
                            className="w-full h-full object-cover"
                        />
                    </div>
                </Parallax>
            </div>
        </div>
    );
}

export default SectionOne;
