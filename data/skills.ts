// data/skills.ts
// Capa curada de Habilidades. El stack honesto y completo vive en data/projects.ts (technologies[]).
// `match` = qué strings de technologies cuentan para este tile. `color` = rgb para el glow en hover/activo.

import { techColors } from './techColors';

export type Skill = {
  name: string;    // label visible en el tile
  match: string[]; // strings de `technologies` que cuentan para este tile
  color: string;   // triplete rgb "r,g,b" para el glow
};

export const skills: Skill[] = [
  { name: 'Next.js',    match: ['Next.js'],          color: techColors['Next.js']    },
  { name: 'TypeScript', match: ['TypeScript'],       color: techColors['TypeScript'] },
  { name: 'React',      match: ['React', 'Next.js'], color: techColors['React']      },
  { name: 'Python',     match: ['Python'],           color: techColors['Python']     },
  { name: 'FastAPI',    match: ['FastAPI'],          color: techColors['FastAPI']    },
  { name: 'Tailwind',   match: ['Tailwind CSS'],     color: techColors['Tailwind']   },
  { name: 'JWT',        match: ['JWT'],              color: techColors['JWT']        },
];
