// Central Aggregator and Algorithmic Rotation Engine for Class 10 (All 17 Subjects Exact Mapping)

import { bookKeepingAccountancyMasterBank } from './book-keeping-accountancy/questionBank.js';
import { carnaticVocalMasterBank } from './carnatic-vocal/questionBank.js';
import { computerApplicationsMasterBank } from './computer-applications/questionBank.js';
import { englishCommunicativeMasterBank } from './english-communicative/questionBank.js';
import { englishLangLitMasterBank } from './english-lang-lit/questionBank.js';
import { hindiAMasterBank } from './hindi-a/questionBank.js';
import { hindiBMasterBank } from './hindi-b/questionBank.js';
import { informationTechnologyMasterBank } from './information-technology/questionBank.js';
import { mathematicsBasicMasterBank } from './mathematics-basic/questionBank.js';
import { mathematicsStandardMasterBank } from './mathematics-standard/questionBank.js';
import { nccMasterBank } from './ncc/questionBank.js';
import { pewbMasterBank } from './pewb/questionBank.js';
import { punjabiMasterBank } from './punjabi/questionBank.js';
import { sanskritMasterBank } from './sanskrit/questionBank.js';
import { scienceMasterBank } from './science/questionBank.js';
import { socialScienceMasterBank } from './social-science/questionBank.js';
import { artificialIntelligenceMasterBank } from './artificial-intelligence/questionBank.js';

export const class10QuestionBanks = {
  'book-keeping-accountancy': bookKeepingAccountancyMasterBank || [],
  'carnatic-vocal': carnaticVocalMasterBank || [],
  'computer-applications': computerApplicationsMasterBank || [],
  'english-communicative': englishCommunicativeMasterBank || [],
  'english-lang-lit': englishLangLitMasterBank || [],
  'hindi-a': hindiAMasterBank || [],
  'hindi-b': hindiBMasterBank || [],
  'sanskrit': sanskritMasterBank || [],
  'punjabi': punjabiMasterBank || [],
  'pewb': pewbMasterBank || [],
  'ncc': nccMasterBank || [],
  'mathematics-standard': mathematicsStandardMasterBank || [],
  'mathematics-basic': mathematicsBasicMasterBank || [],
  'information-technology': informationTechnologyMasterBank || [],
  'science': scienceMasterBank || [],
  'social-science': socialScienceMasterBank || [],
  'artificial-intelligence': artificialIntelligenceMasterBank || []
};

export function generateDynamicPaper(subjectKey, blueprintConfig, sessionExclusions = []) {
  const masterBank = class10QuestionBanks[subjectKey];
  if (!masterBank || masterBank.length === 0) {
    throw new Error(`Master question bank not found or empty for subject: ${subjectKey}`);
  }

  const availablePool = masterBank.filter(q => !sessionExclusions.includes(q.id));
  const poolToUse = availablePool.length >= (Object.values(blueprintConfig).reduce((a, b) => a + b, 0)) 
    ? availablePool 
    : masterBank;

  const shuffled = [...poolToUse].sort(() => 0.5 - Math.random());
  const selectedQuestions = [];
  const counts = { MCQ: 0, Short: 0, 'Case-Study': 0, Long: 0 };

  for (const q of shuffled) {
    const type = q.type && q.type.includes('MCQ') ? 'MCQ' : q.type && q.type.includes('Case') ? 'Case-Study' : q.type && q.type.includes('Long') ? 'Long' : 'Short';
    
    if (counts[type] < (blueprintConfig[type] || 0)) {
      counts[type]++;
      selectedQuestions.push(mutateAndVaryQuestion(q));
    }
  }

  return {
    subject: subjectKey,
    generatedAt: new Date().toISOString(),
    totalQuestions: selectedQuestions.length,
    questions: selectedQuestions
  };
}

function mutateAndVaryQuestion(question) {
  const cloned = JSON.parse(JSON.stringify(question));
  if (cloned.phrasingVariants && Array.isArray(cloned.phrasingVariants) && cloned.phrasingVariants.length > 0) {
    const randomIndex = Math.floor(Math.random() * cloned.phrasingVariants.length);
    cloned.questionText = cloned.phrasingVariants[randomIndex];
  }
  if (cloned.options && Array.isArray(cloned.options)) {
    cloned.options = cloned.options.sort(() => 0.5 - Math.random());
  }
  return cloned;
}
