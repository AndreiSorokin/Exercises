import React from 'react'

interface CoursePartBase {
   name: string;
   exerciseCount: number;
 }
 
 interface CoursePartDescription extends CoursePartBase {
   description: string;
 }
 
 interface CoursePartBasic extends CoursePartDescription {
   kind: "basic";
 }
 
 interface CoursePartGroup extends CoursePartBase {
   groupProjectCount: number;
   kind: "group";
 }
 
 interface CoursePartBackground extends CoursePartDescription {
   backgroundMaterial: string;
   kind: "background";
 }
 
 type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground;
 
 interface PartProps {
   part: CoursePart;
 }

const Part = ({ part }: PartProps): JSX.Element => {
   const assertNever = (value: never): never => {
      throw new Error(
         `Unhandled discriminated union member: ${JSON.stringify(value)}`
      );
   };

   switch (part.kind) {
      case "basic":
        return (
            <p>
               {part.name} {part.exerciseCount}<br/>{part.description}
            </p>
        );
      case "group":
        return (
          <p>
            {part.name} {part.exerciseCount}<br/>project exercises {part.groupProjectCount}
          </p>
        );
      case "background":
        return (
          <p>
            {part.name} {part.exerciseCount}<br/>{part.description}<br/> submit to {part.backgroundMaterial}
          </p>
        );
      default:
        return assertNever(part);
    }
}

export default Part
