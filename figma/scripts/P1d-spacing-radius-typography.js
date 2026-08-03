// P1.d — Spacing, Radius and Typography variables with targeted scopes.
// Run via `use_figma` against fileKey tID4bTybmXGn05s411DZks. Idempotent.

const colls = await figma.variables.getLocalVariableCollectionsAsync();
const spacing = colls.find(c => c.name === 'Spacing');
const radius  = colls.find(c => c.name === 'Radius');
const typo    = colls.find(c => c.name === 'Typography');
if (!spacing || !radius || !typo) throw new Error('Collections missing — run P1.a first');

const allVars = await figma.variables.getLocalVariablesAsync();
const nameSet = new Set(allVars.map(v => v.variableCollectionId + '::' + v.name));
const has = (coll, name) => nameSet.has(coll.id + '::' + name);

const created = [];

function make(coll, name, type, value, scopes, cssVar) {
  if (has(coll, name)) return;
  const v = figma.variables.createVariable(name, coll, type);
  v.setValueForMode(coll.modes[0].modeId, value);
  v.scopes = scopes;
  v.setVariableCodeSyntax('WEB', `var(${cssVar})`);
  created.push(name);
}

// Spacing — 4px grid
[['2xs', 4], ['xs', 8], ['sm', 12], ['md', 16], ['lg', 24], ['xl', 32], ['2xl', 48], ['3xl', 64]]
  .forEach(([k, v]) => make(spacing, `spacing/${k}`, 'FLOAT', v, ['GAP'], `--epik-spacing-${k}`));

// Radius
[['sm', 4], ['md', 8], ['lg', 12], ['xl', 16], ['full', 999]]
  .forEach(([k, v]) => make(radius, `radius/${k}`, 'FLOAT', v, ['CORNER_RADIUS'], `--epik-radius-${k}`));

// Typography — family and weights.
// Inter substitutes for the manual's Arial / Trebuchet MS, neither of which exists
// in Figma. Note the API spelling: "Semi Bold" with a space, not "SemiBold".
make(typo, 'family/sans', 'STRING', 'Inter', ['FONT_FAMILY'], '--epik-font-family-sans');
[['regular', 'Regular'], ['medium', 'Medium'], ['semibold', 'Semi Bold'], ['bold', 'Bold']]
  .forEach(([k, v]) => make(typo, `weight/${k}`, 'STRING', v, ['FONT_STYLE'], `--epik-font-weight-${k}`));

// Type scale
[['display', 32], ['h1', 24], ['h2', 20], ['h3', 16], ['body', 15], ['small', 13], ['caption', 12]]
  .forEach(([k, v]) => make(typo, `size/${k}`, 'FLOAT', v, ['FONT_SIZE'], `--epik-font-size-${k}`));

return { createdCount: created.length, created };
