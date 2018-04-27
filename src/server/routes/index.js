import supervisorRoute from './supervisor';
import displayRoute from './display';
import adminRoute from './admin';

export default {
    supervisor: [supervisorRoute],
    display: [displayRoute],
    admin: [adminRoute],
};
