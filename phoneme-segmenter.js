/**
 * 改进版 - 音素分词器 v3
 * 修正了Magic E、辅音二合字母、元音组合的匹配
 */

const PHONICS_RULES = {
    // 辅音二合字母（两个或三个字母，一个音）
    consonantDigraphs: [
        // 三个字母优先
        { pattern: /^tch/, sound: 'tch', description: 'tch音 /tʃ/' },
        // 两个字母
        { pattern: /^sh/, sound: 'sh', description: 'sh音 /ʃ/' },
        { pattern: /^ch/, sound: 'ch', description: 'ch音 /tʃ/' },
        { pattern: /^th/, sound: 'th', description: 'th音 /θ/' },
        { pattern: /^ph/, sound: 'ph', description: 'ph音 /f/' },
        { pattern: /^wh/, sound: 'wh', description: 'wh音 /w/' },
        { pattern: /^ck/, sound: 'ck', description: 'ck音 /k/' },
        { pattern: /^ng/, sound: 'ng', description: 'ng音 /ŋ/' },
        { pattern: /^qu/, sound: 'qu', description: 'qu音 /kw/' }
    ],
    
    // 辅音连缀（两个或三个辅音，各自发音）
    consonantBlends: [
        // 三个字母的连缀（优先匹配）
        { pattern: /^str/, sounds: ['s', 't', 'r'], position: 'initial' },
        { pattern: /^spr/, sounds: ['s', 'p', 'r'], position: 'initial' },
        { pattern: /^scr/, sounds: ['s', 'c', 'r'], position: 'initial' },
        { pattern: /^shr/, sounds: ['s', 'h', 'r'], position: 'initial' },
        { pattern: /^thr/, sounds: ['t', 'h', 'r'], position: 'initial' },
        { pattern: /^nch/, sounds: ['n', 'ch'], position: 'initial' }, // 特殊：lunch中的nch
        // 两个字母的连缀
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
        { pattern: /^tw/, sounds: ['t', 'w'], position: 'initial' },
        { pattern: /^dw/, sounds: ['d', 'w'], position: 'initial' },
        // 词尾连缀
        { pattern: /nd$/, sounds: ['n', 'd'], position: 'final' },
        { pattern: /nt$/, sounds: ['n', 't'], position: 'final' },
        { pattern: /lt$/, sounds: ['l', 't'], position: 'final' },
        { pattern: /mp$/, sounds: ['m', 'p'], position: 'final' },
        { pattern: /ft$/, sounds: ['f', 't'], position: 'final' },
        { pattern: /ld$/, sounds: ['l', 'd'], position: 'final' },
        { pattern: /lk$/, sounds: ['l', 'k'], position: 'final' },
        { pattern: /nk$/, sounds: ['n', 'k'], position: 'final' },
        { pattern: /sk$/, sounds: ['s', 'k'], position: 'final' },
        { pattern: /pt$/, sounds: ['p', 't'], position: 'final' }
    ],
    
    // R控制元音
    rControlledVowels: [
        { pattern: /^ear/, sound: 'ear', description: 'ear音 /ɪə/' },
        { pattern: /^eə/, sound: 'eə', description: 'eə音 /eə/' },
        { pattern: /^eer/, sound: 'eer', description: 'eer音 /ɪə/' },
        { pattern: /^oor/, sound: 'oor', description: 'oor音 /ɔː/' },
        { pattern: /^air/, sound: 'air', description: 'air音 /eə/' },
        { pattern: /^are/, sound: 'are', description: 'are音 /eə/' },
        { pattern: /^ar/, sound: 'ar', description: 'ar音 /ɑː/' },
        { pattern: /^er/, sound: 'er', description: 'er音 /ɜː/' },
        { pattern: /^ir/, sound: 'ir', description: 'ir音 /ɜː/' },
        { pattern: /^or/, sound: 'or', description: 'or音 /ɔː/' },
        { pattern: /^ur/, sound: 'ur', description: 'ur音 /ɜː/' }
    ],
    
    // 元音组合（两个或三个字母，一个音）
    vowelTeams: [
        // 四个字母的组合（最高优先）
        { pattern: /^eigh/, sound: 'eigh', description: 'eigh音 /eɪ/' },
        // 三个字母的组合（优先）
        { pattern: /^igh/, sound: 'igh', description: 'igh音 /aɪ/' },
        // 两个字母的组合
        { pattern: /^ai/, sound: 'ai', description: 'ai音 /eɪ/' },
        { pattern: /^ay/, sound: 'ay', description: 'ay音 /eɪ/' },
        { pattern: /^ee/, sound: 'ee', description: 'ee音 /iː/' },
        { pattern: /^ea/, sound: 'ea', description: 'ea音 /iː/' },
        { pattern: /^ey/, sound: 'ey', description: 'ey音 /iː/' },
        { pattern: /^ie/, sound: 'ie', description: 'ie音 /aɪ/' },
        { pattern: /^oa/, sound: 'oa', description: 'oa音 /əʊ/' },
        { pattern: /^ow/, sound: 'ow', description: 'ow音 /əʊ/' },
        { pattern: /^ue/, sound: 'ue', description: 'ue音 /uː/' },
        { pattern: /^ui/, sound: 'ui', description: 'ui音 /uː/' },
        { pattern: /^oo/, sound: 'oo', description: 'oo音 /uː/' },
        { pattern: /^ew/, sound: 'ew', description: 'ew音 /juː/' },
        { pattern: /^ou/, sound: 'ou', description: 'ou音 /aʊ/' },
        { pattern: /^oi/, sound: 'oi', description: 'oi音 /ɔɪ/' },
        { pattern: /^oy/, sound: 'oy', description: 'oy音 /ɔɪ/' },
        { pattern: /^au/, sound: 'au', description: 'au音 /ɔː/' },
        { pattern: /^aw/, sound: 'aw', description: 'aw音 /ɔː/' },
        { pattern: /^all/, sound: 'all', description: 'all音 /ɔːl/' }
    ],
    
    // 不发音字母
    silentLetters: [
        { pattern: /^kn/, description: 'k不发音, 只发n' },
        { pattern: /^wr/, description: 'w不发音, 只发r' },
        { pattern: /^gn/, description: 'g不发音, 只发n' },
        { pattern: /mb$/, description: 'b不发音, 只发m' },
        { pattern: /lm$/, description: 'l不发音' }
    ],
    
    // 短元音（闭音节）
    shortVowels: {
        'a': { sound: 'a', description: '短元音 /æ/' },
        'e': { sound: 'e', description: '短元音 /e/' },
        'i': { sound: 'i', description: '短元音 /ɪ/' },
        'o': { sound: 'o', description: '短元音 /ɒ/' },
        'u': { sound: 'u', description: '短元音 /ʌ/' }
    },
    
    // 长元音
    longVowels: {
        'a': { sound: 'ā', description: '长元音 /eɪ/' },
        'e': { sound: 'ē', description: '长元音 /iː/' },
        'i': { sound: 'ī', description: '长元音 /aɪ/' },
        'o': { sound: 'ō', description: '长元音 /əʊ/' },
        'u': { sound: 'ū', description: '长元音 /juː/' }
    },
    
    // 辅音
    consonants: {
        'b': { sound: 'b', description: '辅音 /b/' },
        'c': { sound: 'c', description: '辅音 /k/ 或 /s/' },
        'd': { sound: 'd', description: '辅音 /d/' },
        'f': { sound: 'f', description: '辅音 /f/' },
        'g': { sound: 'g', description: '辅音 /ɡ/ 或 /dʒ/' },
        'h': { sound: 'h', description: '辅音 /h/' },
        'j': { sound: 'j', description: '辅音 /dʒ/' },
        'k': { sound: 'k', description: '辅音 /k/' },
        'l': { sound: 'l', description: '辅音 /l/' },
        'm': { sound: 'm', description: '辅音 /m/' },
        'n': { sound: 'n', description: '辅音 /n/' },
        'p': { sound: 'p', description: '辅音 /p/' },
        'r': { sound: 'r', description: '辅音 /r/' },
        's': { sound: 's', description: '辅音 /s/' },
        't': { sound: 't', description: '辅音 /t/' },
        'v': { sound: 'v', description: '辅音 /v/' },
        'w': { sound: 'w', description: '辅音 /w/' },
        'x': { sound: 'x', description: '辅音 /ks/' },
        'y': { sound: 'y', description: '辅音 /j/ 或元音' },
        'z': { sound: 'z', description: '辅音 /z/' }
    },
    
    // g的例外情况（发硬g）
    gExceptions: ['get', 'give', 'girl', 'gift', 'gig', 'gold', 'good', 'gone', 'got', 'gap', 'gas', 'get', 'ghost', 'gift', 'gild', 'gill', 'gilt', 'gist']
};

