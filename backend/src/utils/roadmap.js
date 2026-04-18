/*
'Software Engineer', 'Data Scientist', 'Machine Learning Engineer', 'Frontend Developer', 'Designer', 'Full-Stack Developer', 'Product Manager', 'Backend Developer', 'Cybersecurity Engineer', 'DevOps Engineer', 'Other'
*/

const userModel = require("../models/user.model");
const { generateCareerRoadmap } = require("../services/ai3.services");

const frontendRoadmap = {
  "title": "Frontend Developer Roadmap",
  "stages": [
    {
      "stage": "Foundations",
      "skills": ["HTML", "CSS", "JavaScript", "Version Control/Git"]
    },
    {
      "stage": "Styling & UI",
      "skills": ["CSS Frameworks", "Responsive Design", "Cross-Browser Compatibility", "Web Accessibility"]
    },
    {
      "stage": "Frontend Engineering",
      "skills": ["JavaScript Frameworks", "State Management", "Web Components", "PWAs"]
    },
    {
      "stage": "Tooling & Testing",
      "skills": ["Build Tools", "Testing", "Browser Dev Tools", "Performance Optimization"]
    },
    {
      "stage": "Deployment & Growth",
      "skills": ["Deployment", "Continuous Learning"]
    }
  ]
};

const backendRoadmap = {
  "title": "Backend Developer Roadmap",
  "stages": [
    {
      "stage": "Foundations",
      "skills": ["Programming Language (Python, Java, Node.js)", "Version Control/Git"]
    },
    {
      "stage": "Databases",
      "skills": ["Databases (SQL, NoSQL)"]
    },
    {
      "stage": "Web Development",
      "skills": ["Web Frameworks (Django, Flask, Express.js)", "API Design (RESTful APIs, GraphQL)"]
    },
    {
      "stage": "Security & Performance",
      "skills": ["Authentication and Authorization (JWT, OAuth)", "Testing (Unit Testing, Integration Testing)", "Performance Optimization", "Security Best Practices"]
    },
    {
      "stage": "Deployment & Scaling",
      "skills": ["Containerization (Docker)", "Cloud Services (AWS, Azure, Google Cloud)", "Microservices Architecture", "Message Brokers (RabbitMQ, Kafka)", "Continuous Integration/Continuous Deployment (CI/CD)"]
    }
  ]
};

const dataScienceRoadmap = {
  "title": "Data Scientist Roadmap",
  "stages": [
    {
      "stage": "Foundations",
      "skills": ["Programming Language (Python, R)", "Mathematics (Linear Algebra, Calculus, Probability, Statistics)"]
    },
    {
      "stage": "Data Skills",
      "skills": ["Data Manipulation and Analysis (Pandas, NumPy)", "Data Visualization (Matplotlib, Seaborn, Plotly)"]
    },
    {
      "stage": "Machine Learning",
      "skills": ["Machine Learning (Scikit-learn, TensorFlow, PyTorch)", "Deep Learning (Keras, TensorFlow, PyTorch)"]
    },
    {
      "stage": "Specialized Areas",
      "skills": ["Natural Language Processing (NLTK, SpaCy)", "Big Data Technologies (Hadoop, Spark)"]
    },
    {
      "stage": "Deployment & Production",
      "skills": ["Model Deployment (Flask, FastAPI, Docker)", "Version Control/Git", "Cloud Services (AWS, Azure, Google Cloud)"]
    }
  ]
};

const designerRoadmap = {
  "title": "Designer Roadmap",
  "stages": [
    {
      "stage": "Foundations",
      "skills": ["Design Principles (Color Theory, Typography, Layout)", "Design Tools (Adobe Creative Suite, Figma, Sketch)"]
    },
    {
      "stage": "User Experience",
      "skills": ["User Experience (UX) Design"]
    },
    {
      "stage": "User Interface",
      "skills": ["User Interface (UI) Design", "Prototyping and Wireframing"]
    },
    {
      "stage": "Design Systems",
      "skills": ["Design Systems", "Responsive Design", "Accessibility in Design"]
    },
    {
      "stage": "Branding & Portfolio",
      "skills": ["Branding and Identity Design", "Motion Graphics and Animation", "Portfolio Development"]
    }
  ]
};

