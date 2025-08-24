const WP = (import.meta.env.VITE_WP_BASE || "").replace(/\/+$/, "");
const cache = new Map();

async function getJSON(url) {
  const r = await fetch(url);
  if (!r.ok) throw new Error(`WP ${r.status} for ${url}`);
  return r.json();
}

const strip = (s = "") => s.replace(/<[^>]*>/g, "");

function imgSrc(img) {
  if (!img) return "";
  if (typeof img === "string") return img;
  return img.url || img?.sizes?.large || img?.sizes?.medium_large || img?.sizes?.medium || "";
}

async function getProjectsCategoryId() {
  const key = `cat:projects`;
  if (cache.has(key)) return cache.get(key);
  const arr = await getJSON(`${WP}/categories?slug=projects`);
  const id = arr?.[0]?.id ?? null;
  cache.set(key, id);
  return id;
}

/**
 * Fetches and normalizes posts for the special projects grid.
 * Returns a custom object shape: { id, slug, title, img, hover }
 */
export const getProjects = async (page = 1, per = 20) => {
  const projectsId = await getProjectsCategoryId();
  if (!projectsId) return [];

  const rows = await getJSON(
    `${WP}/posts?per_page=${per}&page=${page}&categories=${projectsId}&_embed`
  );

  return rows.map((p) => {
    const acf = p.acf || {};
    return {
      id: p.id,
      slug: p.slug,
      title: (acf.grid_title || strip(p.title?.rendered || "") || p.slug || "Untitled").trim(),
      img: imgSrc(acf.grid_image),
      hover: acf.grid_hover_text || "",
      _raw: p,
    };
  });
};


// --- NEW FUNCTION ADDED HERE ---

/**
 * Fetches and normalizes a single project post by its slug for the detail page.
 */
export const getPostBySlug = async (slug) => {
  if (!slug) return null;
  const arr = await getJSON(`${WP}/posts?slug=${encodeURIComponent(slug)}&_embed`);
  const post = arr[0];
  if (!post) return null;

  const acf = post.acf || {};

  // Normalize the data into a predictable shape
  return {
    // Core WP Data
    id: post.id,
    slug: post.slug,
    
    // Main content from the Gutenberg editor
    content: post.content?.rendered || "",

    // Structured data from your ACF fields
    hero: {
      title: acf.hero_title || strip(post.title?.rendered || "Untitled"),
      subtitle: acf.hero_subtitle || "",
      image: imgSrc(acf.hero_image),
      smallDetails: acf.hero_project_small_details || "",
    },
    
    _raw: post, // For debugging
  };
};
