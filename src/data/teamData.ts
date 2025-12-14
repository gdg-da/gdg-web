const teamMembers = [
    {
        name: "Pranshu Patel",
        role: "Convener",
        image: "/photos/pranshu.png",
        color: "gdg-blue",
        stats: ["TypeScript", "JavaScript", "Python"],
        quote: "A fullstack dev who loves to explore new technologies and simulate physics and maths in code.",
        social: {
            github: "https://github.com/pranshu05",
            linkedin: "https://linkedin.com/in/pranshu05",
            twitter: "https://x.com/pranshu_05"
        }
    },
    {
        name: "Kalp Chaniyara",
        role: "Deputy Convener",
        image: "/photos/kalp.jpg",
        color: "gdg-green",
        stats: ["TypeScript", "Python", "Go", "DevOps"],
        quote: "I love turning ideas into reality through code and enjoy deep dives into how things work under the hood.",
        social: {
            github: "https://github.com/Kalp-Chaniyara",
            linkedin: "https://linkedin.com/in/chaniyarakalp",
            twitter: "https://x.com/KalpChaniyara14"
        }
    },
    {
        name: "Param Savjani",
        role: "Core Member",
        image: "/photos/param.jpg",
        color: "gdg-red",
        stats: ["Springboot", "kotlin", "Javascript", "React.js", "Node.js"],
        quote: "Passionate backend-focused web developer specializing in springboot. Skilled in React.js, Node.js, kotlin, MongoDB, and PostgreSQL.",
        social: {
            github: "https://github.com/paramsavjani",
            linkedin: "https://in.linkedin.com/in/paramsavjani",
        }
    },
    {
        name: "Atik Samir Vohra",
        role: "Core Member",
        image: "/photos/atik.jpg",
        color: "gdg-yellow",
        stats: ["C++", "JavaScript", "Dart", "MySQL"],
        quote: "I aim to use my abilities to create a meaningful impact and add value wherever I go with a mindset focused on learning, improvement, and contributing positively.",
        social: {
            github: "https://github.com/atik-7866",
            linkedin: "https://www.linkedin.com/in/atik-vohra-321b33288/",
        }
    },
    {
        name: "Neel Khatri",
        role: "Core Member",
        image: "/photos/neel.jpg",
        color: "gdg-blue",
        stats: ["JavaScript", "Full-stack", "DevOps", "C++"],
        quote: "I love to make UI with AI. And I vibe to music and code ;)",
        social: {
            github: "https://github.com/Neel7780",
            linkedin: "https://www.linkedin.com/in/neel-khatri-aa1618242",
            twitter: "https://x.com/NeelKhatri20"
        }
    },
    {
        name: "Dhruvam Panchal",
        role: "Core Member",
        image: "/photos/dhruvam.jpg",
        color: "gdg-red",
        stats: ["C++", "Python", "MERN stack"],
        quote: "Passionate about development and open source!",
        social: {
            github: "https://github.com/Dhruvam1111",
            linkedin: "https://www.linkedin.com/in/dhruvam-panchal-41b1b7321/",
        }
    },
    {
        name: "Aditya Vaish",
        role: "Extended Core Member",
        image: "/photos/aditya.jpeg",
        color: "gdg-yellow",
        stats: ["Python Next.js LLMOps"],
        quote: "I turn coffee into code, code into SaaS, and SaaS into money… eventually.",
        social: {
            github: "https://github.com/vaishcodescape",
            linkedin: "https://www.linkedin.com/in/aditya-vaish-370494243/",
        }
    },
    {
        name: "Nisarg Trivedi",
        role: "Extended Core Member",
        image: "/photos/nisarg.JPG",
        color: "gdg-blue",
        stats: ["Python3", "Pytorch", "Langchain", "SpeechAI"],
        quote: "Researcher with deep interests in Audio LLMs and  Agentic AI",
        social: {
            github: "https://GitHub.com/NT1906",
            linkedin: "https://www.linkedin.com/in/nktrivedi01?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
            twitter: "https://x.com/nktrivedi01?t=jniwr7iOMTFE9aGOUUJ0dQ&s=09"
        }
    },
    {
        name: "Zalak Thakkar",
        role: "Extended Core Member",
        image: "/photos/zalak.jpg",
        color: "gdg-yellow",
        stats: ["JavaScript", "Full Stack", "C++", "Python"],
        quote: "Problem-driven developer translating real-life scenarios into software solutions.",
        social: {
            github: "https://github.com/Zalak1208",
            linkedin: "https://www.linkedin.com/in/zalak-thakkar-0b0471330/"
        }
    },
    {
        name: "Jenil Mistry",
        role: "Member",
        image: "/photos/jenil.jpg",
        color: "gdg-blue",
        stats: ["Figma", "photoshop", "html", "css", "c++"],
        quote: "I create simple, clear UI/UX designs and bring ideas to life using Figma and photoshop.I also work with HTML and CSS.",
        social: {
            github: "https://GitHub https://share.google/Ml7Oy9A6LDZHhXvmQ",
            linkedin: "https://www.linkedin.com/in/jenil-mistry-2754b531a?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
        }
    },
    {
        name: "Shrey Patel",
        role: "Member",
        image: "/photos/shrey.jpeg",
        color: "gdg-red",
        stats: ["C++", "UI", "UX"],
        quote: "I build designs which resonates the vibes.",
        social: {
            github: "https://github.com/Shreyy-10",
            linkedin: "https://www.linkedin.com/in/shrey-patel-196162351?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app",
            twitter: "https://x.com/shrey_1011?s=21"
        }
    },
    {
        name: "Sumit Goyal",
        role: "Member",
        image: "/photos/sumit.jpg",
        color: "gdg-green",
        stats: ["Next JS Full-stack Web3"],
        quote: "I like building software that feels simple, even when the problem isn’t.",
        social: {
            github: "https://GitHub.com/sumit-0804",
            linkedin: "LinkedIn.com/sumit--goyal",
        }
    },
    {
        name: "Prakriti Pandey",
        role: "Member",
        image: "/photos/prakriti.jpeg",
        color: "gdg-yellow",
        stats: ["Python", "C++"],
        quote: "Second-year BTech student majoring in Information and Communication Technology, with a strong interest in artificial intelligence, machine learning, and computer vision.",
        social: {
            github: "https://github.com/PrakritiPandey24",
            linkedin: "https://www.linkedin.com/in/prakriti-pandey-591818365/",
        }
    },
    {
        name: "Aghera Jeel",
        role: "Member",
        image: "/photos/jeel.jpg",
        color: "gdg-green",
        stats: ["Python", "c++", "c"],
        quote: "I translate ideas into working code.",
        social: {
            github: "https://github.com/jeelaghera",
            linkedin: "https://www.linkedin.com/in/jeel-aghera-b7a670381?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
        }
    },
    {
        name: "Junaid Kureshi",
        role: "Member",
        image: "/photos/junaid.jpg",
        color: "gdg-yellow",
        stats: ["C#", "C++(CP)", "Unity"],
        quote: "Competitive Programmer & Open Source contributor. Interest in System Programming and GenAI",
        social: {
            github: "https://github.com/Junaid-Kureshi",
            linkedin: "https://www.linkedin.com/in/junaid-kureshi-3b0753312?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
            twitter: "https://x.com/JunaidKure69025"
        }
    },
    {
        name: "Sakina Kheraj",
        role: "Member",
        image: "/photos/sakina.jpg",
        color: "gdg-red",
        stats: ["Flutter C++ Dart Mobile App development"],
        quote: "Always exploring, always creating-driven by a spark for innovation and a love for bringing ideas to life.",
        social: {
            github: "https://github.com/SakinaKheraj",
            linkedin: "https://www.linkedin.com/in/sakinakheraj",
        }
    },
    {
        name: "Parth",
        role: "Member",
        image: "/photos/parth.jpeg",
        color: "gdg-green",
        stats: ["Android", "Java", "Flutter", "Kotlin"],
        quote: "Loves coding untill the code throws errors at my face",
        social: {
            github: "https://github.com/Diffusity",
            linkedin: "https://www.linkedin.com/in/parth-maharaja",
        }
    },
    {
        name: "Khushi Gandhi",
        role: "Member",
        image: "/photos/khushi.jpg",
        color: "gdg-blue",
        stats: ["Android App Development", "Web Development", "Java", "Python"],
        quote: "I transform my whimsical ideas into actual working programs from scratch",
        social: {
            github: "https://github.com/Khushi2007",
        }
    },
    {
        name: "Ashka Pathak",
        role: "Member",
        image: "/photos/ashka.jpeg",
        color: "gdg-yellow",
        stats: ["Python", "ML", "Databases"],
        quote: "I like data, good questions, and answers that make sense",
        social: {
            github: "https://github.com/AshkaPathak",
            linkedin: "https://www.linkedin.com/in/ashkapathak",
        }
    },
];

export default teamMembers;