class PhonemeSegmenter {
    constructor() {
        this.rules = PHONICS_RULES;
    }
    
    /**
     * 将单词分割为音素
     */
    segment(word) {
        word = word.toLowerCase().trim();
        const result = [];
        let pos = 0;
        
        while (pos < word.length) {
            const remaining = word.substring(pos);
            
            // 特殊处理：sch组合（school, scholar等）- h不发音
            if (remaining.startsWith('sch')) {
                // 添加s
                result.push({ type: 'consonant', letters: 's', sound: 's', description: '辅音 /s/', length: 1 });
                pos++;
                // 添加c（硬音，因为后面是o）
                result.push({ type: 'consonant', letters: 'c', sound: 'k', description: 'c在sch中发 /k/', length: 1 });
                pos++;
                // 跳过h（不发音）
                result.push({ type: 'silent', letters: 'h', sound: '', description: 'sch中h不发音', length: 1 });
                pos++;
                continue;
            }
            
            // 1. 检查不发音字母
            const silentMatch = this.matchSilent(remaining, pos, word);
            if (silentMatch) {
                result.push(silentMatch);
                pos += silentMatch.length;
                continue;
            }
            
            // 2. 检查辅音二合字母
            const digraphMatch = this.matchDigraph(remaining, pos, word);
            if (digraphMatch) {
                result.push(digraphMatch);
                pos += digraphMatch.length;
                continue;
            }
            
            // 3. 检查辅音连缀
            const blendMatch = this.matchBlend(remaining, pos, word.length);
            if (blendMatch) {
                result.push(blendMatch);
                pos += blendMatch.length;
                continue;
            }
            
            // 4. 检查R控制元音
            const rMatch = this.matchRControlled(remaining);
            if (rMatch) {
                result.push(rMatch);
                pos += rMatch.length;
                continue;
            }
            
            // 5. 检查元音组合
            const teamMatch = this.matchVowelTeam(remaining);
            if (teamMatch) {
                result.push(teamMatch);
                pos += teamMatch.length;
                continue;
            }
            
            // 6. 检查Magic E模式（元音+辅音+静音e）
            const magicResult = this.matchMagicEFull(remaining, pos, word.length, word);
            if (magicResult) {
                result.push(...magicResult);
                pos += magicResult.reduce((sum, p) => sum + p.length, 0);
                continue;
            }
            
            // 7. 单个字母
            const singleMatch = this.matchSingle(remaining, pos, word.length, word);
            if (singleMatch) {
                result.push(singleMatch);
                pos += singleMatch.length;
                continue;
            }
            
            pos++;
        }
        
        return result;
    }
    
