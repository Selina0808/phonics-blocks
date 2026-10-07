// 全面测试所有单词，为每个单词找到能用的搜索词
const allWords = [
  // Jack and the penguins
  'penguin', 'dolphin', 'shark', 'bat', 'kangaroo', 'zebra', 'elephant',
  'feed', 'wash', 'hungry', 'thirsty', 'carefully', 'waterfall', 'zoo',
  'pie', 'milkshake', 'sandwich', 'cheese', 'lemonade', 'fruit juice', 'water', 'fish',
  'wrong', 'bring', 'centre', 'many', 'enjoy',
  
  // Our funny home
  'animal', 'armchair', 'baby', 'balloon', 'bath', 'bathroom', 'bed', 'bedroom',
  'bird', 'boat', 'book', 'bookcase', 'box', 'boy', 'cake', 'cat', 'chair',
  'child', 'clock', 'colour', 'crocodile', 'cupboard', 'dad', 'desk',
  'dining room', 'donkey', 'door', 'duck', 'face', 'family',
  'flat', 'flower', 'football', 'fries', 'frog', 'game', 'garden',
  'grandfather', 'grandma', 'grandmother', 'grandpa', 'hall', 'hand', 'hat',
  'head', 'hippo', 'home', 'house', 'kitchen', 'lamp', 'living room',
  'lizard', 'mat', 'mirror', 'mother', 'mum', 'number', 'orange',
  'painting', 'pen', 'pencil', 'pet', 'piano', 'radio', 'rug', 'shoe',
  'snake', 'sock', 'sofa', 'story', 'sweets', 'table', 'teeth', 'today',
  'toy', 'tree', 'trousers', 'tv', 'wall', 'water', 'window', 'zoo'
];

