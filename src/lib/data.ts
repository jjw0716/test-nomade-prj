import { supabase } from "./supabase";
import type { Tables } from "./database.types";

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
  monthlyCost: number;
  internetSpeed: number;
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

function mapCity(row: Tables<"cities">): City {
  return {
    id: row.id,
    rank: row.rank,
    name: row.name,
    region: row.region,
    score: row.score,
    monthlyCost: row.monthly_cost,
    internetSpeed: row.internet_speed,
    tags: row.tags,
    likes: row.likes,
    dislikes: row.dislikes,
    featured: row.featured,
    tier: row.tier as "T1" | "T2" | "T3",
    coworkingCount: row.coworking_count ?? undefined,
    budget: row.budget as Budget,
    district: row.district as District,
    environment: row.environment as Environment[],
    bestSeason: row.best_season as Season[],
  };
}

function mapMeetup(row: Tables<"meetups">): Meetup {
  return {
    id: row.id,
    city: row.city,
    date: row.date,
    dayOfWeek: row.day_of_week,
    rsvp: row.rsvp,
  };
}

export async function getCities(): Promise<City[]> {
  const { data, error } = await supabase
    .from("cities")
    .select("*")
    .order("likes", { ascending: false });
  if (error) throw error;
  return data.map(mapCity);
}

export async function getCityById(id: number): Promise<City | null> {
  const { data, error } = await supabase
    .from("cities")
    .select("*")
    .eq("id", id)
    .single();
  if (error) return null;
  return mapCity(data);
}

export async function getMeetups(): Promise<Meetup[]> {
  const { data, error } = await supabase
    .from("meetups")
    .select("*")
    .order("id");
  if (error) throw error;
  return data.map(mapMeetup);
}

export async function getMembers(): Promise<Member[]> {
  const { data, error } = await supabase
    .from("members")
    .select("*")
    .order("id");
  if (error) throw error;
  return data;
}

export async function getNomadStatus(): Promise<NomadStatus[]> {
  const { data, error } = await supabase
    .from("nomad_status")
    .select("*")
    .order("count", { ascending: false });
  if (error) throw error;
  return data;
}
