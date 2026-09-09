import { generateAndAuditPaper } from "./paperAuditorEngine";

export async function executePaperPipeline(config) {
  return await generateAndAuditPaper(config);
}