const productManagerRoadmap = {
  "title": "Product Manager Roadmap",
  "stages": [
    {
      "stage": "Foundations",
      "skills": ["Product Management Fundamentals", "Market Research and Analysis"]
    },
    {
      "stage": "User Experience",
      "skills": ["User Experience (UX) Design"]
    },
    {
      "stage": "Agile & Project Management",
      "skills": ["Agile Methodologies (Scrum, Kanban)", "Project Management Tools (Jira, Trello)"]
    },
    {
      "stage": "Data & Strategy",
      "skills": ["Data Analysis and Metrics", "Product Roadmapping and Strategy"]
    },
    {
      "stage": "Stakeholder & Communication",
      "skills": ["Stakeholder Management", "Communication and Leadership Skills"]
    }
  ]
};

const softwareEngineerRoadmap = {
  "title": "Software Engineer Roadmap",
  "stages": [
    {
      "stage": "Foundations",
      "skills": ["Programming Languages (Python, Java, C++)", "Data Structures and Algorithms"]
    },
    {
      "stage": "Development",
      "skills": ["Version Control/Git", "Software Design Patterns", "System Design"]
    },
    {
      "stage": "Testing & Deployment",
      "skills": ["Testing and Debugging", "Development(Web/Mobile)", "Cloud Computing (AWS, Azure, Google Cloud)", "Containerization (Docker)", "Microservices Architecture"]
    },
    {
      "stage": "Advanced Topics",
      "skills": ["Continuous Integration/Continuous Deployment (CI/CD)", "Security Best Practices"]
    }
  ]
};

const cybersecurityEngineerRoadmap = {
  "title": "Cybersecurity Engineer Roadmap",
  "stages": [
    {
      "stage": "Foundations",
      "skills": ["Networking Fundamentals", "Operating Systems (Linux, Windows)", "Programming Languages (Python, C, C++)"]
    },
    {
      "stage": "Security Fundamentals",
      "skills": ["Cryptography", "Vulnerability Assessment and Penetration Testing", "Security Information and Event Management (SIEM)"]
    },
    {
      "stage": "Incident Response",
      "skills": ["Incident Response and Forensics"]
    },
    {
      "stage": "Cloud Security",
      "skills": ["Cloud Security (AWS, Azure, Google Cloud)"]
    },
    {
      "stage": "Access Management",
      "skills": ["Identity and Access Management (IAM)", "Security Frameworks and Compliance (NIST, ISO 27001)"]
    },
    {
      "stage": "Secure Development",
      "skills": ["Secure Software Development Lifecycle (SDLC)", "Ethical Hacking and Bug Bounty Programs"]
    }
  ]
};

const devOpsEngineerRoadmap = {
  "title": "DevOps Engineer Roadmap",
  "stages": [
    {
      "stage": "Foundations",
      "skills": ["Programming/Scripting Languages (Python, Bash)", "Version Control/Git"]
    },
    {
      "stage": "CI/CD and Automation",
      "skills": ["Continuous Integration/Continuous Deployment (CI/CD)", "Containerization (Docker, Kubernetes)"]
    },
    {
      "stage": "Cloud and Infrastructure",
      "skills": ["Cloud Services (AWS, Azure, Google Cloud)", "Infrastructure as Code (Terraform, Ansible)"]
    },
    {
      "stage": "Monitoring and Logging",
      "skills": ["Monitoring and Logging (Prometheus, Grafana, ELK Stack)"]
    },
    {
      "stage": "Configuration and Security",
      "skills": ["Configuration Management (Puppet, Chef)", "Security Best Practices in DevOps"]
    },
    {
      "stage": "Collaboration and Communication",
      "skills": ["Collaboration and Communication Skills"]
    }
  ]
};

const fullStackEngineerRoadmap = {
  "title": "Full-Stack Developer Roadmap",
  "stages": [
    {
      "stage": "Foundations",
      "skills": ["Programming Languages (JavaScript, Python, Java)", "Version Control/Git"]
    },
    {
      "stage": "Frontend Development",
      "skills": ["HTML, CSS, JavaScript", "React, Vue.js, Angular"]
    },
    {
      "stage": "Backend Development",
      "skills": ["Node.js, Express.js", "Python, Django, Flask", "Database Design and Management"]
    },
    {
      "stage": "Testing and Deployment",
      "skills": ["Testing Frameworks", "CI/CD Pipelines", "Cloud Deployment"]
    },
    {
      "stage": "Advanced Topics",
      "skills": ["Microservices Architecture", "GraphQL", "WebSockets"]
    },
    {
        "stage": "Soft Skills",
        "skills": ["Communication and Collaboration", "Problem-Solving and Critical Thinking"]
    },
    { 
        "stage": "Data Structures and Algorithms",
        "skills": ["Basic Data Structures (Arrays, Linked Lists, Stacks, Queues)", "Advanced Data Structures (Trees, Graphs, Hash Tables)", "Algorithms (Sorting, Searching, Dynamic Programming)"]
    },
    {
        "stage": "System Design",
        "skills": ["System Design Principles", "Scalability and Performance", "Designing for Reliability and Availability", "LLD and HLD"]
    }
  ]
};

