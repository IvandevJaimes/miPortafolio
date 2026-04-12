import placeholderData from "../data/projects.json";

const getRandomImages = (images: string[], count: number): string[] => {
  const shuffled = [...images].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
};

export const getProjectImages = (images: string[]): string[] => {
  if (images.length === 0) {
    return getRandomImages(placeholderData.placeholderImages, 3);
  }
  return images;
};

export const isPlaceholderImage = (image: string): boolean => {
  return placeholderData.placeholderImages.includes(image);
};
