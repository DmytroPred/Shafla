export interface IHero {
  id: number;
  disabled?: boolean;
  selected?: boolean;
  image: string;
  name: string;
  localized_name: string;
  primary_attr: string;
  attack_type: string;
  roles: string[];
  legs: number;
}
