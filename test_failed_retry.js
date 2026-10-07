// 专门测试失败的16个单词，用不同的搜索词
const failedWords = {
  'pie': ['pie', 'food pie', 'pizza pie'],
  'milkshake': ['milkshake', 'drink milkshake', 'smoothie'],
  'sandwich': ['sandwich', 'food sandwich', 'sub sandwich'],
  'cheese': ['cheese', 'food cheese', 'cheese wedge'],
  'lemonade': ['lemonade', 'drink lemonade', 'lemon drink'],
  'fruit juice': ['juice', 'fruit juice', 'orange juice'],
  'water': ['water', 'glass water', 'water bottle'],
  'fish': ['fish', 'food fish', 'cooked fish'],
  'wrong': ['wrong', 'red cross', 'wrong answer'],
  'bring': ['bring', 'carrying', 'hand carrying'],
  'centre': ['center', 'center point', 'bullseye'],
  'grandma': ['grandma', 'grandmother', 'elderly woman'],
  'grandmother': ['grandmother', 'grandma', 'old woman'],
  'window': ['window', 'house window', 'window pane'],
  'zoo': ['zoo', 'zoo entrance', 'zoo gate']
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

async function runTests() {
  console.log('=== Testing failed words with alternative queries ===\n');
  const results = {};
  
  for (const [word, queries] of Object.entries(failedWords)) {
    console.log(`\n--- ${word} ---`);
    let found = false;
    for (const query of queries) {
      const result = await testQuery(query);
      console.log(`  ${result.success ? '✓' : '✗'} "${query}"`);
      if (result.success && !found) {
        results[word] = query;
        found = true;
      }
      await new Promise(r => setTimeout(r, 200));
    }
    if (!found) {
      results[word] = queries[0]; // 使用第一个作为备选
      console.log(`  → Using fallback: "${queries[0]}"`);
    }
  }
  
  console.log('\n=== Final SEARCH_QUERY_MAP entries ===');
  for (const [word, query] of Object.entries(results)) {
    console.log(`  '${word}': '${query}',`);
  }
}

runTests().catch(console.error);
