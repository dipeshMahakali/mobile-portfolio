import { CONFIG } from '@/constants/config';

const BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'https://portfolio-m897.onrender.com/api';

export interface PersonalInfo {
  name: string;
  firstName?: string;
  lastName?: string;
  shortName?: string;
  avatarUrl?: string;
  title: string;
  description: string;
  email: string;
  phone: string;
  location: string;
  github: string;
  linkedin: string;
  twitter?: string;
}

export interface ProjectMetric {
  label: string;
  value: string;
}

export interface Project {
  title: string;
  description: string;
  technologies: string[];
  github: string;
  demo: string;
  featured: boolean;
  metrics: ProjectMetric[];
  _id: string;
}

export interface WorkExperience {
  title: string;
  company: string;
  period: string;
  description: string;
  technologies: string[];
  _id: string;
  theme?: 'cyan' | 'purple' | 'blue' | 'emerald' | 'rose' | 'slate';
}

export interface Skill {
  name: string;
  level: number;
}

export interface MetricItem {
  label: string;
  value: string;
  iconName?: string;
  suffix?: string;
  color?: string;
}

export interface Testimonial {
  name: string;
  position: string;
  company: string;
  content: string;
  rating: number;
  _id: string;
}

export interface Certification {
  title: string;
  issuer: string;
  date: string;
  description?: string;
}

export interface Approach {
  id: string;
  title: string;
  description: string;
}

// Helpers to enhance responses with fallback computed values
const getFirstName = (name: string) => name.split(' ')[0] || '';
const getLastName = (name: string) => name.split(' ').slice(1).join(' ') || '';
const getShortName = (name: string) => {
  const parts = name.split(' ');
  if (parts.length >= 2) {
    return `${parts[0][0]}. ${parts.slice(1).join(' ')}`;
  }
  return name;
};
const getAvatarUrl = (githubUrl?: string) => {
  if (!githubUrl) return CONFIG.avatarUrl;
  const username = githubUrl.trim().replace(/\/$/, '').split('/').pop();
  return username ? `https://github.com/${username}.png` : CONFIG.avatarUrl;
};

export async function fetchPersonalInfo(): Promise<PersonalInfo> {
  try {
    const res = await fetch(`${BASE_URL}/personal-info`);
    if (!res.ok) throw new Error();
    const data = await res.json();
    return {
      ...data,
      firstName: getFirstName(data.name),
      lastName: getLastName(data.name),
      shortName: getShortName(data.name),
      avatarUrl: getAvatarUrl(data.github),
    };
  } catch (error) {
    // Return config fallback
    return {
      ...CONFIG.personalInfo,
      firstName: getFirstName(CONFIG.personalInfo.name),
      lastName: getLastName(CONFIG.personalInfo.name),
      shortName: CONFIG.personalInfo.shortName,
      avatarUrl: getAvatarUrl(CONFIG.personalInfo.github),
    };
  }
}

export async function fetchProjects(): Promise<Project[]> {
  try {
    const res = await fetch(`${BASE_URL}/projects`);
    if (!res.ok) throw new Error();
    return await res.json();
  } catch (error) {
    // Return dummy project mappings matching the backend structure
    return [
      {
        _id: "1",
        title: "JIA Virtual Assistant",
        description: "An intelligent virtual assistant built with Python, featuring voice recognition, natural language processing, and task automation capabilities.",
        technologies: ["Python", "NLP", "Speech Recog.", "AI", "Automation", "Scraping"],
        github: CONFIG.personalInfo.github + "/JIA-VIRTUAL-ASSISTANT",
        demo: CONFIG.personalInfo.github + "/JIA-VIRTUAL-ASSISTANT",
        featured: true,
        metrics: [
          { label: "Accuracy", value: "92%" },
          { label: "Response", value: "<2s" }
        ]
      },
      {
        _id: "2",
        title: "Python Mini Projects",
        description: "A collection of innovative Python projects demonstrating various programming concepts, algorithms, and practical applications.",
        technologies: ["Python", "Automation", "Web Scraping", "APIs", "CLI Apps"],
        github: CONFIG.personalInfo.github + "/pythonMiniProjects",
        demo: CONFIG.personalInfo.github + "/pythonMiniProjects",
        featured: true,
        metrics: [
          { label: "ProjectsCount", value: "15+" },
          { label: "Stars", value: "⭐" }
        ]
      },
      {
        _id: "3",
        title: "Data Science Portfolio",
        description: "Comprehensive data science projects covering machine learning, data analysis, visualization, and predictive modeling.",
        technologies: ["Python", "Pandas", "NumPy", "Scikit-Learn", "Visuals"],
        github: CONFIG.personalInfo.github + "/Data-Science",
        demo: CONFIG.personalInfo.github + "/Data-Science",
        featured: true,
        metrics: [
          { label: "Model Acc.", value: "94%" },
          { label: "Datasets", value: "10+" }
        ]
      }
    ];
  }
}

