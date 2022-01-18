/** Problem model definitions **/

export interface DeEnPair {
  de: string;
  en: string;
  gap: boolean;
}
export interface ProblemModel {
  id: number;
  example: string;
  problem: DeEnPair[];
  suggest: string[];
}
