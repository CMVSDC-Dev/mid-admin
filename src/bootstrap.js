import axios from '@/plugins/axios';  // Import your Axios plugin
import moment from '@/plugins/moment';  // Import your Moment plugin
import Swal from 'sweetalert2';

window.axios = axios;
// window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

window.moment = moment;

window.Swal = Swal;
