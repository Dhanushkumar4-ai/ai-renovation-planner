import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
dotenv.config();

// Inline models to avoid import issues during seeding
const userSchema = new mongoose.Schema({
  name: String, email: { type: String, unique: true }, password: String,
  phone: String, address: String, role: { type: String, default: 'homeowner' },
  favorites: [mongoose.Schema.Types.ObjectId], avatar: String, createdAt: { type: Date, default: Date.now }
});
const User = mongoose.model('User', userSchema);

const workerSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId, name: String, email: String, phone: String,
  bio: String, skills: [String], category: String, experience: Number, rating: Number,
  reviewCount: Number, completedProjects: Number, portfolio: Array,
  isAvailable: Boolean, location: String, priceRange: String,
  isApproved: { type: Boolean, default: true }, hireCount: Number, avatar: String,
  createdAt: { type: Date, default: Date.now }
});
const Worker = mongoose.model('Worker', workerSchema);

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/renovai';

const categories = ['Carpenter', 'Painter', 'Electrician', 'Plumber', 'Mason', 'Interior Designer', 'Civil Contractor', 'Flooring', 'Tiling'];
const cities = ['Bengaluru', 'Mumbai', 'Delhi', 'Chennai', 'Hyderabad', 'Pune', 'Kolkata', 'Ahmedabad', 'Jaipur', 'Kochi'];