// 为每个单词准备多个搜索词备选
const searchOptions = {
  'penguin': ['penguin bird', 'emperor penguin'],
  'dolphin': ['dolphin ocean', 'dolphin marine'],
  'shark': ['shark ocean', 'shark fish'],
  'bat': ['bat animal', 'bat flying'],
  'kangaroo': ['kangaroo australia', 'kangaroo animal'],
  'zebra': ['zebra africa', 'zebra stripes'],
  'elephant': ['elephant animal', 'elephant africa'],
  'feed': ['feeding animal', 'person feeding'],
  'wash': ['washing hands', 'washing soap'],
  'hungry': ['hungry person', 'child eating'],
  'thirsty': ['thirsty person', 'drinking water'],
  'carefully': ['child reading carefully', 'person careful'],
  'waterfall': ['waterfall nature', 'waterfall scenic'],
  'zoo': ['zoo entrance', 'zoo animals'],
  'pie': ['pie food', 'apple pie'],
  'milkshake': ['milkshake drink', 'colorful milkshake'],
  'sandwich': ['sandwich food', 'club sandwich'],
  'cheese': ['cheese food', 'cheddar cheese'],
  'lemonade': ['lemonade drink', 'glass lemonade'],
  'fruit juice': ['fruit juice glass', 'juice drink'],
  'water': ['water glass', 'drinking water'],
  'fish': ['fish food', 'cooked fish'],
  'wrong': ['wrong red cross', 'red X wrong'],
  'bring': ['carrying box', 'person bringing'],
  'centre': ['center target', 'bullseye center'],
  'many': ['pile of items', 'collection many'],
  'enjoy': ['happy person', 'smiling enjoyment'],
  
  'animal': ['animal nature', 'wild animal'],
  'armchair': ['armchair furniture', 'cozy armchair'],
  'baby': ['baby cute', 'baby smiling'],
  'balloon': ['balloon colorful', 'party balloon'],
  'bath': ['bathtub', 'bath bathroom'],
  'bathroom': ['bathroom modern', 'bathroom shower'],
  'bed': ['bed bedroom', 'comfortable bed'],
  'bedroom': ['bedroom interior', 'cozy bedroom'],
  'bird': ['bird colorful', 'songbird'],
  'boat': ['boat water', 'sailboat'],
  'book': ['open book', 'reading book'],
  'bookcase': ['bookshelf', 'bookcase furniture'],
  'box': ['cardboard box', 'storage box'],
  'boy': ['young boy', 'boy child'],
  'cake': ['birthday cake', 'chocolate cake'],
  'cat': ['cute cat', 'kitten'],
  'chair': ['chair furniture', 'wooden chair'],
  'child': ['happy child', 'child playing'],
  'clock': ['wall clock', 'clock time'],
  'colour': ['colorful', 'rainbow colors'],
  'crocodile': ['crocodile', 'crocodile animal'],
  'cupboard': ['kitchen cupboard', 'wooden cupboard'],
  'dad': ['father', 'dad family'],
  'desk': ['desk furniture', 'office desk'],
  'dining room': ['dining room', 'dining table'],
  'donkey': ['donkey', 'donkey animal'],
  'door': ['door', 'house door'],
  'duck': ['duck', 'duck bird'],
  'face': ['human face', 'face portrait'],
  'family': ['family together', 'family photo'],
  'flat': ['apartment', 'flat building'],
  'flower': ['flower garden', 'beautiful flower'],
  'football': ['soccer ball', 'football'],
  'fries': ['french fries', 'fries food'],
  'frog': ['frog', 'frog animal'],
  'game': ['game fun', 'board game'],
  'garden': ['garden flowers', 'beautiful garden'],
  'grandfather': ['grandfather', 'grandpa'],
  'grandma': ['grandma', 'grandmother'],
  'grandmother': ['grandmother', 'grandma'],
  'grandpa': ['grandpa', 'grandfather'],
  'hall': ['hallway', 'home hall'],
  'hand': ['human hand', 'hand gesture'],
  'hat': ['hat', 'wearing hat'],
  'head': ['human head', 'head portrait'],
  'hippo': ['hippo', 'hippopotamus'],
  'home': ['house', 'home sweet home'],
  'house': ['house exterior', 'family house'],
  'kitchen': ['kitchen', 'modern kitchen'],
  'lamp': ['lamp', 'table lamp'],
  'living room': ['living room', 'cozy living room'],
  'lizard': ['lizard', 'lizard reptile'],
  'mat': ['floor mat', 'door mat'],
  'mirror': ['mirror', 'wall mirror'],
  'mother': ['mother', 'mom child'],
  'mum': ['mum', 'mother'],
  'number': ['numbers', 'number count'],
  'orange': ['orange fruit', 'fresh orange'],
  'painting': ['painting', 'art painting'],
  'pen': ['pen', 'writing pen'],
  'pencil': ['pencil', 'colored pencils'],
  'pet': ['pet animal', 'dog cat'],
  'piano': ['piano', 'piano keys'],
  'radio': ['radio', 'old radio'],
  'rug': ['rug', 'carpet rug'],
  'shoe': ['shoe', 'sneakers'],
  'snake': ['snake', 'snake animal'],
  'sock': ['sock', 'socks pair'],
  'sofa': ['sofa', 'couch sofa'],
  'story': ['story book', 'storytelling'],
  'sweets': ['sweets', 'candy sweets'],
  'table': ['table', 'dining table'],
  'teeth': ['teeth smile', 'white teeth'],
  'today': ['calendar today', 'today date'],
  'toy': ['toy', 'children toy'],
  'tree': ['tree', 'big tree'],
  'trousers': ['pants', 'trousers clothing'],
  'tv': ['television', 'tv screen'],
  'wall': ['wall', 'painted wall'],
  'water': ['water', 'glass water'],
  'window': ['window', 'house window']
};

async function testQuery(query) {
  try {
    const resp = await fetch('https://searchfree.site/api/search', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, include_images: true, max_results: 1 })
    });
    const data = await resp.json();
    const url = data.images?.[0]?.url;
    return { query, url: url || null, success: !!url };
  } catch (e) {
    return { query, url: null, success: false };
  }
}

async function findWorkingQuery(word) {
  const options = searchOptions[word] || [word];
  for (const query of options) {
    const result = await testQuery(query);
    if (result.success) {
      return { word, bestQuery: query, url: result.url };
    }
    await new Promise(r => setTimeout(r, 100));
  }
  return { word, bestQuery: options[0], url: null };
}

async function runTests() {
  console.log('=== Finding best queries for ALL words ===\n');
  const results = [];
  const failed = [];
  
  for (const word of allWords) {
    const result = await findWorkingQuery(word);
    results.push(result);
    if (result.url) {
      console.log(`✓ ${word} → "${result.bestQuery}"`);
    } else {
      console.log(`✗ ${word} → FAILED`);
      failed.push(word);
    }
    await new Promise(r => setTimeout(r, 150));
  }
  
  console.log(`\n=== Summary ===`);
  console.log(`Total: ${results.length}, Success: ${results.length - failed.length}, Failed: ${failed.length}`);
  
  // 输出可用的SEARCH_QUERY_MAP
  console.log('\n=== SEARCH_QUERY_MAP entries ===');
  console.log('const SEARCH_QUERY_MAP = {');
  for (const r of results) {
    if (r.url && r.bestQuery !== r.word) {
      console.log(`  '${r.word}': '${r.bestQuery}',`);
    }
  }
  console.log('};');
}

runTests().catch(console.error);
