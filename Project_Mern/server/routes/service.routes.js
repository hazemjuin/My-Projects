const serviceController = require('../controllers/service.controller')
const authenticate = require('../config/jwt.config')

module.exports = app => {
  app.get('/api/services', authenticate, serviceController.findAll);
  app.get('/api/services/:id', authenticate, serviceController.findOne);
  app.post('/api/services', authenticate, serviceController.create);
  app.put('/api/services/:id', authenticate, serviceController.update);
  app.delete('/api/services/:id', authenticate, serviceController.delete);
  app.post('/api/services/:id/apply', authenticate, serviceController.applyToService);
  app.put('/api/services/:serviceId/select-applicant/:applicantId', authenticate, serviceController.selectApplicant);
  app.put('/api/services/:serviceId/set-completed', authenticate, serviceController.setServiceCompleted);
  app.get('/api/userServices', authenticate, serviceController.findMyServices)
}