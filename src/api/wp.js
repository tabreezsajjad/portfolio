const BASE = import.meta.env.VITE_WP_BASE?.replace(/\/+$/, "");
const API = `${BASE}`;
const cache = new Map();

async function j(url){ const r = await fetch(url); if(!r.ok) throw new Error(`WP ${r.status}`); return r.json(); }

// category id by slug (cached)
async function catId(slug){
  const k=`cat:${slug}`; if(cache.has(k)) return cache.get(k);
  const arr = await j(`${API}/categories?slug=${encodeURIComponent(slug)}`);
  const id = arr?.[0]?.id ?? null; cache.set(k,id); return id;
}

// BLOG list (exclude press + projects)
export const getBlog = async (page=1, per=9) => {
  const press = await catId('press'); const projects = await catId('projects');
  const exclude = [press, projects].filter(Boolean).join(',');
  const q = exclude ? `&categories_exclude=${exclude}` : '';
  return j(`${API}/posts?per_page=${per}&page=${page}&_embed${q}`);
};

// PRESS list
export const getPress = async (page=1, per=20) => {
  const id = await catId('press'); if(!id) return [];
  return j(`${API}/posts?per_page=${per}&page=${page}&categories=${id}&_embed`);
};

// PROJECTS list (if/when needed)
export const getProjects = async (page=1, per=20) => {
  const id = await catId('projects'); if(!id) return [];
  return j(`${API}/posts?per_page=${per}&page=${page}&categories=${id}&_embed`);
};

// Single post (works for blog/press/projects)
export const getPostBySlug = async (slug) => {
  const arr = await j(`${API}/posts?slug=${encodeURIComponent(slug)}&_embed`);
  return arr[0] || null;
};

export const featuredSrc = n => n?._embedded?.['wp:featuredmedia']?.[0]?.source_url || '';
export const featuredAlt = n => n?._embedded?.['wp:featuredmedia']?.[0]?.alt_text || '';
export const formatDate = s => new Date(s).toLocaleDateString(
  undefined, { year:"numeric", month:"short", day:"numeric" }
);

// quick reading time estimate from HTML
export function readingTime(html){
  const text = html?.replace(/<[^>]+>/g,' ') ?? '';
  const words = (text.match(/\b\w+\b/g) || []).length;
  return Math.max(1, Math.round(words / 220)); // ~220 wpm
}
