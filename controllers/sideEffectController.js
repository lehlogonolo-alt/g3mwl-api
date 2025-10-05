const sideEffectService = require('../services/sideEffectService');

async function getSideEffects(req, res) {
  const effects = await sideEffectService.getAllSideEffects();
  res.json(effects);
}

async function createSideEffect(req, res) {
  await sideEffectService.createSideEffect(req.body.name);
  res.status(201).json({ message: 'Side effect added' });
}

module.exports = { getSideEffects, createSideEffect };
