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