const workerData = [
  { name: 'Rajesh Kumar', category: 'Carpenter', skills: ['modular kitchen', 'wooden cabinets', 'wardrobe', 'furniture assembly'], experience: 12, rating: 4.8, completedProjects: 145, location: 'Bengaluru', priceRange: '₹800-₹1500/day', bio: 'Expert carpenter with 12 years of experience in modular kitchens and custom woodwork. Specialized in European and contemporary designs.' },
  { name: 'Suresh Patel', category: 'Painter', skills: ['wall painting', 'texture paint', 'waterproofing', 'enamel paint', 'decorative coating'], experience: 8, rating: 4.6, completedProjects: 203, location: 'Mumbai', priceRange: '₹600-₹1200/day', bio: 'Professional painter with expertise in decorative textures, Asian Paints royale, and waterproofing solutions.' },
  { name: 'Vijay Electrician', category: 'Electrician', skills: ['wiring', 'MCB panel', 'home automation', 'CCTV installation', 'solar panels'], experience: 15, rating: 4.9, completedProjects: 312, location: 'Bengaluru', priceRange: '₹700-₹1400/day', bio: 'Certified electrician specializing in residential and commercial electrical installations, smart home systems.' },
  { name: 'Mohan Plumber', category: 'Plumber', skills: ['pipe fitting', 'bathroom renovation', 'kitchen plumbing', 'water heater', 'drainage'], experience: 10, rating: 4.5, completedProjects: 178, location: 'Delhi', priceRange: '₹600-₹1100/day', bio: 'Experienced plumber handling complete bathroom renovations, plumbing upgrades, and leak detection.' },
  { name: 'Anand Mason', category: 'Mason', skills: ['brickwork', 'plastering', 'waterproofing', 'RCC work', 'boundary walls'], experience: 18, rating: 4.7, completedProjects: 289, location: 'Chennai', priceRange: '₹700-₹1300/day', bio: 'Senior mason with expertise in structural work, modern plastering techniques, and waterproofing solutions.' },
  { name: 'Priya Interiors', category: 'Interior Designer', skills: ['space planning', 'color consultation', 'furniture selection', '3D visualization', 'false ceiling'], experience: 7, rating: 4.9, completedProjects: 87, location: 'Hyderabad', priceRange: '₹2000-₹5000/day', bio: 'Award-winning interior designer specializing in contemporary Indian homes with international aesthetics.' },
  { name: 'Ramesh Civil', category: 'Civil Contractor', skills: ['house construction', 'renovation', 'room addition', 'structural repair', 'demolition'], experience: 20, rating: 4.6, completedProjects: 156, location: 'Pune', priceRange: '₹1500-₹3000/day', bio: 'Licensed civil contractor with 20 years experience. Handled residential and commercial projects up to 5Cr budget.' },
  { name: 'Deepak Flooring', category: 'Flooring', skills: ['vitrified tiles', 'marble flooring', 'wooden flooring', 'epoxy flooring', 'anti-skid tiles'], experience: 9, rating: 4.7, completedProjects: 221, location: 'Bengaluru', priceRange: '₹500-₹1000/sq.ft', bio: 'Flooring specialist with expertise in Italian marble, engineered wood, and industrial epoxy installations.' },
  { name: 'Santosh Tiles', category: 'Tiling', skills: ['bathroom tiling', 'kitchen backsplash', 'mosaic work', 'outdoor tiling', 'pattern tiles'], experience: 11, rating: 4.5, completedProjects: 267, location: 'Mumbai', priceRange: '₹400-₹800/sq.ft', bio: 'Master tiler specializing in complex mosaic patterns, large format tiles, and creative tile designs.' },
  { name: 'Arun Carpenter', category: 'Carpenter', skills: ['false ceiling', 'LCD panel', 'kids furniture', 'custom shelves', 'door fitting'], experience: 6, rating: 4.4, completedProjects: 98, location: 'Chennai', priceRange: '₹700-₹1200/day', bio: 'Young and innovative carpenter specializing in contemporary false ceilings and custom home furniture.' },
  { name: 'Naresh Painter', category: 'Painter', skills: ['exterior painting', 'weather shield', 'anti-fungal coating', 'stencil design', 'wall murals'], experience: 13, rating: 4.6, completedProjects: 189, location: 'Delhi', priceRange: '₹500-₹1000/day', bio: 'Experienced painter for both interior and exterior work. Expert in weatherproofing and artistic wall designs.' },
  { name: 'Kiran Electrical', category: 'Electrician', skills: ['rewiring', 'inverter installation', 'exhaust fan', 'AC installation', 'earthing'], experience: 7, rating: 4.3, completedProjects: 143, location: 'Hyderabad', priceRange: '₹600-₹1100/day', bio: 'Reliable electrician for all residential electrical needs. Quick response time and quality workmanship guaranteed.' },
  { name: 'Ravi Plumber Pro', category: 'Plumber', skills: ['geyser repair', 'tap replacement', 'toilet installation', 'overhead tank', 'water purifier'], experience: 5, rating: 4.2, completedProjects: 112, location: 'Pune', priceRange: '₹500-₹900/day', bio: 'Efficient plumber specializing in quick fixes and complete bathroom plumbing solutions at affordable rates.' },
  { name: 'Prakash Mason', category: 'Mason', skills: ['tile fixing', 'wall repair', 'crack filling', 'false wall', 'arches'], experience: 14, rating: 4.8, completedProjects: 234, location: 'Kolkata', priceRange: '₹600-₹1200/day', bio: 'Highly skilled mason known for precision work, decorative arches, and feature walls in residential spaces.' },
  { name: 'Neha Design Studio', category: 'Interior Designer', skills: ['luxury interiors', 'bedroom design', 'kitchen layout', 'vastu compliance', 'budget planning'], experience: 10, rating: 4.8, completedProjects: 63, location: 'Mumbai', priceRange: '₹3000-₹8000/day', bio: 'Luxury interior designer with portfolio spanning high-end apartments and villas. Known for vastu-compliant modern designs.' },
  { name: 'Ganesh Builder', category: 'Civil Contractor', skills: ['kitchen extension', 'bathroom addition', 'garage conversion', 'loft construction', 'balcony work'], experience: 16, rating: 4.5, completedProjects: 89, location: 'Ahmedabad', priceRange: '₹1200-₹2500/day', bio: 'Reliable civil contractor for home extensions and renovation projects. Known for timeline adherence and quality.' },
  { name: 'Mahesh Flooring', category: 'Flooring', skills: ['laminate flooring', 'vinyl flooring', 'bamboo flooring', 'carpet installation', 'floor polishing'], experience: 8, rating: 4.6, completedProjects: 176, location: 'Jaipur', priceRange: '₹450-₹900/sq.ft', bio: 'Flooring expert specializing in budget-friendly options without compromising on quality and durability.' },
  { name: 'Sunil Tiles Expert', category: 'Tiling', skills: ['swimming pool tiles', 'elevation tiles', 'terrace waterproofing', 'parking tiles', 'garden tiles'], experience: 13, rating: 4.7, completedProjects: 198, location: 'Bengaluru', priceRange: '₹350-₹700/sq.ft', bio: 'Versatile tiling professional handling everything from indoor bathrooms to outdoor swimming pools.' },
  { name: 'Venkat Woodworks', category: 'Carpenter', skills: ['teak furniture', 'antique restoration', 'carved woodwork', 'wooden staircase', 'pergola'], experience: 22, rating: 4.9, completedProjects: 167, location: 'Chennai', priceRange: '₹1000-₹2000/day', bio: 'Master craftsman with 22 years in traditional and contemporary woodworking. Specialized in teak and rosewood.' },
  { name: 'Ajay Color World', category: 'Painter', skills: ['metallic paint', 'chalk paint', 'Venetian plaster', 'wallpaper installation', 'epoxy floor paint'], experience: 9, rating: 4.5, completedProjects: 156, location: 'Hyderabad', priceRange: '₹650-₹1300/day', bio: 'Creative painting professional offering unique finishes like Venetian plaster, metallic coatings, and wallpaper.' },
  { name: 'Harish Power Solutions', category: 'Electrician', skills: ['3-phase wiring', 'UPS installation', 'generator', 'fire alarm', 'network cabling'], experience: 11, rating: 4.7, completedProjects: 245, location: 'Delhi', priceRange: '₹800-₹1600/day', bio: 'Commercial and residential electrical contractor specializing in heavy-duty installations and backup power systems.' },
  { name: 'Sanjay Pipe Works', category: 'Plumber', skills: ['CPVC piping', 'solar water heater', 'sewage treatment', 'bore well', 'rain water harvesting'], experience: 16, rating: 4.8, completedProjects: 289, location: 'Bengaluru', priceRange: '₹700-₹1300/day', bio: 'Senior plumber with expertise in modern CPVC piping, eco-friendly water systems, and commercial plumbing.' },
  { name: 'Dinesh Construction', category: 'Mason', skills: ['stone cladding', 'exposed brick', 'pebble dash', 'GRC work', 'compound wall'], experience: 17, rating: 4.6, completedProjects: 201, location: 'Pune', priceRange: '₹750-₹1400/day', bio: 'Creative mason specializing in decorative stonework, exposed brick walls, and compound wall construction.' },
  { name: 'Lakshmi Interiors', category: 'Interior Designer', skills: ['Scandinavian design', 'minimalist interiors', 'open kitchen', 'studio apartments', 'color therapy'], experience: 6, rating: 4.7, completedProjects: 45, location: 'Bengaluru', priceRange: '₹2500-₹6000/day', bio: 'Young interior designer specializing in minimalist Scandinavian-inspired spaces for modern urban homes.' },
  { name: 'Balu Projects', category: 'Civil Contractor', skills: ['complete renovation', 'flat renovation', 'office renovation', 'shop renovation', 'factory flooring'], experience: 19, rating: 4.4, completedProjects: 134, location: 'Chennai', priceRange: '₹1000-₹2000/day', bio: 'Established contractor handling complete flat and office renovations with a team of 25+ skilled workers.' },
  { name: 'Kishore Flooring Co.', category: 'Flooring', skills: ['sports flooring', 'gym flooring', 'hospital flooring', 'anti-static flooring', 'terrazzo'], experience: 12, rating: 4.8, completedProjects: 143, location: 'Mumbai', priceRange: '₹600-₹1200/sq.ft', bio: 'Specialized flooring contractor handling institutional, sports, and commercial flooring installations.' },
  { name: 'Ramu Tiles & Bath', category: 'Tiling', skills: ['digital tiles', 'wood-look tiles', 'cement tiles', 'encaustic tiles', 'border tiles'], experience: 8, rating: 4.4, completedProjects: 187, location: 'Delhi', priceRange: '₹300-₹650/sq.ft', bio: 'Budget-friendly tiling professional with extensive knowledge of latest tile trends and installation techniques.' },
  { name: 'Govind Furniture', category: 'Carpenter', skills: ['bedroom furniture', 'study table', 'bookshelf', 'TV unit', 'shoe rack'], experience: 5, rating: 4.3, completedProjects: 78, location: 'Jaipur', priceRange: '₹600-₹1000/day', bio: 'Affordable carpenter for all types of home furniture. Quick turnaround times with quality guaranteed.' },
  { name: 'Pramod Painters', category: 'Painter', skills: ['commercial painting', 'hotel painting', 'anti-bacterial paint', 'roof painting', 'garage floor paint'], experience: 15, rating: 4.6, completedProjects: 312, location: 'Ahmedabad', priceRange: '₹500-₹950/day', bio: 'Commercial painting contractor with extensive experience in hotels, hospitals, and large residential complexes.' },
  { name: 'Shiva Electrical Works', category: 'Electrician', skills: ['outdoor lighting', 'landscape lighting', 'pool lighting', 'festival lighting', 'LED retrofit'], experience: 8, rating: 4.5, completedProjects: 189, location: 'Bengaluru', priceRange: '₹650-₹1200/day', bio: 'Lighting specialist transforming homes with creative outdoor and landscape lighting installations.' },
  { name: 'Mani Plumbing', category: 'Plumber', skills: ['jacuzzi installation', 'steam room', 'rain shower', 'bathroom accessories', 'water softener'], experience: 12, rating: 4.7, completedProjects: 134, location: 'Mumbai', priceRange: '₹800-₹1500/day', bio: 'Luxury bathroom specialist handling Jacuzzis, steam rooms, and high-end bathroom fittings installation.' },
  { name: 'Satish Structures', category: 'Mason', skills: ['earthquake resistant', 'retrofitting', 'underpinning', 'column strengthening', 'beam repair'], experience: 25, rating: 4.9, completedProjects: 178, location: 'Delhi', priceRange: '₹900-₹1800/day', bio: 'Structural specialist with 25 years experience in building repairs, retrofitting, and earthquake-resistant construction.' },
  { name: 'Creative Spaces', category: 'Interior Designer', skills: ['kids room design', 'nursery design', 'playroom', 'teenage room', 'study area'], experience: 8, rating: 4.8, completedProjects: 56, location: 'Hyderabad', priceRange: '₹2000-₹4500/day', bio: 'Child-focused interior designer creating magical, functional spaces for kids with safety as top priority.' },
  { name: 'Raj Infrastructure', category: 'Civil Contractor', skills: ['swimming pool', 'landscaping', 'driveway', 'retaining wall', 'water tank'], experience: 14, rating: 4.5, completedProjects: 67, location: 'Pune', priceRange: '₹2000-₹4000/day', bio: 'Civil contractor specializing in outdoor infrastructure including swimming pools, driveways, and landscape construction.' },
  { name: 'Diamond Floors', category: 'Flooring', skills: ['Italian marble', 'Kota stone', 'slate flooring', 'Kadappa stone', 'natural stone'], experience: 20, rating: 4.9, completedProjects: 298, location: 'Jaipur', priceRange: '₹800-₹1500/sq.ft', bio: 'Premium stone flooring specialist with direct sourcing from quarries. Specialized in Italian and Indian marble.' },
  { name: 'Metro Tiles', category: 'Tiling', skills: ['subway tiles', 'Moroccan tiles', 'Spanish tiles', 'handmade tiles', 'glazed ceramics'], experience: 9, rating: 4.6, completedProjects: 223, location: 'Mumbai', priceRange: '₹350-₹750/sq.ft', bio: 'Artisan tiler specializing in unique international tile styles and creative pattern installations.' },
  { name: 'Sudarshan Woodcraft', category: 'Carpenter', skills: ['pooja room', 'temple woodwork', 'crockery unit', 'display shelves', 'kitchen accessories'], experience: 16, rating: 4.7, completedProjects: 189, location: 'Hyderabad', priceRange: '₹900-₹1600/day', bio: 'Traditional woodcraft specialist for pooja rooms, carved furniture, and custom kitchen accessories.' },
  { name: 'Urban Painters', category: 'Painter', skills: ['spray painting', 'HVLP systems', 'industrial coating', 'anti-corrosion paint', 'epoxy coating'], experience: 11, rating: 4.5, completedProjects: 167, location: 'Kolkata', priceRange: '₹700-₹1400/day', bio: 'Industrial-grade painting contractor offering spray painting, epoxy coating, and anti-corrosion treatments.' },
  { name: 'Smart Home Systems', category: 'Electrician', skills: ['Alexa integration', 'smart switches', 'video doorbell', 'smart locks', 'energy monitoring'], experience: 5, rating: 4.8, completedProjects: 89, location: 'Bengaluru', priceRange: '₹1000-₹2000/day', bio: 'Smart home automation specialist integrating voice control, energy management, and security systems.' },
  { name: 'Quick Fix Plumbing', category: 'Plumber', skills: ['emergency repairs', '24x7 service', 'pipe burst', 'block clearing', 'drainage CCTV'], experience: 7, rating: 4.3, completedProjects: 456, location: 'Delhi', priceRange: '₹500-₹1000/day', bio: 'Emergency plumbing service available 24x7. Specializes in quick fixes, pipe bursts, and drain clearing.' },
  { name: 'Heritage Masons', category: 'Mason', skills: ['heritage restoration', 'old lime plaster', 'conservation work', 'traditional brick', 'mud work'], experience: 30, rating: 5.0, completedProjects: 89, location: 'Ahmedabad', priceRange: '₹1200-₹2500/day', bio: 'Rare heritage conservation mason with 30 years restoring old buildings, havelis, and traditional structures.' },
  { name: 'Vastu Design Hub', category: 'Interior Designer', skills: ['vastu shastra', 'feng shui', 'energy flow', 'direction-based design', 'remedies'], experience: 15, rating: 4.7, completedProjects: 123, location: 'Jaipur', priceRange: '₹2500-₹5000/day', bio: 'Vastu-certified interior designer combining ancient wisdom with modern design for harmonious living spaces.' },
  { name: 'Skyline Contractors', category: 'Civil Contractor', skills: ['terrace conversion', 'penthouse', 'rooftop garden', 'pergola construction', 'glass roof'], experience: 12, rating: 4.6, completedProjects: 78, location: 'Mumbai', priceRange: '₹2500-₹5000/day', bio: 'Rooftop and terrace specialist creating stunning rooftop gardens, pergolas, and luxury penthouse conversions.' },
  { name: 'Green Flooring', category: 'Flooring', skills: ['cork flooring', 'recycled rubber', 'reclaimed wood', 'eco-friendly materials', 'VOC-free adhesives'], experience: 7, rating: 4.6, completedProjects: 112, location: 'Bengaluru', priceRange: '₹550-₹1100/sq.ft', bio: 'Eco-conscious flooring specialist using sustainable materials for environmentally responsible home renovations.' },
  { name: 'Perfect Tiles', category: 'Tiling', skills: ['large format tiles', '120x60 tiles', 'rectified tiles', 'book-match tiles', 'grout free tiles'], experience: 10, rating: 4.7, completedProjects: 156, location: 'Bengaluru', priceRange: '₹400-₹800/sq.ft', bio: 'Large format tile specialist handling 120x240cm slabs and precision rectified tile installations.' },
  { name: 'Chandra Carpentry', category: 'Carpenter', skills: ['swing bed', 'murphy bed', 'convertible sofa', 'space-saving furniture', 'corner units'], experience: 8, rating: 4.5, completedProjects: 134, location: 'Chennai', priceRange: '₹750-₹1300/day', bio: 'Space-saving furniture specialist for small apartments. Expert in murphy beds, convertibles, and multi-functional pieces.' },
  { name: 'Evershine Painters', category: 'Painter', skills: ['waterproofing terrace', 'terrace painting', 'heat-resistant paint', 'cool roof coating', 'deck paint'], experience: 10, rating: 4.4, completedProjects: 201, location: 'Hyderabad', priceRange: '₹550-₹1050/day', bio: 'Terrace and exterior specialist offering heat-reflective cool roof coatings and waterproofing solutions.' },
  { name: 'Bright Electrical', category: 'Electrician', skills: ['chandelier installation', 'cove lighting', 'LED strips', 'motion sensors', 'timer switches'], experience: 9, rating: 4.6, completedProjects: 267, location: 'Mumbai', priceRange: '₹700-₹1300/day', bio: 'Lighting design specialist transforming interiors with creative lighting setups and energy-efficient LED systems.' },
  { name: 'City Plumbers', category: 'Plumber', skills: ['commercial plumbing', 'office washroom', 'restaurant kitchen', 'industrial pipes', 'fire hydrant'], experience: 18, rating: 4.8, completedProjects: 234, location: 'Chennai', priceRange: '₹900-₹1700/day', bio: 'Commercial plumbing contractor with extensive experience in offices, restaurants, and industrial facilities.' },
  { name: 'Rock Solid Masons', category: 'Mason', skills: ['natural stone wall', 'rock wall', 'gabion wall', 'stone pathway', 'garden masonry'], experience: 11, rating: 4.6, completedProjects: 145, location: 'Pune', priceRange: '₹700-₹1300/day', bio: 'Natural stone masonry expert creating stunning garden walls, pathways, and landscape stone features.' },
];

