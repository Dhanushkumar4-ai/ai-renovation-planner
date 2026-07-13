import express from 'express';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();


const DESIGN_TEMPLATES = {
  kitchen: {
    color_palette: ['Crisp White (#FFFFFF)', 'Warm Beige (#F5F0EB)', 'Deep Navy (#1E3A5F)', 'Brushed Gold (#C9A84C)'],
    flooring: 'Large-format Italian marble tiles (60×60cm) or light oak engineered hardwood',
    cabinets: 'Shaker-style flat-panel cabinets in matte white with soft-close hinges',
    lighting: 'LED under-cabinet strips + pendant island lights + recessed ceiling lights',
    furniture: 'Waterfall-edge quartz island, bar stools with leather seating',
    concepts: 'Modular layout with dedicated prep, cooking, and cleaning zones. Built-in appliance panels for seamless look.'
  },
  bathroom: {
    color_palette: ['Warm White (#FAF9F6)', 'Sage Green (#7C9A7E)', 'Black Matte (#1C1C1C)', 'Rose Gold (#B76E79)'],
    flooring: 'Hexagonal mosaic porcelain tiles with anti-slip finish',
    cabinets: 'Wall-mounted floating vanity in walnut veneer with integrated basin',
    lighting: 'Backlit mirror + waterproof LED strips at mirror edges',
    furniture: 'Freestanding soaking tub, frameless glass shower enclosure',
    concepts: 'Spa-inspired design with heated floors, rainfall showerhead, and concealed storage.'
  },
  living: {
    color_palette: ['Warm Off-White (#F9F5EF)', 'Terracotta (#C4622D)', 'Forest Green (#2D4A3E)', 'Natural Linen (#D4C5B0)'],
    flooring: 'Wide-plank engineered oak flooring (18cm boards) with matte finish',
    cabinets: 'Built-in floor-to-ceiling shelving in matte white with integrated LED lighting',
    lighting: 'Statement chandelier + floor lamps + smart dimmer switches',
    furniture: 'L-shaped modular sofa, marble coffee table, accent chairs in bouclé fabric',
    concepts: 'Open-plan layout with feature wall, mix of textures (wood, stone, fabric) for warmth.'
  }
};

function getRuleBasedDesign(prompt) {
  const p = prompt.toLowerCase();
  let template = DESIGN_TEMPLATES.kitchen;
  if (p.includes('bathroom') || p.includes('bath')) template = DESIGN_TEMPLATES.bathroom;
  else if (p.includes('living') || p.includes('hall') || p.includes('drawing')) template = DESIGN_TEMPLATES.living;
  return template;
}

// POST /api/design
router.post('/', async (req, res) => {
  try {
    const { prompt } = req.body;
    if (!prompt) return res.status(400).json({ error: 'prompt required' });

    // Try OpenAI first
    if (process.env.OPENAI_API_KEY && process.env.OPENAI_API_KEY.startsWith('sk-')) {
      try {
        const { default: OpenAI } = await import('openai');
        const aiClient = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
        const messages = [
          { role: 'system', content: 'You are a professional interior design consultant specializing in Indian home renovations. Provide detailed, structured design suggestions with specific materials, colors, and budget considerations.' },
          { role: 'user', content: `Generate a detailed renovation design plan for: "${prompt}". Include: 1) Color palette with hex codes 2) Flooring recommendations 3) Cabinet/storage materials 4) Lighting ideas 5) Furniture suggestions 6) Key design concepts. Keep it practical for Indian homes.` }
        ];
        const completion = await aiClient.chat.completions.create({ model: 'gpt-4o-mini', messages, max_tokens: 500 });
        const text = completion.choices?.[0]?.message?.content || '';
        return res.json({ text, source: 'ai' });
      } catch (aiErr) {
        console.warn('OpenAI failed, using rule-based fallback:', aiErr.message);
      }
    }


    // Rule-based fallback
    const design = getRuleBasedDesign(prompt);
    const text = `🎨 **Color Palette**: ${design.color_palette.join(', ')}\n\n🪵 **Flooring**: ${design.flooring}\n\n🗄️ **Cabinets & Storage**: ${design.cabinets}\n\n💡 **Lighting**: ${design.lighting}\n\n🛋️ **Furniture**: ${design.furniture}\n\n✨ **Design Concepts**: ${design.concepts}`;
    res.json({ text, source: 'local', design });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
