const Job = require('./Job');
const Application = require('./Application');
const SpontaneousApplication = require('./SpontaneousApplication');

// Define associations
Job.hasMany(Application, {
  foreignKey: 'jobId',
  as: 'applications',
  onDelete: 'CASCADE',
});

Application.belongsTo(Job, {
  foreignKey: 'jobId',
  as: 'job',
});

module.exports = {
  Job,
  Application,
  SpontaneousApplication,
};
