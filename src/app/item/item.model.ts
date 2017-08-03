import { Skill } from '../skill/skill.model';
import { Email } from '../email/email.model';

export class Item  {
  type: string;
  name: string;
  title: string;
  order: number;
  skills: Skill[];
  text: string;
  channels: Object[];
  email: Email;
}