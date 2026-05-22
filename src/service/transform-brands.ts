import path from "node:path";
import fs from "node:fs";
import BrandRaw from "../types/Ibrand";
import ValidationResult from "../types/Ivalidation-result";
import Brand from "../schema/brands-schema";

function resolveYearFounded(raw: BrandRaw): number {
  const MIN_YEAR = 1600;
  const candidates = [raw.yearFounded, raw.yearCreated, raw.yearsFounded];

  for (const val of candidates) {
    if (val === null || val === undefined) continue;
    const parsed = Number(val);
    if (!isNaN(parsed) && Number.isInteger(parsed)) return parsed;
  }

  return MIN_YEAR;
}

function resolveNumberOfLocations(raw: BrandRaw): number {
  const val = raw.numberOfLocations;
  if (val !== null && val !== undefined) {
    const parsed = Number(val);
    if (!isNaN(parsed) && Number.isInteger(parsed)) return parsed;
  }
  return 1;
}

function resolveBrandName(raw: BrandRaw): unknown {
  if (raw.brandName) return raw.brandName;
  if (raw.brand && typeof raw.brand === "object" && !Array.isArray(raw.brand)) {
    const nested = (raw.brand as Record<string, unknown>).name;
    if (nested) return nested;
  }
  return undefined;
}

function resolveHeadquarters(raw: BrandRaw): unknown {
  return raw.headquarters ?? raw.hqAddress;
}

function getDocId(raw: BrandRaw): string {
  if (!raw._id) return "unknown";
  return typeof raw._id === "object" ? raw._id.$oid : String(raw._id);
}

export async function validateBrands(): Promise<void> {
  const filePath = path.resolve(__dirname, "../../imported/brands.json");
  const raw: BrandRaw[] = JSON.parse(fs.readFileSync(filePath, "utf-8"));

  const results: ValidationResult[] = [];

  for (let i = 0; i < raw.length; i++) {
    const doc = raw[i];
    const id = getDocId(doc);

    const payload = {
      brandName: resolveBrandName(doc),
      yearFounded: resolveYearFounded(doc),
      headquarters: resolveHeadquarters(doc),
      numberOfLocations: resolveNumberOfLocations(doc),
    };

    const instance = new Brand(payload);
    const validationError = instance.validateSync();

    results.push({
      index: i,
      id,
      status: validationError ? "invalid" : "valid",
      errors: validationError ? [validationError.message] : [],
      data: payload,
    });
  }

  console.log(JSON.stringify(results, null, 2));
}
