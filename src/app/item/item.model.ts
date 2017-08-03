import { Skill } from '../skill/skill.model';

export class Item  {
  type: string;
  name: string;
  title: string;
  order: number;
  skills: Skill[];
  text: string;

  email: Object;
}