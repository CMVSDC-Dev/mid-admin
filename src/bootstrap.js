import axios from 'axios';
import moment from 'moment-timezone';
import Swal from 'sweetalert2';

window.axios = axios;
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

moment.tz.setDefault('Asia/Manila');
window.moment = moment;

window.Swal = Swal;
