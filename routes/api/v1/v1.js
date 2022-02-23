const express = require('express');
const router = express.Router();
const pacientesRoutes = require('./pacientes/pacientes');
const expedientesRoutes = require('./expedientes/expedientes');
const seguridadRoutes = require('./seguridad/seguridad');
const { verifyApiHeaderToken } = require('./headerVerifyMiddleware');
const {passport, jwtMiddleware} = require('./seguridad/jwtHelper');

router.use('/pacientes',verifyApiHeaderToken,jwtMiddleware, pacientesRoutes);
router.use('/expedientes',verifyApiHeaderToken, expedientesRoutes);
router.use(passport.initialize());
router.use('/seguridad', seguridadRoutes);


module.exports= router;