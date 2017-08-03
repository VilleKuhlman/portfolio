import { Skill } from '../skill/skill.model';
import { Channel } from '../channel/channel.model';

export class Item  {
  type: string;
  name: string;
  title: string;
  order: number;
  skills: Skill[];
  text: string;
  channels: Channel[];
  email: Object;
}