export async function fetchExperiences(): Promise<WorkExperience[]> {
  try {
    const res = await fetch(`${BASE_URL}/work-experience`);
    if (!res.ok) throw new Error();
    const data = await res.json();
    
    // Distribute card themes cyclically
    const themes: ('cyan' | 'purple' | 'blue' | 'emerald' | 'rose' | 'slate')[] = [
      'blue', 'cyan', 'purple', 'emerald', 'rose', 'slate'
    ];
    return data.map((exp: any, index: number) => ({
      ...exp,
      theme: themes[index % themes.length],
    }));
  } catch (error) {
    return [
      {
        _id: "1",
        title: "Jr. Software Developer",
        company: "Shree Mahakali Software Pvt Ltd.",
        period: "Jan 2026 - Present",
        description: "Working as a Jr. Software Developer at Shree Mahakali Software Pvt Ltd., contributing in the development of web applications and systems.",
        technologies: ["HTML", "CSS", "JS", "Python", "Django", "Databases", "Laravel", "jQuery", "GitLab"],
        theme: "blue",
      },
      {
        _id: "2",
        title: "Web Development Training",
        company: "Shree Mahakali Software Pvt Ltd.",
        period: "Jun 2025 - Dec 2025",
        description: "Completed comprehensive web development training covering frontend and backend technologies, database management, and modern development practices.",
        technologies: ["HTML", "CSS", "JS", "Python", "Django", "Databases", "Laravel", "jQuery", "GitLab"],
        theme: "emerald",
      },
      {
        _id: "3",
        title: "Data Analysis Internship",
        company: "Deloitte Virtual Internship",
        period: "May 2025",
        description: "Analyzed and visualized manufacturing telemetry data using Python, Excel, and Tableau during the Deloitte Data Analytics Virtual Internship to drive operational efficiency and inform business strategy.",
        technologies: ["Data Prep", "Excel", "Python", "Pandas", "NumPy", "Visuals", "Telemetry"],
        theme: "rose",
      }
    ];
  }
}

export async function fetchSkills(): Promise<Skill[]> {
  try {
    const res = await fetch(`${BASE_URL}/skills`);
    if (!res.ok) throw new Error();
    return await res.json();
  } catch (error) {
    return [
      { name: "Python", level: 90 },
      { name: "Machine Learning", level: 85 },
      { name: "IoT Development", level: 80 },
      { name: "Data Science", level: 85 }
    ];
  }
}

export async function fetchMetrics(): Promise<MetricItem[]> {
  try {
    const res = await fetch(`${BASE_URL}/metrics`);
    if (!res.ok) throw new Error();
    const data = await res.json();
    return data.metrics || [];
  } catch (error) {
    return [
      { label: "Python Projects", value: "15" },
      { label: "Model Accuracy", value: "94", suffix: "%" },
      { label: "IoT Integrations", value: "8" }
    ];
  }
}

export async function fetchApproach(): Promise<Approach[]> {
  try {
    const res = await fetch(`${BASE_URL}/approach`);
    if (!res.ok) throw new Error();
    return await res.json();
  } catch (error) {
    return [
      {
        id: "1",
        title: "Problem Analysis",
        description: "Deep dive into understanding requirements, constraints, and operational telemetry before coding.",
      },
      {
        id: "2",
        title: "Research & Plan",
        description: "Thorough technology evaluations and database planning to design optimal, low-memory systems.",
      },
      {
        id: "3",
        title: "Iterative Dev",
        description: "Building incrementally with test-driven profiles and seamless modular integrations.",
      },
      {
        id: "4",
        title: "Quality Assurance",
        description: "Rigorous diagnostic testing, code refactors, and performance analysis for high-FPS operations.",
      }
    ];
  }
}

