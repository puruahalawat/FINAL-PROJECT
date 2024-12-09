import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const HealthFAQ = [
  {
    question: "What is preventive healthcare?",
    answer:
      "Preventive healthcare refers to measures taken to prevent diseases or injuries rather than treating them after they occur. This includes regular check-ups, vaccinations, screenings, healthy lifestyle choices, and risk assessments to catch health issues early.",
  },
  {
    question: "What is the difference between a cold and the flu?",
    answer:
      "Both the cold and the flu are respiratory illnesses, but they are caused by different viruses. Cold symptoms are generally milder and may include a stuffy nose, sore throat, and cough. The flu tends to have more severe symptoms such as high fever, body aches, fatigue, and chills.",
  },
  {
    question: "What is a balanced diet?",
    answer:
      "A balanced diet includes a variety of foods from all food groups: fruits, vegetables, proteins, carbohydrates, and fats. It ensures that your body gets all the necessary nutrients it needs to function optimally, such as vitamins, minerals, and fibers.",
  },
  {
    question: "What are the benefits of regular exercise?",
    answer:
      "Regular exercise helps improve overall health by strengthening the heart, improving lung function, boosting mood, controlling weight, and lowering the risk of chronic diseases like diabetes, heart disease, and certain cancers.",
  },
  {
    question: "What is mental health?",
    answer:
      "Mental health refers to a person's emotional, psychological, and social well-being. It affects how we think, feel, and act. Mental health also determines how we handle stress, relate to others, and make choices. Maintaining mental health is as important as maintaining physical health.",
  },
  {
    question: "What is the importance of sleep?",
    answer:
      "Sleep is crucial for physical and mental health. It helps the body recover, repair tissues, and strengthen the immune system. It also supports brain function, memory, and mood regulation. Adults typically need 7-9 hours of sleep each night.",
  },
];
