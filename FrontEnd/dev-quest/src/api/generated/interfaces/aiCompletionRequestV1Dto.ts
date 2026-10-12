/**
 * "use client";
 */
import type { AiMessageV1Dto } from './aiMessageV1Dto';
import type { AiResponseFormatV1Dto } from './aiResponseFormatV1Dto';

export interface AiCompletionRequestV1Dto {
  /** @nullable */
  model?: string | null;
  /** @nullable */
  messages?: AiMessageV1Dto[] | null;
  /** @nullable */
  temperature?: number | null;
  response_format?: AiResponseFormatV1Dto;
  stream?: boolean;
}