    matchSilent(str, pos, word) {
        for (const rule of this.rules.silentLetters) {
            const match = str.match(rule.pattern);
            if (match && match.index === 0) {
                // 检查位置限制
                if (rule.pattern.source === '^kn' && pos !== 0) continue;
                if (rule.pattern.source === '^wr' && pos !== 0) continue;
                if (rule.pattern.source === '^gn' && pos !== 0) continue;
                if (rule.pattern.source === 'mb$' && pos + match[0].length !== word.length) continue;
                if (rule.pattern.source === 'lm$' && pos + match[0].length !== word.length) continue;
                
                return {
                    type: 'silent',
                    letters: match[0],
                    sound: '',
                    description: rule.description,
                    length: match[0].length
                };
            }
        }
        return null;
    }
    
    matchDigraph(str, pos, word) {
        for (const rule of this.rules.consonantDigraphs) {
            const match = str.match(rule.pattern);
            if (match && match.index === 0) {
                // 特殊处理：sch中的ch不是二合字母，而是s + c(硬音) + h
                // 当ch出现在pos=1且前面是s时（即word[pos-1]='s'），跳过ch二合字母
                if (rule.pattern.source === '^ch' && pos > 0 && word[pos - 1] === 's') {
                    continue;
                }
                return {
                    type: 'digraph',
                    letters: match[0],
                    sound: rule.sound,
                    description: rule.description,
                    length: match[0].length
                };
            }
        }
        return null;
    }
    
