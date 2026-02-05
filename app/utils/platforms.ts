export type Platform = {
  label: string;
  icon: string;
  backgroundColor: string;
  placeholder: string;
  hostnameRegex: RegExp;
  color?: string;
  border?: string;
  iconColor?: string;
};

export const PlatformNames = ["github", "frontendmentor", "twitter", "linkedin", "youtube", "facebook", "twitch", "devto", "codewars", "codepen", "freecodecamp", "gitlab", "hashnode", "stackoverflow"] as const;

export type PlatformName = typeof PlatformNames[number];

export type Platforms = Record<PlatformName, Platform>;

export const platforms: Platforms = {
  github: {
    label: "GitHub",
    icon: "i-custom-icon-github",
    backgroundColor: "#1A1A1A",
    placeholder: "e.g. https://www.github.com/johnappleseed",
    hostnameRegex: /^(www\.)?github\.com$/,
  },
  frontendmentor: {
    label: "Frontend Mentor",
    icon: "i-custom-icon-frontend-mentor",
    backgroundColor: "#FFFFFF",
    color: "#333333",
    border: "1px solid #D9D9D9",
    iconColor: "#737373",
    placeholder: "e.g. https://www.frontendmentor.io/profile/johnappleseed",
    hostnameRegex: /^(www\.)?frontendmentor\.io$/,
  },
  twitter: {
    label: "Twitter",
    icon: "i-custom-icon-twitter",
    backgroundColor: "#43B7E9",
    placeholder: "e.g., https://x.com/johnappleseed",
    hostnameRegex: /^(www\.)?x\.com$/,
  },
  linkedin: {
    label: "LinkedIn",
    icon: "i-custom-icon-linkedin",
    backgroundColor: "#2D68FF",
    placeholder: "e.g. https://www.linkedin.com/in/johnappleseed",
    hostnameRegex: /^(www\.)?linkedin\.com$/,
  },
  youtube: {
    label: "YouTube",
    icon: "i-custom-icon-youtube",
    backgroundColor: "#EE3939",
    placeholder: "e.g. https://www.youtube.com/user/johnappleseed",
    hostnameRegex: /^(www\.)?youtube\.com$/,
  },
  facebook: {
    label: "Facebook",
    icon: "i-custom-icon-facebook",
    backgroundColor: "#2442AC",
    placeholder: "e.g. https://www.facebook.com/johnappleseed",
    hostnameRegex: /^(www\.)?facebook\.com$/,
  },
  twitch: {
    label: "Twitch",
    icon: "i-custom-icon-twitch",
    backgroundColor: "#EE3FC8",
    placeholder: "e.g. https://www.twitch.tv/johnappleseed",
    hostnameRegex: /^(www\.)?twitch\.tv$/,
  },
  devto: {
    label: "Dev.to",
    icon: "i-custom-icon-devto",
    backgroundColor: "#333333",
    placeholder: "e.g. https://dev.to/johnappleseed",
    hostnameRegex: /^(www\.)?dev\.to$/,
  },
  codewars: {
    label: "Codewars",
    icon: "i-custom-icon-codewars",
    backgroundColor: "#8A1A50",
    placeholder: "e.g. https://www.codewars.com/users/johnappleseed",
    hostnameRegex: /^(www\.)?codewars\.com$/,
  },
  codepen: {
    label: "Codepen",
    icon: "i-custom-icon-codepen",
    backgroundColor: "#FFDD40",
    color: "#333333",
    placeholder: "e.g. https://codepen.io/johnappleseed",
    hostnameRegex: /^(www\.)?codepen\.io$/,
  },
  freecodecamp: {
    label: "freeCodeCamp",
    icon: "i-custom-icon-freecodecamp",
    backgroundColor: "#302267",
    placeholder: "e.g. https://www.freecodecamp.org/johnappleseed",
    hostnameRegex: /^(www\.)?freecodecamp\.org$/,
  },
  gitlab: {
    label: "GitLab",
    icon: "i-custom-icon-gitlab",
    backgroundColor: "#EB4925",
    placeholder: "e.g. https://gitlab.com/johnappleseed",
    hostnameRegex: /^(www\.)?gitlab\.com$/,
  },
  hashnode: {
    label: "Hashnode",
    icon: "i-custom-icon-hashnode",
    backgroundColor: "#0330D1",
    placeholder: "e.g. https://johnappleseed.hashnode.dev",
    hostnameRegex: /^(www\.)?hashnode\.dev$/,
  },
  stackoverflow: {
    label: "Stack Overflow",
    icon: "i-custom-icon-stack-overflow",
    backgroundColor: "#EC7100",
    placeholder: "e.g. https://stackoverflow.com/users/{id}/{username}",
    hostnameRegex: /^(www\.)?stackoverflow\.com$/,
  },
};
