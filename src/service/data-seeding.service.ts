import path from "node:path";
import fs from "node:fs";
import Brand from "../schema/brands-schema";
import { BrandData } from "../types/brand";
import seedCases from "../utils/seed-cases";

const getExportPath = (): string => {
  const outDir = path.resolve(__dirname, "../../exported");
  fs.mkdirSync(outDir, { recursive: true });
  return path.join(outDir, "brands.json");
};

const writeBrandsFile = (brands: unknown[]): void => {
  const outPath = getExportPath();
  fs.writeFileSync(outPath, JSON.stringify(brands, null, 2), "utf-8");
};

export async function seedBrands(): Promise<void> {
  for (const seed of seedCases) {
    console.log(`Seeding case ${seed.caseNumber}: ${seed.caseTitle}`);

    const instance = new Brand(seed.data);
    const validationError = instance.validateSync();

    if (validationError) {
      console.error(
        `Validation error for case ${seed.caseNumber}:`,
        validationError.message,
      );
      continue;
    }

    const existingBrand = await Brand.exists({
      brandName: instance.brandName,
      yearFounded: instance.yearFounded,
      headquarters: instance.headquarters,
      numberOfLocations: instance.numberOfLocations,
    });

    if (existingBrand) {
      console.log(`Case ${seed.caseNumber} already exists. Skipping.`);
      continue;
    }

    try {
      await instance.save();
      console.log(`Case ${seed.caseNumber} saved successfully.`);
    } catch (error) {
      console.error(`Error saving case ${seed.caseNumber}:`, error);
    }
  }

  const allBrands = await Brand.find().lean();
  writeBrandsFile(allBrands);
}
