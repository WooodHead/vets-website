import { apiRequest as commonApiClient } from '../../common/helpers/api';
import environment from '../../common/helpers/environment';

export function apiRequest(resource, optionalSettings = {}, success, error) {
  const baseUrl = `${environment.API_URL}/v0/health_records`;
  const url = resource[0] === '/'
    ? [baseUrl, resource].join('')
    : resource;

  return commonApiClient(url, optionalSettings, success, error);
}
