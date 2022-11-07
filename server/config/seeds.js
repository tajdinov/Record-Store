const db = require('./connection');
const { User, Product, Category, Thought } = require('../models');
const thoughtSeeds = require('./thoughtSeeds.json');

db.once('open', async () => {
  await Category.deleteMany();

  const categories = await Category.insertMany([
    { name: 'Disco' },
    { name: 'Jazz' },
    { name: 'Rock' },
    { name: 'Hip Hop' },
    { name: 'Pop' },
    { name: 'Electronic' },
    { name: 'Dub' }
  ]);

  console.log('categories seeded');

  await Product.deleteMany();

  const products = await Product.insertMany([
    {
      name: 'I AM IN LOVE - CELA',
      description:
        'Limited edition of a great pre-80s Italian disco production with massive funky basslines and great vocals produced by Marty Celay and Robert Drake.',
      image: 'celo.jpeg',
      category: categories[0]._id,
      price: 28.00,
      quantity: 3
    },
    {
      name: 'GIVE UP - NEDDY SMITH',
      description:
        '"Give It Up" is one of the best classic boogie and soul funk song, very rare and sought after coming from the legendary Delirium Records.',
      image: 'neddy.jpeg',
      category: categories[0]._id,
      price: 30.00,
      quantity: 2
    },
    {
      name: 'FOR YOU - PRINCE',
      category: categories[0]._id,
      description:
        '"Every time you go into the recording booth, you have to play like this is your only shot.” —Prince, 1978',
      image: 'prince.jpeg',
      price: 46.00,
      quantity: 0
    },
    {
      name: 'WHAT COLOR IS LOVE - TERRY CALLIER',
      category: categories[1]._id,
      description:
        'Like the artist himself, the music on this brilliant album defies all categories, embracing Terry Calliercas wide range of influences and experiences.',
      image: 'callier.jpeg',
      price: 45.00,
      quantity: 5
    },
    {
      name: 'TURN THIS MUTHA OUT - IDRIS MUHAMMAD',
      category: categories[1]._id,
      description:
        'Accompanied by Hiram Bullock (guitar), Cliff Carter (keyboards), Wilber Bascomb (bass), Jeremy Steig (flute), and others, Idris Muhammad ventures into the world of pop and R&B, annoying die-hard jazz fans.idris',
      image: 'idris.jpeg',
      price: 35.00,
      quantity: 2
    },
    {
      name: 'THERE IS A RIOT GOING ON - SLY AND THE FAMILY STONE',
      category: categories[2]._id,
      description:
        'Limited edition 50th anniversary coloured vinyl.',
      image: 'riot.jpeg',
      price: 48.00,
      quantity: 3
    },
    {
      name: 'TALES OF KID FUNKADELIC - FUNKADELIC',
      category: categories[2]._id,
      description:
        'Tales of Kidd Funkadelic is the eighth studio album by the band Funkadelic, released in September 1976 on the Westbound record label.',
      image: 'tales.jpeg',
      price: 43.00,
      quantity: 1
    },
    {
      name: 'KINGS DISEASE II - NAS',
      category: categories[3]._id,
      description:
        'Double vinyl LP pressing.',
      image: 'nas.jpeg',
      price: 55.00,
      quantity: 1
    },
    {
      name: 'LOUD - RIHANNA',
      category: categories[3]._id,
      description: 'Double vinyl LP pressing in gatefold jacket.',
      image: 'loud.jpeg',
      price: 60.00,
      quantity: 0
    },
    {
      name: 'SPECIAL - LIZZO',
      category: categories[4]._id,
      description:
        '2022 release, the fourth album from the singer and rapper.',
      image: 'lizzo.jpeg',
      price: 52.00,
      quantity: 80
    },
    {
      name: 'HOT PINK - DOJA CAT',
      category: categories[4]._id,
      description:
        'Limited edition pink vinyl. Second studio album by American singer and rapper.',
      image: 'doja.jpeg',
      price: 50.00,
      quantity: 60
    }
  ]);

  console.log('products seeded');

  await User.deleteMany();

  await User.create([
    {
      firstName: 'Pamela',
      lastName: "Washington",
      email: "pamela@testmail.com",
      password: "password12345"
    },
    {
      firstName: "Troy",
      lastName: "Smith",
      email: "troy@testmail.com",
      password: "password12345"
    },
    {
      firstName: "Fred",
      lastName: "Little",
      email: "fred@testmail.com",
      password: "password12345"
    },
    {
      firstName: "Derek",
      lastName: "Lang",
      email: "derek@testmail.com",
      password: "password12345"
    },
    {
      firstName: "Leo",
      lastName: "Silva",
      email: "leo@testmail.com",
      password: "password12345"
    },
    {
      firstName: "Jake",
      lastName: "Clay",
      email: "jake@testmail.com",
      password: "password12345"
    },
    {
      firstName: "Charlie",
      lastName: "Brooks",
      email: "charlie@testmail.com",
      password: "password12345"
    },
    {
      firstName: "Guy",
      lastName: "Tan",
      email: "guy@testmail.com",
      password: "password12345"
    },
    {
      firstName: "Em",
      lastName: "Lea",
      email: "em@testmail.com",
      password: "password12345"
    },
    {
      firstName: "Molly",
      lastName: "O'Harry",
      email: "molly@testmail.com",
      password: "password12345"
    },
    {
      firstName: "Liza",
      lastName: "Bright",
      email: "liza@testmail.com",
      password: "password12345"
    }
  ])

  console.log('users seeded');

  await Thought.deleteMany();

  for (let i = 0; i < thoughtSeeds.length; i++) {
    const { _id, thoughtAuthor } = await Thought.create(thoughtSeeds[i]);
    const user = await User.findOneAndUpdate(
      { firstName: thoughtAuthor },
      {
        $addToSet: {
          thoughts: _id,
        },
      }
    );
  }
  

  console.log('thoughts seeded');

  process.exit();
});
