import moment from 'moment';

const FRONTEND_URL = "http://localhost:3000";
const BACKEND_URL = "http://localhost:3001";

// pad with a placeholder so we don't need to do MONTHS[idx + 1] for conversions
const MONTHS = ["X", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const WEEKDAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const CURR_YEAR = moment().year();
// add 1 since moment months are zero-indexed
const CURR_MONTH = moment().month() + 1;
const CURR_DAY = moment().date();

export { FRONTEND_URL, BACKEND_URL, MONTHS, WEEKDAYS, CURR_YEAR, CURR_MONTH, CURR_DAY };