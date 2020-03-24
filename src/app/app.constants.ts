import { environment } from '../environments/environment';

export const VERSION = environment.VERSION;
export const DEBUG_INFO_ENABLED: boolean = !!environment.DEBUG_INFO_ENABLED;
export const SERVER_API_URL = environment.SERVER_API_URL;
export const BUILD_TIMESTAMP = environment.BUILD_TIMESTAMP;

export const DEFAULT_ITEMS_PER_PAGE: number = 10;
