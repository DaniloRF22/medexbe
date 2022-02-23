const express = require('express');
const router = express.Router();
const pacientesRoutes = require('./pacientes/pacientes');
const expedientesRoutes = require('./expedientes/expedientes');
const seguridadRoutes = require('./seguridad/seguridad');
const { verifyApiHeaderToken } = require('./headerVerifyMiddleware');

router.use('/pacientes',verifyApiHeaderToken, pacientesRoutes);
router.use('/expedientes',verifyApiHeaderToken, expedientesRoutes);
router.use('/seguridad',verifyApiHeaderToken, seguridadRoutes);

module.exports= router;