export type Shop = {
  id: string;
  owner_id: string;
  name: string;
  slug: string;
  color_accent: string;
  description: string | null;
  created_at: string;
};

export type ShopInsert = Pick<
  Shop,
  "owner_id" | "name" | "slug" | "color_accent" | "description"
>;
