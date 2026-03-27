export type Budget = "100만원이하" | "100~200만원" | "200만원이상";
export type District = "수도권" | "경상도" | "전라도" | "강원도" | "제주도" | "충청도";
export type Environment = "자연친화" | "도심선호" | "카페작업" | "코워킹 필수";
export type Season = "봄" | "여름" | "가을" | "겨울";

export interface FilterState {
  budget: Budget | null;
  district: District | null;
  environment: Environment[];
  bestSeason: Season[];
}

export interface City {
  id: number;
  rank: number;
  name: string;
  region: string;
  score: number;
  monthlyCost: number; // 만원
  internetSpeed: number; // Mbps
  tags: string[];
  likes: number;
  dislikes: number;
  featured: boolean;
  tier: "T1" | "T2" | "T3";
  coworkingCount?: number;
  budget: Budget;
  district: District;
  environment: Environment[];
  bestSeason: Season[];
}

export interface Meetup {
  id: number;
  city: string;
  date: string;
  dayOfWeek: string;
  rsvp: number;
}

export interface Member {
  id: number;
  initial: string;
  color: string;
}

export interface NomadStatus {
  city: string;
  count: number;
}

export const cities: City[] = [
  {
    id: 1, rank: 1, name: "제주시", region: "제주특별자치도",
    score: 4.8, monthlyCost: 160, internetSpeed: 420,
    tags: ["#바다", "#카페", "#자연"],
    likes: 142, dislikes: 11, featured: true, tier: "T1",
    budget: "100~200만원", district: "제주도",
    environment: ["자연친화", "카페작업"], bestSeason: ["봄", "가을"],
  },
  {
    id: 2, rank: 2, name: "부산", region: "부산광역시",
    score: 4.6, monthlyCost: 180, internetSpeed: 510,
    tags: ["#바다", "#맛집", "#교통"],
    likes: 118, dislikes: 9, featured: false, tier: "T1",
    budget: "100~200만원", district: "경상도",
    environment: ["도심선호", "카페작업"], bestSeason: ["봄", "가을"],
  },
  {
    id: 3, rank: 3, name: "서울", region: "서울특별시",
    score: 4.5, monthlyCost: 260, internetSpeed: 650,
    tags: ["#코워킹", "#인프라", "#교통"],
    likes: 203, dislikes: 24, featured: false, tier: "T1",
    coworkingCount: 60,
    budget: "200만원이상", district: "수도권",
    environment: ["도심선호", "코워킹 필수"], bestSeason: ["봄", "가을"],
  },
  {
    id: 4, rank: 4, name: "강릉", region: "강원도",
    score: 4.4, monthlyCost: 130, internetSpeed: 380,
    tags: ["#바다", "#카페", "#청정"],
    likes: 87, dislikes: 6, featured: false, tier: "T2",
    budget: "100만원이하", district: "강원도",
    environment: ["자연친화", "카페작업"], bestSeason: ["여름", "가을"],
  },
  {
    id: 5, rank: 5, name: "전주", region: "전라북도",
    score: 4.2, monthlyCost: 110, internetSpeed: 350,
    tags: ["#한옥", "#저렴", "#여유"],
    likes: 64, dislikes: 5, featured: false, tier: "T2",
    budget: "100만원이하", district: "전라도",
    environment: ["자연친화", "카페작업"], bestSeason: ["봄", "가을"],
  },
  {
    id: 6, rank: 6, name: "대전", region: "대전광역시",
    score: 4.1, monthlyCost: 140, internetSpeed: 420,
    tags: ["#IT", "#카이스트", "#연중"],
    likes: 51, dislikes: 4, featured: false, tier: "T2",
    budget: "100~200만원", district: "충청도",
    environment: ["도심선호", "코워킹 필수"], bestSeason: ["봄", "가을"],
  },
  {
    id: 7, rank: 7, name: "인천 송도", region: "인천광역시",
    score: 4.0, monthlyCost: 200, internetSpeed: 500,
    tags: ["#글로벌", "#공항", "#신도시"],
    likes: 43, dislikes: 8, featured: false, tier: "T2",
    budget: "200만원이상", district: "수도권",
    environment: ["도심선호", "코워킹 필수"], bestSeason: ["봄", "여름"],
  },
  {
    id: 8, rank: 8, name: "속초", region: "강원도",
    score: 3.9, monthlyCost: 120, internetSpeed: 320,
    tags: ["#설악산", "#해산물", "#청정"],
    likes: 38, dislikes: 3, featured: false, tier: "T3",
    budget: "100만원이하", district: "강원도",
    environment: ["자연친화"], bestSeason: ["여름", "가을"],
  },
  {
    id: 9, rank: 9, name: "여수", region: "전라남도",
    score: 3.8, monthlyCost: 120, internetSpeed: 310,
    tags: ["#야경", "#해산물", "#관광"],
    likes: 35, dislikes: 4, featured: false, tier: "T3",
    budget: "100만원이하", district: "전라도",
    environment: ["자연친화", "카페작업"], bestSeason: ["여름"],
  },
  {
    id: 10, rank: 10, name: "경주", region: "경상북도",
    score: 3.7, monthlyCost: 100, internetSpeed: 300,
    tags: ["#역사", "#조용함", "#저렴"],
    likes: 29, dislikes: 2, featured: false, tier: "T3",
    budget: "100만원이하", district: "경상도",
    environment: ["자연친화"], bestSeason: ["봄", "가을"],
  },
  {
    id: 11, rank: 11, name: "통영", region: "경상남도",
    score: 3.6, monthlyCost: 110, internetSpeed: 290,
    tags: ["#다도해", "#예술", "#조용함"],
    likes: 24, dislikes: 3, featured: false, tier: "T3",
    budget: "100만원이하", district: "경상도",
    environment: ["자연친화"], bestSeason: ["봄", "여름"],
  },
];

export const meetups: Meetup[] = [
  { id: 1, city: "서울", date: "3월 22일", dayOfWeek: "토", rsvp: 14 },
  { id: 2, city: "제주", date: "3월 25일", dayOfWeek: "화", rsvp: 8 },
  { id: 3, city: "부산", date: "4월 2일", dayOfWeek: "수", rsvp: 5 },
  { id: 4, city: "강릉", date: "4월 5일", dayOfWeek: "토", rsvp: 3 },
];

export const recentMembers: Member[] = [
  { id: 1, initial: "김", color: "bg-violet-600" },
  { id: 2, initial: "박", color: "bg-indigo-600" },
  { id: 3, initial: "이", color: "bg-blue-600" },
  { id: 4, initial: "최", color: "bg-purple-600" },
  { id: 5, initial: "정", color: "bg-fuchsia-600" },
  { id: 6, initial: "강", color: "bg-violet-700" },
  { id: 7, initial: "조", color: "bg-indigo-700" },
  { id: 8, initial: "윤", color: "bg-blue-700" },
];

export const nomadStatus: NomadStatus[] = [
  { city: "서울", count: 21 },
  { city: "제주", count: 12 },
  { city: "부산", count: 8 },
  { city: "강릉", count: 5 },
  { city: "전주", count: 3 },
];
