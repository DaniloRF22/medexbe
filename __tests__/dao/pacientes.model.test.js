const Pacientes = require('../../dao/pacientes/pacientes.model');
describe('Testing Pacientes Model',() => {
    let pacientesModel = null;
    beforeAll( ()=>{
        return pacientesModel = new Pacientes();
    });

    it('pacientesModel Esta Definido', () =>{
        return expect(pacientesModel).toBeDefined();
    } );

    it('getAll Devuelve un array', async ()=>{
        const arrPacientes = await pacientesModel.getAll();
        return expect(arrPacientes.lenght).toBeGreaterThanOrEqual(0);
    });
});