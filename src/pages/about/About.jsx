import React, { useEffect } from 'react'
import SectionOne from './SectionOne'
import SectionTwo from './SectionTwo'
import SectionThree from './SectionThree'
import SectionFour from './SectionFour'



const About = () => {
    useEffect(() => {
        const imagesToPreload = [
            //Section 1
            "/images/about/section_one/image_one.webp",
            "/images/about/section_one/image_two.png",

            //Section 2
            "/images/about/section_two/image_one.png",

            //Section 3
            "/images/about/section_three/image_one.webp",
            "/images/about/section_three/image_two.webp",
            "/images/about/section_three/image_three.webp",
            "/images/about/section_three/image_four.webp",
            "/images/about/section_three/image_five.webp",
            "/images/about/section_three/image_six.webp",
            "/images/about/section_three/image_seven.webp",
            "/images/about/section_three/image_eight.webp",
            "/images/about/section_three/image_nine.webp",
            "/images/about/section_three/image_ten.webp",
            "/images/about/section_three/image_eleven.webp",
            "/images/about/section_three/image_twelve.webp",
            "/images/about/section_three/image_thirteen.webp",
            "/images/about/section_three/image_fourteen.webp",
            "/images/about/section_three/image_fifteen.webp",

            //Section 4
            "/images/about/section_four/image_one.webp",
            "/images/about/section_four/image_two.webp",
            "/images/about/section_four/image_three.webp",
            "/images/about/section_four/image_four.webp",
            "/images/about/section_four/image_five.webp",
        ]

        //Preload Images
        imagesToPreload.forEach((src) => {
            const link = document.createElement("link")
            link.rel = "preload"
            link.as = "image"
            link.href = src
            document.head.appendChild(link)
        })
    }, []) // Empty dependency array means this runs once on mount

    return (
        <>

            <div className="bg-[#ffe6e2]">
                <SectionOne />
                <SectionTwo />
                <SectionThree />
                <SectionFour />
            </div>

        </>
    )
}

export default About