const machineLearningEngineerRoadmap = {
    "title": "Machine Learning Engineer Roadmap",
    "stages": [
        {
            "stage": "Foundations",
            "skills": ["Programming Languages (Python, R)", "Mathematics (Linear Algebra, Calculus, Probability, Statistics)"]
        },
        {
            "stage": "Data Skills",
            "skills": ["Data Manipulation and Analysis (Pandas, NumPy)", "Data Visualization (Matplotlib, Seaborn, Plotly)"]
        },
        {
            "stage": "Machine Learning",
            "skills": ["Machine Learning (Scikit-learn, TensorFlow, PyTorch)", "Deep Learning (Keras, TensorFlow, PyTorch)"]
        },
        {
            "stage": "Specialized Areas",
            "skills": ["Natural Language Processing (NLTK, SpaCy)", "Big Data Technologies (Hadoop, Spark)"]
        },
        {
            "stage": "Deployment & Production",
            "skills": ["Model Deployment (Flask, FastAPI, Docker)", "Version Control/Git", "Cloud Services (AWS, Azure, Google Cloud)"]
        },
        {
            "stage": "Advanced Topics",
            "skills": ["Reinforcement Learning", "Generative Models", "Ethics in AI"]
        },
        {    "stage": "Soft Skills",
             "skills": ["Communication and Collaboration", "Problem-Solving and Critical Thinking"]
        },
        {
            "stage": "Experimental and Research Skills",
            "skills": ["Research Methodology", "Experimentation and A/B Testing", "Staying Updated with Latest Research"]
        }
    ]
}

const setUserRoadmap = async (userId, targetRole) => {
    const user = await userModel.findById(userId);
    if(!user){
        return resizeBy.status(404).json({
            message: "User not found"
        })
    }

    switch(targetRole){
        case "FrontendDeveloper":
            await userModel.findByIdAndUpdate(userId, { targetRole: "Frontend Developer", careerRoadmap: frontendRoadmap }, { new: true });
            break;

        case "BackendDeveloper":
            await userModel.findByIdAndUpdate(userId, { targetRole: "Backend Developer", careerRoadmap: backendRoadmap }, { returnDocument: "after" });
            break;

        case "DataScientist":
            await userModel.findByIdAndUpdate(userId, { targetRole: "Data Scientist", careerRoadmap: dataScienceRoadmap }, { returnDocument: "after" })   ;
            break;
        
        case "Designer":
            await userModel.findByIdAndUpdate(userId, { targetRole: "Designer", careerRoadmap: designerRoadmap }, { returnDocument: "after" });
            break;

        case "ProductManager":
            await userModel.findByIdAndUpdate(userId, { targetRole: "Product Manager", careerRoadmap: productManagerRoadmap }, { returnDocument: "after" });
            break;

        case "SoftwareEngineer":
            await userModel.findByIdAndUpdate(userId, { targetRole: "Software Engineer", careerRoadmap: softwareEngineerRoadmap }, { returnDocument: "after" });
            break;

        case "MachineLearningEngineer":
            await userModel.findByIdAndUpdate(userId, { targetRole: "Machine Learning Engineer", careerRoadmap: machineLearningEngineerRoadmap }, { returnDocument: "after" });
            break;

        case "FullStackDeveloper":
            await userModel.findByIdAndUpdate(userId, { targetRole: "Full-Stack Developer", careerRoadmap: fullStackEngineerRoadmap }, { returnDocument: "after" });
            break;

        case "CybersecurityEngineer":
            await userModel.findByIdAndUpdate(userId, { targetRole: "Cybersecurity Engineer", careerRoadmap: cybersecurityEngineerRoadmap }, { returnDocument: "after" });
            break;

        case "DevOpsEngineer":
            await userModel.findByIdAndUpdate(userId, { targetRole: "DevOps Engineer", careerRoadmap: devOpsEngineerRoadmap }, { returnDocument: "after" });
            break;

        default:
            const roadmap = await generateCareerRoadmap(targetRole);
            await userModel.findByIdAndUpdate(userId, { targetRole: targetRole, careerRoadmap:{ title: `${targetRole} Roadmap`, stages: roadmap.stages } }, { returnDocument: "after" });
            break;
    }
}

module.exports = { setUserRoadmap };