import moment from 'moment';

export default function formatDate(dateString) {
  return moment.utc(dateString).format('YYYY-MM-DD');
}
