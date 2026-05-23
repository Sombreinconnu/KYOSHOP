const CATEGORY_COLORS: { keywords: string[]; color: string }[] = [
  {
    keywords: ["parfum", "cosmétique", "cosmetique", "beauté", "beaute", "maquillage", "skincare"],
    color: "#7000FF",
  },
  {
    keywords: ["nourriture", "food", "restaurant", "cuisine", "traiteur", "épicerie", "epicerie", "boulangerie"],
    color: "#E85D04",
  },
  {
    keywords: ["vêtement", "vetement", "mode", "fashion", "chaussure", "accessoire", "streetwear"],
    color: "#0055FF",
  },
  {
    keywords: ["tech", "téléphone", "telephone", "électronique", "electronique", "gadget"],
    color: "#0EA5E9",
  },
  {
    keywords: ["maison", "déco", "deco", "meuble", "artisanat"],
    color: "#059669",
  },
];

export function slugify(name: string): string {
  return name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function pickColorAccent(description: string): string {
  const normalized = description.toLowerCase();

  for (const { keywords, color } of CATEGORY_COLORS) {
    if (keywords.some((keyword) => normalized.includes(keyword))) {
      return color;
    }
  }

  return "#0055FF";
}

export function withUniqueSlugSuffix(slug: string): string {
  const suffix = Math.random().toString(36).slice(2, 6);
  return `${slug}-${suffix}`;
}
