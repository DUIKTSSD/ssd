import { useParams } from "react-router-dom";

const allowedSections = ["intro", "useful-link", "course-link"] as const;
type SectionType = typeof allowedSections[number];

export const useValidatedSection = (): SectionType => {
  const { section } = useParams();
  return allowedSections.includes(section as SectionType)
    ? (section as SectionType)
    : "intro";
};