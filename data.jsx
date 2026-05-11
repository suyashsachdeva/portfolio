// All content data for the portfolio.
window.DATA = {
  name: "Suyash Sachdeva",
  shortName: "S. Sachdeva",
  title: "Deep Learning Researcher",
  email: "suyashsachdeva2403@gmail.com",
  phone: "+91 8889 557 788",
  location: "Hamirpur, HP · India",
  scholar: "https://scholar.google.com/",
  linkedin: "https://linkedin.com/in/",
  github:   "https://github.com/",

  tagline:
    "Deep Learning Researcher and Engineer with 5+ years of work in AI/ML — specializing in steganography, one-shot learning and neural-network-based signal modeling, with applied research in healthcare computer vision and 3D electronic integration.",

  about: [
    "I build neural networks for problems where the data is small, the signal is fragile, and the consequence of being wrong is real — medical imaging, secure communication, semiconductor packaging.",
    "My work sits between research and product: nine peer-reviewed papers in IEEE and Elsevier venues, a healthcare startup I co-founded, and computer-vision pipelines deployed in industry. I care most about translating careful research into systems that hold up outside the lab."
  ],

  stats: [
    { n: "9",   l: "Papers · Journals + Conf." },
    { n: "5+",  l: "Years in AI/ML R&D" },
    { n: "4",   l: "Research internships" },
    { n: "1",   l: "Healthcare startup" },
  ],

  experience: [
    {
      role: "Computer Vision Intern",
      co:   "Arcturus Business Solutions Limited",
      loc:  "Noida, UP",
      date: "Jul 2025 — Jan 2026",
      bullets: [
        "Built a statistical and deep-learning pipeline for five-shot satellite object detection.",
        "Developed object detection, landmarking, and few-shot face-recognition models."
      ],
      tags: ["Few-shot", "Detection"]
    },
    {
      role: "Co-Founder & AI Developer",
      co:   "Aushika Healthcare — Advanced Drug Dispenser",
      loc:  "Hamirpur, HP",
      date: "Nov 2023 — Sep 2025",
      bullets: [
        "Led product ideation, planning and design with cross-functional teammates.",
        "Designed and implemented the deep-learning and computer-vision pipeline shipped in the product."
      ],
      tags: ["Healthcare", "Product"]
    },
    {
      role: "Deep Learning Researcher Intern",
      co:   "BIT Sindri",
      loc:  "Remote",
      date: "May 2024 — Apr 2025",
      bullets: [
        "Designed a new architecture that improved accuracy on a non-uniform material dataset by 5%.",
        "Proposed a statistical-ML ensemble for adversarial-noise detection, reaching 94% accuracy."
      ],
      tags: ["Adversarial", "Research"]
    },
    {
      role: "AI / ML Intern",
      co:   "Oculosense Private Limited",
      loc:  "Remote",
      date: "May 2022 — Nov 2022",
      bullets: [
        "Developed a facial recognition model for accurate identification of known individuals.",
        "Built a voice-controlled DL pipeline to detect nearby known individuals and notify users."
      ],
      tags: ["Vision", "Voice"]
    },
  ],

  journals: [
    {
      title: "Three-Phased Multi-Scale Residual-Dense Modified-U-Net Architecture for Deep Image Steganography",
      venue: "Computers & Electrical Engineering, Elsevier",
      authors: "S. Sachdeva, et al.",
      status: "Published",
      kind: "published"
    },
    {
      title: "Neural Networks Based Multi-Variate Modeling for Coaxial Through-Glass Vias in 3D Integration",
      venue: "IEEE Transactions on Components, Packaging & Manufacturing Technology",
      authors: "S. Sachdeva, K. M. Kiran, R. Dhiman",
      status: "Published",
      kind: "published"
    },
    {
      title: "Adversarially Robust Classification of Metallurgical Microstructures Using a Novel Dense Residual Multi-Scale Network",
      venue: "Journal of Intelligent Manufacturing",
      authors: "S. Sachdeva, S. Mukherjee",
      status: "Under review",
      kind: "review"
    },
    {
      title: "LGE and PACT Neural Architectures for Transient Signal-Integrity Modeling in Multi-Variate 3D Packaging",
      venue: "IEEE Trans. on Computer-Aided Design of Integrated Circuits and Systems",
      authors: "S. Sachdeva, K. M. Kiran, R. Dhiman",
      status: "Under review",
      kind: "review"
    }
  ],

  conferences: [
    {
      title: "Bidirectional Multi-Process Recurrent Neural Networks for Signal-Integrity Assessment of N-Line Coaxial-Through Glass Vias",
      venue: "VDAT 2025",
      authors: "S. Sachdeva, K. M. Kiran, R. Dhiman",
      status: "Accepted",
      kind: "accepted"
    },
    {
      title: "Knowledge-Based Multi-Path Neural Networks for Modeling Through-Packaging Glass Vias",
      venue: "IEEE IITC, 2025",
      authors: "S. Sachdeva, K. M. Kiran, R. Dhiman",
      status: "Published",
      kind: "published"
    },
    {
      title: "Transient Analysis of Through-Package Coaxial Vias in Glass Interposers Based on the SBTD Method",
      venue: "IEEE EDAPS, 2024",
      authors: "K. M. Kiran, S. Sachdeva, R. Dhiman",
      status: "Published",
      kind: "published"
    },
    {
      title: "RNN-Based Signal Integrity Assessment for Coaxial-Through Glass Vias in 3D Integration",
      venue: "IEEE EDTM, 2024",
      authors: "S. Sachdeva, K. M. Kiran, R. Chandel, R. Dhiman",
      status: "Published",
      kind: "published"
    },
    {
      title: "Medical Drug Analysis Using Graph Neural Networks",
      venue: "IEEE SCEECS, 2024",
      authors: "S. Sachdeva, C. Kohli, K. Thakur, K. M. Kiran, R. Dhiman",
      status: "Published",
      kind: "published"
    }
  ],

  projects: [
    {
      title: "EyeCAD",
      mark:  "01 · Healthcare",
      date:  "Feb 2022 — May 2022",
      body:  "Custom DenseNet for diabetic-retinopathy classification from retinal fundus images. End-to-end training and grading pipeline.",
      icon: "eye"
    },
    {
      title: "Militia",
      mark:  "02 · Security",
      date:  "Dec 2021 — Feb 2022",
      body:  "Secure platform for anonymous civilian–military collaboration. GRU-based threat-prioritization to triage incoming tips.",
      icon: "shield"
    },
    {
      title: "LearningPocket",
      mark:  "03 · Education",
      date:  "Jun 2021 — Dec 2021",
      body:  "Statistical and OCR-based deep-learning system that interprets hand-drawn physics diagrams into structured problems.",
      icon: "book"
    },
  ],

  skills: [
    {
      group: "Deep Learning",
      items: ["Computer Vision","Sequential Analysis","Geometric Networks","Liquid State Machines","LLMs","Neural ODEs","Steganography","One-shot Learning"]
    },
    {
      group: "Libraries",
      items: ["PyTorch","TorchDyn","Torch Geometric","Lightning","TensorFlow","spaCy","NLTK","OpenCV","Hugging Face"]
    },
    {
      group: "Software & Tools",
      items: ["VS Code","Colab","Kaggle","GitHub","Jupyter","Roboflow","ChatGPT"]
    },
  ],

  achievements: [
    "Delivered an <b>expert lecture</b> on “Advances in e-Devices and IC Design with Pedagogical Insights” for the Faculty Development Program at <b>E&ICT Academy, IIT Roorkee</b>.",
    "Attended and presented at the international conference <b>IEEE EDTM 2024</b>.",
    "<b>Winner</b> — Anonymous Tips Website problem statement at <b>Hack the Build 2.0, IIT Jammu</b>.",
    "Qualified for the <b>AWS DeepRacer 2022 Scholarship</b> in autonomous driving and RL simulation.",
    "<b>Coordinator, SPEC</b> — directed a 65-person team for events and workshops with 300+ participants.",
    "<b>Coordinator, VIBHAV</b> — guided a 60-person team; won NIT Hamirpur tech-fest NIMBUS 2023.",
    "<b>Organizer, ELECTROTHON 5.0</b> — led a 50-person team for an MLH hackathon with 2 000+ participants.",
    "Integrated <b>B.Tech + M.Tech, ECE</b> at NIT Hamirpur (minor in Neural Networks).",
  ],

  education: {
    school: "National Institute of Technology, Hamirpur",
    deg: "Integrated B.Tech & M.Tech, Electronics & Communication Engineering",
    minor: "Minor: Neural Networks",
    thesis: "Master's Thesis — “Neural Networks-Based Electron Device Modeling for 3D Integration”",
    date: "Dec 2020 — Jul 2025",
    cgpa: "B.Tech 7.59 · M.Tech 7.87",
  }
};
