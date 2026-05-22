interface ValidationResult {
  index: number;
  id: string;
  status: "valid" | "invalid";
  errors: string[];
  data: Record<string, unknown>;
}

export default ValidationResult;
