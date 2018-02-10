import { Pipe, PipeTransform } from '@angular/core';
import { Skill } from '../skill/skill.model';
import { SkillsearchUI } from '../action/skillsearch.ui.model';

/**
 * This function coerces a string into a string literal type.
 * Using tagged union types in TypeScript 2.0, this enables
 * powerful typechecking of our reducers.
 *
 * Since every action label passes through this function it
 * is a good place to ensure all of our action labels
 * are unique.
 */

//Filter out skills that are not visible in UIState
@Pipe({name: 'skillFilter'})
export class SkillFilterPipe implements PipeTransform {
  transform(skills: Skill[], currentUIState: SkillsearchUI){

    const filteredSkills: Skill[] = skills.filter( function( s ) {
       return currentUIState.filteredskills.includes( s.id );
    });

    return filteredSkills;
  };
}

@Pipe({name: 'currentDate'})
export class currentDatePipe implements PipeTransform {
  transform(value: string){

    return value === "currentdate" ? new Date().getMonth()+1+" / "+new Date().getFullYear() : value;

  };
}