const userData = [
  { name: 'Arjun Sharma', email: 'arjun.sharma@gmail.com', phone: '9876543210', address: 'Indiranagar, Bengaluru', role: 'homeowner' },
  { name: 'Kavitha Nair', email: 'kavitha.nair@gmail.com', phone: '9865432101', address: 'Bandra, Mumbai', role: 'homeowner' },
  { name: 'Rohit Mehta', email: 'rohit.mehta@gmail.com', phone: '9854321012', address: 'Hauz Khas, Delhi', role: 'homeowner' },
  { name: 'Sunita Reddy', email: 'sunita.reddy@gmail.com', phone: '9843210123', address: 'Jubilee Hills, Hyderabad', role: 'homeowner' },
  { name: 'Vikram Singh', email: 'vikram.singh@gmail.com', phone: '9832101234', address: 'Koregaon Park, Pune', role: 'homeowner' },
  { name: 'Anitha Krishnan', email: 'anitha.krishnan@gmail.com', phone: '9821012345', address: 'T. Nagar, Chennai', role: 'homeowner' },
  { name: 'Mihir Patel', email: 'mihir.patel@gmail.com', phone: '9810123456', address: 'Navrangpura, Ahmedabad', role: 'homeowner' },
  { name: 'Pooja Agarwal', email: 'pooja.agarwal@gmail.com', phone: '9809876543', address: 'C-Scheme, Jaipur', role: 'homeowner' },
  { name: 'Suresh Babu', email: 'suresh.babu@gmail.com', phone: '9798765432', address: 'Ernakulam, Kochi', role: 'homeowner' },
  { name: 'Meera Joshi', email: 'meera.joshi@gmail.com', phone: '9787654321', address: 'Salt Lake, Kolkata', role: 'homeowner' },
  { name: 'Rahul Gupta', email: 'rahul.gupta@gmail.com', phone: '9776543210', address: 'HSR Layout, Bengaluru', role: 'homeowner' },
  { name: 'Priyanka Das', email: 'priyanka.das@gmail.com', phone: '9765432109', address: 'Andheri, Mumbai', role: 'homeowner' },
  { name: 'Aakash Verma', email: 'aakash.verma@gmail.com', phone: '9754321098', address: 'Rohini, Delhi', role: 'homeowner' },
  { name: 'Deepa Venkat', email: 'deepa.venkat@gmail.com', phone: '9743210987', address: 'Madhapur, Hyderabad', role: 'homeowner' },
  { name: 'Nikhil Desai', email: 'nikhil.desai@gmail.com', phone: '9732109876', address: 'Kothrud, Pune', role: 'homeowner' },
  { name: 'Sangeetha M', email: 'sangeetha.m@gmail.com', phone: '9721098765', address: 'Velachery, Chennai', role: 'homeowner' },
  { name: 'Dhruv Shah', email: 'dhruv.shah@gmail.com', phone: '9710987654', address: 'Satellite, Ahmedabad', role: 'homeowner' },
  { name: 'Nisha Rajput', email: 'nisha.rajput@gmail.com', phone: '9709876543', address: 'Malviya Nagar, Jaipur', role: 'homeowner' },
  { name: 'Arun Pillai', email: 'arun.pillai@gmail.com', phone: '9698765432', address: 'Kakkanad, Kochi', role: 'homeowner' },
  { name: 'Ritu Chakraborty', email: 'ritu.chakraborty@gmail.com', phone: '9687654321', address: 'New Town, Kolkata', role: 'homeowner' },
  { name: 'Karthik Iyer', email: 'karthik.iyer@gmail.com', phone: '9676543210', address: 'Whitefield, Bengaluru', role: 'homeowner' },
  { name: 'Shalini Bhatt', email: 'shalini.bhatt@gmail.com', phone: '9665432109', address: 'Powai, Mumbai', role: 'homeowner' },
  { name: 'Manish Kumar', email: 'manish.kumar@gmail.com', phone: '9654321098', address: 'Dwarka, Delhi', role: 'homeowner' },
  { name: 'Lakshmi Rao', email: 'lakshmi.rao@gmail.com', phone: '9643210987', address: 'Gachibowli, Hyderabad', role: 'homeowner' },
  { name: 'Prasad Kulkarni', email: 'prasad.kulkarni@gmail.com', phone: '9632109876', address: 'Viman Nagar, Pune', role: 'homeowner' },
  { name: 'Geetha Subramaniam', email: 'geetha.s@gmail.com', phone: '9621098765', address: 'Anna Nagar, Chennai', role: 'homeowner' },
  { name: 'Harsh Kapoor', email: 'harsh.kapoor@gmail.com', phone: '9610987654', address: 'Bodakdev, Ahmedabad', role: 'homeowner' },
  { name: 'Swati Sharma', email: 'swati.sharma@gmail.com', phone: '9609876543', address: 'Vaishali Nagar, Jaipur', role: 'homeowner' },
  { name: 'Thomas Mathew', email: 'thomas.mathew@gmail.com', phone: '9598765432', address: 'Thrippunithura, Kochi', role: 'homeowner' },
  { name: 'Amrita Sen', email: 'amrita.sen@gmail.com', phone: '9587654321', address: 'Jadavpur, Kolkata', role: 'homeowner' },
  { name: 'Siddharth Jain', email: 'siddharth.jain@gmail.com', phone: '9576543210', address: 'Jayanagar, Bengaluru', role: 'homeowner' },
  { name: 'Rekha Nambiar', email: 'rekha.nambiar@gmail.com', phone: '9565432109', address: 'Juhu, Mumbai', role: 'homeowner' },
  { name: 'Amol Sawant', email: 'amol.sawant@gmail.com', phone: '9554321098', address: 'Lajpat Nagar, Delhi', role: 'homeowner' },
  { name: 'Padma Swamy', email: 'padma.swamy@gmail.com', phone: '9543210987', address: 'Kukatpally, Hyderabad', role: 'homeowner' },
  { name: 'Ganesh Kamat', email: 'ganesh.kamat@gmail.com', phone: '9532109876', address: 'Deccan, Pune', role: 'homeowner' },
  { name: 'Bharathi Sekar', email: 'bharathi.sekar@gmail.com', phone: '9521098765', address: 'Adyar, Chennai', role: 'homeowner' },
  { name: 'Varun Panchal', email: 'varun.panchal@gmail.com', phone: '9510987654', address: 'Prahlad Nagar, Ahmedabad', role: 'homeowner' },
  { name: 'Chitra Mehta', email: 'chitra.mehta@gmail.com', phone: '9509876543', address: 'Mansarovar, Jaipur', role: 'homeowner' },
  { name: 'Biju George', email: 'biju.george@gmail.com', phone: '9498765432', address: 'Aluva, Kochi', role: 'homeowner' },
  { name: 'Debasish Roy', email: 'debasish.roy@gmail.com', phone: '9487654321', address: 'Dum Dum, Kolkata', role: 'homeowner' },
  { name: 'Shreya Malhotra', email: 'shreya.malhotra@gmail.com', phone: '9476543210', address: 'Bellandur, Bengaluru', role: 'homeowner' },
  { name: 'Rajendra Shinde', email: 'rajendra.shinde@gmail.com', phone: '9465432109', address: 'Dadar, Mumbai', role: 'homeowner' },
  { name: 'Neeta Singh', email: 'neeta.singh@gmail.com', phone: '9454321098', address: 'Pitampura, Delhi', role: 'homeowner' },
  { name: 'Ramana Rao', email: 'ramana.rao@gmail.com', phone: '9443210987', address: 'Secunderabad, Hyderabad', role: 'homeowner' },
  { name: 'Poornima Deshpande', email: 'poornima.d@gmail.com', phone: '9432109876', address: 'Aundh, Pune', role: 'homeowner' },
  { name: 'Chandrasekhar M', email: 'chandra.m@gmail.com', phone: '9421098765', address: 'Besant Nagar, Chennai', role: 'homeowner' },
  { name: 'Hitesh Trivedi', email: 'hitesh.trivedi@gmail.com', phone: '9410987654', address: 'Thaltej, Ahmedabad', role: 'homeowner' },
  { name: 'Ananya Saxena', email: 'ananya.saxena@gmail.com', phone: '9409876543', address: 'Raja Park, Jaipur', role: 'homeowner' },
  { name: 'Joby Philip', email: 'joby.philip@gmail.com', phone: '9398765432', address: 'Edapally, Kochi', role: 'homeowner' },
  { name: 'Moupiya Ghosh', email: 'moupiya.ghosh@gmail.com', phone: '9387654321', address: 'Behala, Kolkata', role: 'homeowner' },
  // Admin user
  { name: 'Admin Renov-AI', email: 'admin@renovai.com', phone: '9999999999', address: 'Renov-AI HQ, Bengaluru', role: 'admin' },
];

