// data/skills.ts
// Capa curada de Habilidades. El stack honesto y completo vive en data/projects.ts (technologies[]).
// `match` = qué strings de technologies cuentan para este tile. `color` = rgb para el glow en hover/activo.

export type Skill = {
  name: string;    // label visible en el tile
  match: string[]; // strings de `technologies` que cuentan para este tile
  color: string;   // triplete rgb "r,g,b" para el glow
};

export const skills: Skill[] = [
  { name: 'Next.js',    match: ['Next.js'],          color: '250,250,250' },
  { name: 'TypeScript', match: ['TypeScript'],       color: '49,120,198'  },
  { name: 'React',      match: ['React', 'Next.js'], color: '97,218,251'  },
  { name: 'Python',     match: ['Python'],           color: '255,212,59'  },
  { name: 'FastAPI',    match: ['FastAPI'],          color: '0,150,136'   },
  { name: 'Tailwind',   match: ['Tailwind CSS'],     color: '56,189,248'  },
  { name: 'JWT',        match: ['JWT'],              color: '251,1,91'    },
];
