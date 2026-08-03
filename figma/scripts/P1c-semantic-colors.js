// P1.c — Semantic colour variables, each aliased to a primitive.
// Run via the Figma MCP `use_figma` tool against fileKey tID4bTybmXGn05s411DZks.
// Idempotent: re-running skips anything that already exists.
//
// Includes `color/border/control`, added after the contrast audit found that
// border/subtle (1.30:1) and border/default (1.65:1) both fail the WCAG 1.4.11
// 3:1 minimum for interactive component boundaries. See docs/02-sistema-de-diseno.md.

const colls = await figma.variables.getLocalVariableCollectionsAsync();
const prim = colls.find(c => c.name === 'Primitives');
const colorColl = colls.find(c => c.name === 'Color');
if (!prim || !colorColl) throw new Error('Collections missing — run P1.a first');
const lightMode = colorColl.modes[0].modeId;

const allVars = await figma.variables.getLocalVariablesAsync();
const primsByName = {};
for (const v of allVars) if (v.variableCollectionId === prim.id) primsByName[v.name] = v;
const already = new Set(allVars.filter(v => v.variableCollectionId === colorColl.id).map(v => v.name));

function P(n) {
  const v = primsByName[n];
  if (!v) throw new Error('Primitive not found: ' + n);
  return v;
}

const FILL   = ['FRAME_FILL', 'SHAPE_FILL'];
const TEXT   = ['TEXT_FILL'];
const STROKE = ['STROKE_COLOR'];
const ICON   = ['SHAPE_FILL', 'STROKE_COLOR'];

const semantics = [
  // Surfaces
  ['color/surface/page',         'neutral/50',  FILL],
  ['color/surface/card',         'neutral/0',   FILL],
  ['color/surface/sunken',       'neutral/100', FILL],
  ['color/surface/brand',        'blue/500',    FILL],
  ['color/surface/brand-soft',   'blue/50',     FILL],
  ['color/surface/accent',       'yellow/500',  FILL],
  ['color/surface/success-soft', 'green/50',    FILL],
  ['color/surface/warning-soft', 'amber/50',    FILL],
  ['color/surface/danger-soft',  'red/50',      FILL],
  // Text
  ['color/text/primary',   'neutral/900', TEXT],
  ['color/text/secondary', 'neutral/600', TEXT],
  ['color/text/muted',     'neutral/500', TEXT],
  ['color/text/on-brand',  'neutral/0',   TEXT],
  ['color/text/on-accent', 'neutral/900', TEXT],
  ['color/text/brand',     'blue/500',    TEXT],
  ['color/text/success',   'green/500',   TEXT],
  ['color/text/warning',   'amber/500',   TEXT],
  ['color/text/danger',    'red/500',     TEXT],
  // Borders — `control` is the only one legal on an interactive boundary
  ['color/border/subtle',  'neutral/200', STROKE],
  ['color/border/default', 'neutral/300', STROKE],
  ['color/border/control', 'neutral/500', STROKE],
  ['color/border/brand',   'blue/500',    STROKE],
  ['color/border/focus',   'blue/400',    STROKE],
  // Icons
  ['color/icon/default',  'neutral/600', ICON],
  ['color/icon/brand',    'blue/500',    ICON],
  ['color/icon/on-brand', 'neutral/0',   ICON],
];

const created = [];
for (const [name, target, scopes] of semantics) {
  if (already.has(name)) continue;
  const v = figma.variables.createVariable(name, colorColl, 'COLOR');
  v.setValueForMode(lightMode, figma.variables.createVariableAlias(P(target)));
  v.scopes = scopes;
  v.setVariableCodeSyntax('WEB', `var(--epik-${name.replace('color/', '').replace(/\//g, '-')})`);
  created.push(name);
}

return { createdCount: created.length, created };