const PORTFOLIO_IMAGES = {
  Carpenter: [
    { title: 'Modern Modular Kitchen', desc: 'Custom kitchen with quartz countertops', url: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80' },
    { title: 'Master Bedroom Wardrobe', desc: 'Sliding wardrobe with mirror panels', url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80' }
  ],
  Painter: [
    { title: 'Luxury Living Room', desc: 'Texture paint with premium finish', url: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=80' },
    { title: 'Bedroom Feature Wall', desc: 'Accent wall with wallpaper', url: 'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=600&q=80' }
  ],
  Electrician: [
    { title: 'Smart Home Setup', desc: 'Complete home automation', url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80' },
    { title: 'LED Lighting Design', desc: 'Cove lighting and chandeliers', url: 'https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=600&q=80' }
  ],
  Plumber: [
    { title: 'Luxury Bathroom', desc: 'Rain shower and Jacuzzi installation', url: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=600&q=80' },
    { title: 'Modular Kitchen Plumbing', desc: 'CPVC piping with sink unit', url: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80' }
  ],
  Mason: [
    { title: 'Feature Stone Wall', desc: 'Exposed brick interior design', url: 'https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=600&q=80' },
    { title: 'Compound Wall', desc: 'Decorative compound wall with pillars', url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80' }
  ],
  'Interior Designer': [
    { title: 'Complete Home Makeover', desc: '3BHK transformation project', url: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=80' },
    { title: 'Modern Living Room', desc: 'Scandinavian-inspired design', url: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80' }
  ],
  'Civil Contractor': [
    { title: 'Villa Construction', desc: 'Complete 4BHK villa build', url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80' },
    { title: 'Kitchen Extension', desc: 'Additional room construction', url: 'https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=600&q=80' }
  ],
  Flooring: [
    { title: 'Italian Marble Flooring', desc: 'Premium marble in living room', url: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80' },
    { title: 'Engineered Wood Floor', desc: 'Oak hardwood in bedroom', url: 'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=600&q=80' }
  ],
  Tiling: [
    { title: 'Bathroom Tile Work', desc: 'Mosaic pattern bathroom renovation', url: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=600&q=80' },
    { title: 'Kitchen Backsplash', desc: 'Subway tile kitchen backsplash', url: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80' }
  ]
};

async function seed() {
  await mongoose.connect(MONGO_URI);
  console.log('✅ Connected to MongoDB');

  // Clear existing data
  await User.deleteMany({});
  await Worker.deleteMany({});
  console.log('🗑️  Cleared existing users and workers');

  // Create users
  const hashedPassword = await bcrypt.hash('password123', 10);
  const createdUsers = await User.insertMany(
    userData.map(u => ({ ...u, password: hashedPassword }))
  );
  console.log(`✅ Created ${createdUsers.length} users`);

  // Create workers
  const createdWorkers = await Worker.insertMany(
    workerData.map((w, i) => ({
      ...w,
      reviewCount: Math.floor(Math.random() * 50) + 10,
      hireCount: Math.floor(Math.random() * 100) + 20,
      isAvailable: Math.random() > 0.15,
      portfolio: PORTFOLIO_IMAGES[w.category] || [],
    }))
  );
  console.log(`✅ Created ${createdWorkers.length} workers`);

  console.log('\n🎉 Seed complete!');
  console.log('📧 Admin login: admin@renovai.com / password123');
  console.log('📧 User login: arjun.sharma@gmail.com / password123');
  console.log(`👷 Total workers: ${createdWorkers.length}`);
  console.log(`👤 Total users: ${createdUsers.length}`);
  process.exit(0);
}

seed().catch(err => { console.error('Seed error:', err); process.exit(1); });