    matchBlend(str, pos, wordLen) {
        for (const rule of this.rules.consonantBlends) {
            const match = str.match(rule.pattern);
            if (match && match.index === 0) {
                // 检查位置
                if (rule.position === 'initial' && pos !== 0) continue;
                if (rule.position === 'final' && pos + match[0].length !== wordLen) continue;
                
                return {
                    type: 'blend',
                    letters: match[0],
                    sound: rule.sounds.join(' + '),
                    description: '辅音连缀',
                    length: match[0].length,
                    sounds: rule.sounds
                };
            }
        }
        return null;
    }
    
    matchRControlled(str) {
        for (const rule of this.rules.rControlledVowels) {
            const match = str.match(rule.pattern);
            if (match && match.index === 0) {
                return {
                    type: 'r-controlled',
                    letters: match[0],
                    sound: rule.sound,
                    description: rule.description,
                    length: match[0].length
                };
            }
        }
        return null;
    }
    
    matchVowelTeam(str) {
        for (const rule of this.rules.vowelTeams) {
            const match = str.match(rule.pattern);
            if (match && match.index === 0) {
                return {
                    type: 'vowel-team',
                    letters: match[0],
                    sound: rule.sound,
                    description: rule.description,
                    length: match[0].length
                };
            }
        }
        return null;
    }
    
    /**
     * Magic E完整匹配：返回元音（长音）+ 辅音 + 静音e
     */
    matchMagicEFull(str, pos, wordLen, word) {
        // 需要：当前字符是元音，后面跟一个辅音，再后面是e（且e是单词最后一个字符）
        if (str.length < 3) return null;
        const vowel = str[0];
        const consonant = str[1];
        const e = str[2];
        
        if (!this.isVowel(vowel)) return null;
        if (!this.isConsonant(consonant)) return null;
        if (e !== 'e') return null;
        // e必须是单词最后一个字符
        if (pos + 3 !== wordLen) return null;
        
        let sound, description;
        switch (vowel) {
            case 'a': sound = 'ā'; description = 'Magic E: a发长音 /eɪ/'; break;
            case 'i': sound = 'ī'; description = 'Magic E: i发长音 /aɪ/'; break;
            case 'o': sound = 'ō'; description = 'Magic E: o发长音 /əʊ/'; break;
            case 'u': sound = 'ū'; description = 'Magic E: u发长音 /juː/'; break;
            default: return null; // e本身不适用Magic E
        }
        
        return [
            { type: 'magic-e', letters: vowel, sound: sound, description: description, length: 1 },
            { type: 'consonant', letters: consonant, sound: consonant, description: '辅音 /' + consonant + '/', length: 1 },
            { type: 'silent-e', letters: 'e', sound: '', description: 'Magic E中的静音e', length: 1 }
        ];
    }
    
