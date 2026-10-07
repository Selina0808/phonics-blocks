// 测试这三个有问题的单词
const words = ['wrong', 'bring', 'centre'];

async function testWord(word, query) {
  try {
    const resp = await fetch('https://searchfree.site/api/search', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, include_images: true, max_results: 1 })
    });
    const data = await resp.json();
    const url = data.images?.[0]?.url;
    return { word, query, url: url || 'NO IMAGE', success: !!url };
  } catch (e) {
    return { word, query, url: 'ERROR', success: false };
  }
}

async function runTests() {
  const testCases = {
    'wrong': ['wrong answer red cross', 'red X wrong', 'cross mark wrong'],
    'bring': ['hand carrying box', 'person bringing items', 'carrying objects'],
    'centre': ['center of circle', 'bullseye target', 'center point']
  };
  
  for (const [word, queries] of Object.entries(testCases)) {
    console.log(`\n--- ${word} ---`);
    for (const query of queries) {
      const result = await testWord(word, query);
      console.log(`  ${result.success ? '✓' : '✗'} "${query}" → ${result.url.substring(0, 70)}`);
      await new Promise(r => setTimeout(r, 200));
    }
  }
}

runTests().catch(console.error);
