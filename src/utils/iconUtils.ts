const iconNameMap: Record<string, string> = {
  React: "react",
  "React Native": "react",
  TypeScript: "typescript",
  JavaScript: "javascript",
  "Tailwind CSS": "tailwindcss",
  HTML5: "html5",
  HTML: "html5",
  CSS3: "css3",
  CSS: "css3",
  Vue: "vue",
  "Vue.js": "vue",
  Angular: "angular",
  Vite: "vite",
  Redux: "redux",
  "Next.js": "nextjs",
  Sass: "sass",
  "Styled Components": "styledcomponents",
  Bootstrap: "bootstrap",
  jQuery: "jquery",
  Webpack: "webpack",
  "Node.js": "nodejs",
  Node: "nodejs",
  Express: "express",
  JWT: "jwt",
  NestJS: "nestjs",
  Nest: "nestjs",
  Python: "python",
  Django: "django",
  Flask: "flask",
  Java: "java",
  Spring: "spring",
  Go: "go",
  Golang: "go",
  PHP: "php",
  Laravel: "laravel",
  Symfony: "symfony",
  ".NET": "dotnet",
  "ASP.NET": "dotnet",
  "C#": "csharp",
  Ruby: "ruby",
  "Ruby on Rails": "rubyonrails",
  Rust: "rust",
  Kotlin: "kotlin",
  Swift: "swift",
  MongoDB: "mongodb",
  MySQL: "mysql",
  PostgreSQL: "postgresql",
  Postgres: "postgresql",
  Redis: "redis",
  SQLite: "sqlite",
  Oracle: "oracle",
  "Microsoft SQL Server": "microsoftsqlserver",
  Firebase: "firebase",
  "Amazon DynamoDB": "amazondynamodb",
  AWS: "aws",
  "Amazon Web Services": "aws",
  GCP: "googlecloud",
  "Google Cloud": "googlecloud",
  Azure: "azure",
  Docker: "docker",
  Kubernetes: "kubernetes",
  K8s: "kubernetes",
  Jenkins: "jenkins",
  Terraform: "terraform",
  Ansible: "ansible",
  Git: "git",
  GitHub: "github",
  GitLab: "gitlab",
  Bitbucket: "bitbucket",
  Figma: "figma",
  Sketch: "sketch",
  "Adobe XD": "adobexd",
  Postman: "postman",
  "VS Code": "visualstudiocode",
  VSCode: "visualstudiocode",
  IntelliJ: "intellijidea",
  Jira: "jira",
  Notion: "notion",
  Slack: "slack",
  Vercel: "vercel",
  Netlify: "netlify",
  Heroku: "heroku",
  DigitalOcean: "digitalocean",
  GraphQL: "graphql",
  REST: "graphql",
  Apollo: "apollo",
  Stripe: "stripe",
  "Socket.io": "socketio",
  WebSocket: "websocket",
  RabbitMQ: "rabbitmq",
  Nginx: "nginx",
  Apache: "apache",
  Linux: "linux",
  Bash: "bash",
  "Docker Compose": "docker",
};

const DEFAULT_ICON = "mdi:cube";

const cleanSkillName = (name: string): string => {
  return name
    .replace(/[.#]/g, "")
    .replace(/\d+/g, "")
    .replace(/\s+/g, "")
    .replace(/-/g, "")
    .toLowerCase();
};

export const getSkillIconName = (skillName: string): string => {
  if (!skillName) return DEFAULT_ICON;

  const cleanedName = cleanSkillName(skillName);

  if (iconNameMap[skillName]) {
    return iconNameMap[skillName];
  }

  const found = Object.entries(iconNameMap).find(
    ([key]) => cleanSkillName(key) === cleanedName
  );
  if (found) {
    return found[1];
  }

  return cleanedName || DEFAULT_ICON;
};

export const getSkillIcon = (skillName: string): string => {
  const iconName = getSkillIconName(skillName);
  return `logos:${iconName}`;
};

export const getSkillIconWithFallback = (skillName: string): string => {
  const iconName = getSkillIconName(skillName);
  const prefixes = ["logos", "skillicons", "mdi"];

  for (const prefix of prefixes) {
    return `${prefix}:${iconName}`;
  }

  return DEFAULT_ICON;
};

export default getSkillIcon;
