/**
 * E2E 테스트용 커스텀 fixture 통합 export
 *
 * 테스트 파일에서 '@playwright/test' 대신 이 파일을 import하면
 * 인증 fixture(authenticatedPage)를 포함한 확장된 test 객체를 사용할 수 있음.
 *
 * 사용법:
 *   import { test, expect } from '../../fixtures';
 */
export { test, expect } from './auth';
export { AUTH_FILE } from './auth.setup';
