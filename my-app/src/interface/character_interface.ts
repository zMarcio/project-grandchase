export interface Character {
    name_character: string;
    age_character: number;
    description_character: string;
    type_character_mp: string;
    image_character: string;
    quantity_class: number;
    name_class_character: {
      name_class: string;
      description_class: string;
      image_class: string;
    }[];
    habilities_mana: {
      name: string;
      description: string;
      quantity_mana: number;
      image_hability: string;
    };
    habilities_no_mana: {
      name: string;
      description_how_to_use: string;
      image_hability: string;
      commands: string[];
    }[];
    name_weapon_character: {
      name_weapon: string;
      class_character: string;
      description_weapon: string;
    }[];
  }
  