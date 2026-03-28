import { createClient } from '@supabase/supabase-js';
import type { Database } from '../../src/lib/database.types';

/**
 * E2E 테스트용 Supabase Admin 클라이언트
 *
 * - SUPABASE_SERVICE_ROLE_KEY: 테스트 데이터 seed/cleanup에 필요한 서비스 롤 키
 *   (anon key가 아닌 service_role key — .env.local에 별도 설정)
 * - 테스트 환경에서만 사용하며, 절대 클라이언트 사이드에 노출하지 말 것
 */
function getAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    throw new Error(
      'E2E DB helper: NEXT_PUBLIC_SUPABASE_URL 또는 SUPABASE_SERVICE_ROLE_KEY 환경변수가 없습니다.'
    );
  }

  return createClient<Database>(url, key, {
    auth: { persistSession: false },
  });
}

/**
 * E2E 테스트용 도시 데이터 seed
 * - 테스트에서 예측 가능한 데이터가 필요할 때 사용
 * - 테스트 완료 후 반드시 cleanupTestCities() 호출
 */
export async function seedTestCities() {
  const supabase = getAdminClient();

  const { data, error } = await supabase
    .from('cities')
    .insert([
      {
        name: '__E2E_서울__',
        region: '서울특별시',
        rank: 999,
        score: 95,
        monthly_cost: 150,
        internet_speed: 500,
        tags: ['테스트'],
        likes: 10,
        dislikes: 1,
        featured: false,
        tier: 'T1',
        budget: '100~200만원',
        district: '수도권',
        environment: ['도심선호'],
        best_season: ['봄'],
      },
    ])
    .select();

  if (error) throw error;
  return data;
}

/**
 * E2E 테스트 데이터 cleanup
 * - name이 '__E2E_'로 시작하는 모든 도시 삭제
 */
export async function cleanupTestCities() {
  const supabase = getAdminClient();

  const { error } = await supabase
    .from('cities')
    .delete()
    .like('name', '__E2E_%');

  if (error) throw error;
}