export async function fetchCertifications(): Promise<Certification[]> {
  try {
    const res = await fetch(`${BASE_URL}/certifications`);
    if (!res.ok) throw new Error();
    const data = await res.json();
    return data.certifications || [];
  } catch (error) {
    return [
      { title: "Deloitte Data Analytics", issuer: "Deloitte Virtual", date: "2025" },
      { title: "Full Stack Development", issuer: "Shree Mahakali Software", date: "2025" },
      { title: "Python Automation", issuer: "Tech Solutions", date: "2026" },
    ];
  }
}

export async function fetchTestimonials(): Promise<Testimonial[]> {
  try {
    const res = await fetch(`${BASE_URL}/testimonials`);
    if (!res.ok) throw new Error();
    return await res.json();
  } catch (error) {
    return [
      {
        _id: "1",
        name: "Rahul Sharma",
        position: "Senior Python Developer",
        company: "Tech Solutions Inc.",
        content: "Dipesh demonstrates exceptional problem-solving skills and a deep understanding of Python development. His AI projects showcase creativity and technical excellence.",
        rating: 5
      },
      {
        _id: "2",
        name: "Priya Patel",
        position: "IoT Project Lead",
        company: "Innovation Labs",
        content: "Working with Dipesh on IoT projects has been fantastic. His ability to integrate hardware and software solutions is impressive, and his dedication to learning is inspiring.",
        rating: 5
      }
    ];
  }
}

export async function submitContactMessage(
  name: string,
  email: string,
  message: string,
  projectType?: string
): Promise<{ success: boolean; message: string }> {
  try {
    const res = await fetch(`${BASE_URL}/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, message, projectType }),
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || (data.detail && typeof data.detail === 'string' ? data.detail : '') || 'Failed to send message');
    }
    return { success: true, message: data.message || 'Your message has been sent successfully!' };
  } catch (error: any) {
    return { success: false, message: error.message || 'Failed to connect to the server. Please try again.' };
  }
}

export interface GithubActivity {
  repo: string;
  type: string;
  message: string;
  date: string;
}

export async function fetchGithubActivity(username: string): Promise<GithubActivity[]> {
  try {
    const res = await fetch(`https://api.github.com/users/${username}/events`);
    if (!res.ok) throw new Error();
    const data = await res.json();
    
    // Parse GitHub events
    const activities: GithubActivity[] = [];
    for (const event of data) {
      if (activities.length >= 4) break;
      const type = event.type;
      const repo = event.repo.name.replace(`${username}/`, '');
      let message = '';
      if (type === 'PushEvent') {
        const commitMsg = event.payload.commits?.[0]?.message || 'Pushed updates';
        message = `Pushed: "${commitMsg}"`;
      } else if (type === 'CreateEvent') {
        message = `Created repository / branch`;
      } else if (type === 'WatchEvent') {
        message = `Starred repository`;
      } else if (type === 'PullRequestEvent') {
        const action = event.payload.action || 'updated';
        message = `PR ${action}`;
      } else {
        message = `Updated repository`;
      }
      activities.push({
        repo,
        type,
        message,
        date: new Date(event.created_at).toLocaleDateString(undefined, {
          month: 'short',
          day: 'numeric',
        }),
      });
    }
    return activities;
  } catch (error) {
    // Fallback mock activities tailored for Robotics, Game dev, and AI
    return [
      { repo: "autonomous-quadruped-ros2", type: "PushEvent", message: "Push: Integrate telemetry feedback loop", date: "Jul 9" },
      { repo: "vulkan-shader-engine", type: "CreateEvent", message: "Created: Add real-time Ray Tracing shader support", date: "Jul 7" },
      { repo: "neural-vision-ocr", type: "PushEvent", message: "Push: Train ResNet model on custom datasets", date: "Jul 5" },
      { repo: "starkdipesh", type: "WatchEvent", message: "Starred: awesome-robotics-libraries", date: "Jul 2" }
    ];
  }
}
