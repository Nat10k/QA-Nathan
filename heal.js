const { heal, ai } = require('codeceptjs');

heal.addRecipe('ai', {
  priority: 10,
  prepare: {
    html: ({ I }) => I.grabHTMLFrom({xpath:'//body'}),
  },
  suggest: true,
  steps: [
    'click',
    'fillField',
    'appendField',
    'selectOption',
    'attachFile',
    'checkOption',
    'uncheckOption',
    'doubleClick',
  ],
  fn: async (args) => {
    return ai.healFailedStep(args);
  },
});