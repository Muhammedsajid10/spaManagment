const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const Service = require('../models/Service');

const services = [
  // Massage Services
  {
    name: 'Relaxing Massage',
    description: 'Indulge in a blissful escape with a relaxing massage. Feel tension melt away as skilled hands work soothing oils into your muscles, using gentle strokes and rhythmic movements. A tranquil ambiance and calming music enhance the experience, leaving you refreshed, rejuvenated, and deeply relaxed.',
    duration: 60,
    price: 410,
    category: 'Massage'
  },
  {
    name: 'Swedish Massage',
    description: 'Experience the rejuvenating touch of a Swedish massage, where long, flowing strokes and gentle kneading techniques work to ease muscle tension. The therapist uses soothing oils to enhance the massage, promoting relaxation and improved circulation. This classic massage leaves you feeling revitalized and deeply relaxed.',
    duration: 60,
    price: 410,
    category: 'Massage'
  },
  {
    name: 'Potli Massage',
    description: 'Potli massage is a therapeutic experience that involves the use of heated herbal pouches filled with a blend of medicinal herbs. These warm poultices are gently pressed and massaged onto the body, combining heat and herbal benefits to promote relaxation, ease muscle tension, and enhance overall well-being.',
    duration: 60,
    price: 410,
    category: 'Massage'
  },
  {
    name: 'Thai Massage',
    description: 'Thai massage is a traditional healing art that combines acupressure, assisted yoga stretches, and energy work. Practiced on a floor mat, this therapeutic massage involves rhythmic compressions, joint mobilization, and gentle stretches. The recipient remains fully clothed, experiencing improved flexibility, stress relief, and a restored sense of balance.',
    duration: 60,
    price: 410,
    category: 'Massage'
  },
  {
    name: 'Reflexology',
    description: 'Reflexology massage is a specialized treatment that focuses on pressure points in the feet, hands, and sometimes ears, corresponding to specific organs and systems in the body. By applying targeted pressure and massage techniques to these reflex zones, the therapist aims to promote relaxation, alleviate tension, and stimulate the body\'s natural healing processes.',
    duration: 60,
    price: 410,
    category: 'Massage'
  },
  {
    name: 'Balinese Massage',
    description: 'Balinese massage is a luxurious and therapeutic spa treatment originating from Bali, Indonesia. It involves a combination of gentle stretches, acupressure, and aromatherapy using essential oils. The skilled therapist uses a variety of techniques to release tension, improve blood circulation, and promote a deep sense of relaxation.',
    duration: 60,
    price: 410,
    category: 'Massage'
  },
  {
    name: 'Hot Oil Massage',
    description: 'A hot oil massage is a deeply relaxing and therapeutic experience where warm, aromatic oils are generously applied to the body. The soothing combination of heat and carefully chosen oils helps to ease muscle tension, improve circulation, and create a sense of overall well-being.',
    duration: 60,
    price: 410,
    category: 'Massage'
  },
  {
    name: 'Deep Tissue Massage',
    description: 'Deep tissue massage is a targeted and intensive treatment that focuses on releasing chronic muscle tension and knots. The skilled therapist applies firm pressure and slow strokes to reach deeper layers of muscles and connective tissue. This technique helps break down adhesions and restore mobility.',
    duration: 60,
    price: 410,
    category: 'Massage'
  },
  {
    name: 'Lava Stone Massage',
    description: 'Hot stone massage is a soothing and luxurious therapy that incorporates heated stones into the massage technique. Smooth, heated stones are strategically placed on specific areas of the body and used by the therapist to apply gentle pressure and long, flowing strokes.',
    duration: 60,
    price: 410,
    category: 'Massage'
  },
  {
    name: 'Jet Lag Cure',
    description: 'A jet lag cure massage is a specialized treatment designed to alleviate the physical and mental effects of long-distance travel and time zone changes. Tailored to address fatigue, muscle stiffness, and disrupted sleep patterns, this rejuvenating massage incorporates techniques to stimulate circulation.',
    duration: 60,
    price: 410,
    category: 'Massage'
  },
  {
    name: 'Candle Massage',
    description: 'A candle massage is a unique and indulgent spa treatment where specially formulated candles, made from a blend of skin-nourishing oils and natural waxes, are melted to create a warm, aromatic massage oil. The therapist skillfully applies this warm, liquid candle wax to the body.',
    duration: 60,
    price: 410,
    category: 'Massage'
  },

  // Body Treatments
  {
    name: 'Pregnancy Massage',
    description: 'A pregnancy massage is a gentle and nurturing therapeutic session tailored specifically for expectant mothers. Skilled massage therapists use techniques designed to address the unique needs and discomforts associated with pregnancy. The massage typically involves positioning the mom-to-be for maximum comfort.',
    duration: 60,
    price: 610,
    category: 'Body Treatment'
  },
  {
    name: 'Slimming Treatment',
    description: 'A slimming massage is a therapeutic treatment focused on targeting areas of the body with excess fat or cellulite. Through a combination of specialized techniques such as kneading, friction, and lymphatic drainage, the massage aims to stimulate circulation, break down fat deposits.',
    duration: 60,
    price: 610,
    category: 'Body Treatment'
  },
  {
    name: 'Lymphatic Drainage Massage',
    description: 'A lymphatic drainage massage is a gentle and specialized technique aimed at promoting the natural circulation of the lymphatic system. Through rhythmic and precise movements, the therapist helps to stimulate lymphatic flow, encouraging the removal of toxins and excess fluids from the body.',
    duration: 60,
    price: 610,
    category: 'Body Treatment'
  },
  {
    name: 'Anti-Cellulite',
    description: 'An anti-cellulite massage is a targeted and vigorous treatment designed to address the appearance of cellulite on the skin. Using specialized techniques, the therapist applies firm pressure to break down fat deposits and improve blood circulation in the affected areas.',
    duration: 60,
    price: 610,
    category: 'Body Treatment'
  },

  // Oriental Baths
  {
    name: 'Moroccan Bath',
    description: 'A Moroccan bath, also known as a hammam, is a traditional spa experience inspired by Moroccan bathing rituals. It involves a multi-step cleansing and rejuvenation process. The ritual typically starts with relaxation in a steam room to open pores, followed by the application of black soap made from olives.',
    duration: 60,
    price: 410,
    category: 'Wellness'
  },

  // Facials
  {
    name: 'Anti-aging Facial',
    description: 'Revitalize your skin with our anti-aging facial treatment. This comprehensive treatment targets fine lines, wrinkles, and age spots using advanced techniques and premium products. Experience a more youthful, radiant complexion with this rejuvenating facial.',
    duration: 60,
    price: 410,
    category: 'Facial'
  },
  {
    name: 'Classic Facial',
    description: 'A basic facial treatment including cleansing, exfoliation, and moisturizing. Perfect for maintaining healthy, glowing skin with deep cleansing and hydration.',
    duration: 45,
    price: 350,
    category: 'Facial'
  },
  {
    name: 'Hydrating Facial',
    description: 'Intensive moisture treatment for dry and dehydrated skin. This facial replenishes lost moisture and restores skin\'s natural hydration balance.',
    duration: 45,
    price: 380,
    category: 'Facial'
  },
  {
    name: 'Brightening Facial',
    description: 'Treatment to even skin tone and reduce dark spots and hyperpigmentation. Achieve a brighter, more even complexion with this specialized facial.',
    duration: 60,
    price: 420,
    category: 'Facial'
  },

  // Additional Services
  {
    name: 'Manicure',
    description: 'Classic manicure including nail shaping, cuticle care, and polish. Perfect for well-groomed hands and beautiful nails.',
    duration: 30,
    price: 120,
    category: 'Nail Care'
  },
  {
    name: 'Pedicure',
    description: 'Relaxing pedicure with foot soak, exfoliation, and nail care. Treat your feet to a luxurious pampering session.',
    duration: 45,
    price: 180,
    category: 'Nail Care'
  },
  {
    name: 'Gel Manicure',
    description: 'Long-lasting gel polish manicure with extended wear. Enjoy beautiful, chip-resistant nails for weeks.',
    duration: 45,
    price: 150,
    category: 'Nail Care'
  },
  {
    name: 'Gel Pedicure',
    description: 'Long-lasting gel polish pedicure with extended wear. Perfect for summer sandals and special occasions.',
    duration: 60,
    price: 220,
    category: 'Nail Care'
  },

  // Wellness Services
  {
    name: 'Meditation Session',
    description: 'Guided meditation to reduce stress and promote mental clarity. Learn techniques for mindfulness and inner peace.',
    duration: 30,
    price: 150,
    category: 'Wellness'
  },
  {
    name: 'Yoga Session',
    description: 'Private yoga session tailored to your needs and experience level. Improve flexibility, strength, and mental well-being.',
    duration: 60,
    price: 200,
    category: 'Wellness'
  },

  // Special Packages
  {
    name: 'Spa Day Package',
    description: 'Complete spa experience including massage, facial, and body treatment. The ultimate relaxation package for a full day of pampering.',
    duration: 180,
    price: 800,
    category: 'Package'
  },
  {
    name: 'Couples Retreat',
    description: 'Romantic package for couples including massages and champagne. Perfect for celebrating special moments together.',
    duration: 120,
    price: 1200,
    category: 'Package'
  },
  {
    name: 'Wellness Package',
    description: 'Holistic wellness package including massage, meditation, and healthy refreshments. Nurture your mind, body, and spirit.',
    duration: 150,
    price: 900,
    category: 'Package'
  }
];

const seedServices = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ Connected to MongoDB');

    // Clear existing services (optional - remove if you want to keep existing)
    await Service.deleteMany({});
    console.log('🗑️  Cleared existing services');

    // Insert new services
    await Service.insertMany(services);
    console.log(`✅ Successfully seeded ${services.length} services!`);
    
    // Display summary by category
    const categories = [...new Set(services.map(service => service.category))];
    console.log('\n📊 Services by Category:');
    categories.forEach(category => {
      const count = services.filter(service => service.category === category).length;
      console.log(`   ${category}: ${count} services`);
    });

    await mongoose.connection.close();
    console.log('✅ Database connection closed');
    process.exit(0);
  } catch (err) {
    console.error('❌ Error seeding services:', err.message);
    await mongoose.connection.close();
    process.exit(1);
  }
};

seedServices();