    matchSingle(str, pos, wordLen, word) {
        const char = str[0];
        
        // y在词尾的特殊处理
        if (char === 'y') {
            if (pos === wordLen - 1) {
                // 词尾y：如果前面是辅音发/ī/，前面是元音发/ē/
                if (pos > 0 && this.isConsonant(word[pos - 1])) {
                    return { type: 'vowel', letters: 'y', sound: 'ī', description: 'y在词尾发 /iː/', length: 1 };
                } else if (pos > 0 && this.isVowel(word[pos - 1])) {
                    return { type: 'vowel', letters: 'y', sound: 'ē', description: 'y在元音后发 /iː/', length: 1 };
                }
            } else if (pos > 0 && this.isConsonant(word[pos - 1])) {
                // y在辅音后发/ī/
                return { type: 'vowel', letters: 'y', sound: 'ī', description: 'y在辅音后发 /aɪ/', length: 1 };
            }
            return { type: 'consonant', letters: 'y', sound: 'y', description: '辅音 /j/', length: 1 };
        }
        
        // c的软硬音
        if (char === 'c') {
            if (pos + 1 < wordLen) {
                const next = word[pos + 1];
                if ('eiy'.includes(next)) {
                    return { type: 'consonant', letters: 'c', sound: 's', description: 'c在e,i,y前发 /s/', length: 1 };
                }
            }
            return { type: 'consonant', letters: 'c', sound: 'k', description: 'c在a,o,u前发 /k/', length: 1 };
        }
        
        // g的软硬音（带例外）
        if (char === 'g') {
            if (pos + 1 < wordLen) {
                const next = word[pos + 1];
                if ('eiy'.includes(next)) {
                    // 检查例外情况：直接用完整单词检查
                    if (this.rules.gExceptions.includes(word)) {
                        return { type: 'consonant', letters: 'g', sound: 'g', description: 'g发硬音 /ɡ/（例外）', length: 1 };
                    }
                    return { type: 'consonant', letters: 'g', sound: 'j', description: 'g在e,i,y前发 /dʒ/', length: 1 };
                }
            }
            return { type: 'consonant', letters: 'g', sound: 'g', description: 'g在a,o,u前发 /ɡ/', length: 1 };
        }
        
        // 元音（包括Magic E检测）
        if (this.isVowel(char)) {
            const isLastChar = pos === wordLen - 1;
            const nextIsVowel = pos + 1 < wordLen && this.isVowel(word[pos + 1]);
            
            // Magic E检测：元音 + 辅音 + e（末尾e不发音）
            if (!isLastChar && pos + 2 < wordLen && word[pos + 2] === 'e') {
                const consonantBetween = word[pos + 1];
                if (this.isConsonant(consonantBetween)) {
                    // Magic E模式：元音发长音
                    let sound, description;
                    switch (char) {
                        case 'a': sound = 'ā'; description = 'Magic E: a发长音 /eɪ/'; break;
                        case 'i': sound = 'ī'; description = 'Magic E: i发长音 /aɪ/'; break;
                        case 'o': sound = 'ō'; description = 'Magic E: o发长音 /əʊ/'; break;
                        case 'u': sound = 'ū'; description = 'Magic E: u发长音 /juː/'; break;
                        default: // e没有Magic E
                            sound = this.rules.longVowels[char].sound;
                            description = this.rules.longVowels[char].description;
                    }
                    return { type: 'magic-e', letters: char, sound: sound, description: description, length: 1 };
                }
            }
            
            if (isLastChar || nextIsVowel) {
                // 开音节：发长音
                const longVowel = this.rules.longVowels[char];
                return { type: 'vowel', letters: char, sound: longVowel.sound, description: longVowel.description, length: 1 };
            } else {
                // 闭音节：发短音
                const shortVowel = this.rules.shortVowels[char];
                return { type: 'vowel', letters: char, sound: shortVowel.sound, description: shortVowel.description, length: 1 };
            }
        }
        
        // 辅音
        const consonant = this.rules.consonants[char];
        if (consonant) {
            return { type: 'consonant', letters: char, sound: consonant.sound, description: consonant.description, length: 1 };
        }
        
        return null;
    }
    
    isVowel(char) {
        return 'aeiou'.includes(char);
    }
    
    isConsonant(char) {
        return /[a-z]/.test(char) && !this.isVowel(char);
    }
    
    /**
     * 格式化输出
     */
    formatOutput(phonemes) {
        return phonemes.map(p => ({
            letters: p.letters,
            sound: p.sound,
            description: p.description
        }));
    }
}

// 测试
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PhonemeSegmenter;
}
