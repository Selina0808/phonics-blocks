/**
 * 牛津自然拼读规则数据库
 * Based on Oxford Phonics World rules from FlowUs
 */

const PHONICS_RULES = {
    // Silent letters (check first - these override other rules)
    silentLetters: [
        { pattern: /^kn/, replacement: 'n', description: 'k不发音' },
        { pattern: /^wr/, replacement: 'r', description: 'w不发音' },
        { pattern: /mb$/, replacement: 'm', description: 'b不发音' },
        { pattern: /^rh/, replacement: 'r', description: 'h不发音' },
        { pattern: /st$/, replacement: 's', description: 't不发音' }
    ],

    // Consonant digraphs (two letters, one sound)
    consonantDigraphs: [
        { pattern: /^sh/, sound: '/ʃ/', description: 'sh音' },
        { pattern: /^ch/, sound: '/tʃ/', description: 'ch音' },
        { pattern: /^th/, sound: '/θ/', description: '清th音' },
        { pattern: /^ph/, sound: '/f/', description: 'ph音' },
        { pattern: /^wh/, sound: '/w/', description: 'wh音' },
        { pattern: /ck$/, sound: '/k/', description: 'ck音' },
        { pattern: /ng$/, sound: '/ŋ/', description: 'ng音' },
        { pattern: /nk$/, sound: '/ŋk/', description: 'nk音' },
        { pattern: /^qu/, sound: '/kw/', description: 'qu音' },
        { pattern: /tch$/, sound: '/tʃ/', description: 'tch音' }
    ],

    // Consonant blends (two or three consonants, each pronounced)
    consonantBlends: [
        // Initial blends
        { pattern: /^bl/, sounds: ['b', 'l'], position: 'initial' },
        { pattern: /^cl/, sounds: ['c', 'l'], position: 'initial' },
        { pattern: /^fl/, sounds: ['f', 'l'], position: 'initial' },
        { pattern: /^gl/, sounds: ['g', 'l'], position: 'initial' },
        { pattern: /^pl/, sounds: ['p', 'l'], position: 'initial' },
        { pattern: /^sl/, sounds: ['s', 'l'], position: 'initial' },
        { pattern: /^br/, sounds: ['b', 'r'], position: 'initial' },
        { pattern: /^cr/, sounds: ['c', 'r'], position: 'initial' },
        { pattern: /^dr/, sounds: ['d', 'r'], position: 'initial' },
        { pattern: /^fr/, sounds: ['f', 'r'], position: 'initial' },
        { pattern: /^gr/, sounds: ['g', 'r'], position: 'initial' },
        { pattern: /^pr/, sounds: ['p', 'r'], position: 'initial' },
        { pattern: /^tr/, sounds: ['t', 'r'], position: 'initial' },
        { pattern: /^st/, sounds: ['s', 't'], position: 'initial' },
        { pattern: /^sp/, sounds: ['s', 'p'], position: 'initial' },
        { pattern: /^sk/, sounds: ['s', 'k'], position: 'initial' },
        { pattern: /^sm/, sounds: ['s', 'm'], position: 'initial' },
        { pattern: /^sn/, sounds: ['s', 'n'], position: 'initial' },
        { pattern: /^sw/, sounds: ['s', 'w'], position: 'initial' },
        // Final blends
        { pattern: /nd$/, sounds: ['n', 'd'], position: 'final' },
        { pattern: /nt$/, sounds: ['n', 't'], position: 'final' },
        { pattern: /lt$/, sounds: ['l', 't'], position: 'final' },
        { pattern: /mp$/, sounds: ['m', 'p'], position: 'final' }
    ],

    // R-controlled vowels
    rControlledVowels: [
        { pattern: /ar/, sound: '/ɑː/', description: 'car音' },
        { pattern: /er/, sound: '/ɜː/', description: 'her音' },
        { pattern: /ir/, sound: '/ɜː/', description: 'girl音' },
        { pattern: /or/, sound: '/ɔː/', description: 'for音' },
        { pattern: /ur/, sound: '/ɜː/', description: 'turn音' }
    ],

    // Long vowel patterns (Magic E)
    magicE: [
        { pattern: /a_e/, sound: '/eɪ/', description: 'long a' },
        { pattern: /i_e/, sound: '/aɪ/', description: 'long i' },
        { pattern: /o_e/, sound: '/əʊ/', description: 'long o' },
        { pattern: /u_e/, sound: '/juː/', description: 'long u' }
    ],

    // Vowel teams (two vowels, one sound)
    vowelTeams: [
        // Long a
        { pattern: /ai/, sound: '/eɪ/', position: 'medial' },
        { pattern: /ay/, sound: '/eɪ/', position: 'final' },
        // Long e
        { pattern: /ee/, sound: '/iː/' },
        { pattern: /ea/, sound: '/iː/' },
        { pattern: /ey/, sound: '/iː/', position: 'final' },
        // Long i
        { pattern: /igh/, sound: '/aɪ/' },
        { pattern: /ie/, sound: '/aɪ/' },
        // Long o
        { pattern: /oa/, sound: '/əʊ/' },
        { pattern: /ow/, sound: '/əʊ/' },
        // Long u
        { pattern: /ue/, sound: '/uː/' },
        { pattern: /ui/, sound: '/uː/' },
        { pattern: /oo/, sound: '/uː/' },
        { pattern: /ew/, sound: '/juː/' },
        // Other vowel combinations
        { pattern: /ou/, sound: '/aʊ/' },
        { pattern: /oi/, sound: '/ɔɪ/' },
        { pattern: /oy/, sound: '/ɔɪ/' },
        { pattern: /au/, sound: '/ɔː/' },
        { pattern: /aw/, sound: '/ɔː/' },
        { pattern: /all/, sound: '/ɔː/' },
        // Special cases
        { pattern: /ea/, sound: '/e/', note: 'bread' },
        { pattern: /ear/, sound: '/ɪə/' },
        { pattern: /eer/, sound: '/ɪə/' },
        { pattern: /eə/, sound: '/eə/' }
    ],

    // Short vowel sounds (for closed syllables)
    shortVowels: {
        'a': '/æ/',
        'e': '/e/',
        'i': '/ɪ/',
        'o': '/ɒ/',
        'u': '/ʌ/'
    },

    // Consonant sounds
    consonants: {
        'b': '/b/',
        'c': '/k/',
        'd': '/d/',
        'f': '/f/',
        'g': '/ɡ/',
        'h': '/h/',
        'j': '/dʒ/',
        'k': '/k/',
        'l': '/l/',
        'm': '/m/',
        'n': '/n/',
        'p': '/p/',
        'r': '/r/',
        's': '/s/',
        't': '/t/',
        'v': '/v/',
        'w': '/w/',
        'x': '/ks/',
        'y': '/j/',
        'z': '/z/'
    },

    // Special rules
    specialRules: [
        { pattern: /c(?!e|i|y)/, sound: '/k/', description: 'c在a,o,u前发/k/' },
        { pattern: /c(e|i|y)/, sound: '/s/', description: 'c在e,i,y前发/s/' },
        { pattern: /g(?!e|i|y)/, sound: '/ɡ/', description: 'g在a,o,u前发/ɡ/' },
        { pattern: /g(e|i|y)/, sound: '/dʒ/', description: 'g在e,i,y前发/dʒ/' },
        { pattern: /y$/, sound: '/i/', description: 'y在词尾发/i/' },
        { pattern: /y(?=[^aeiou])$/, sound: '/aɪ/', description: 'y在辅音后发/aɪ/' }
    ]
};

// Export for use in main application
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PHONICS_RULES;
}
