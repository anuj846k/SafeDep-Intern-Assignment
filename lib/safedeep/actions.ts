"use server";
import { createSafeDepClient, Ecosystem } from "./transport";

export async function getPackageInsight(
  packageName: string,
  version: string,
  ecosystem: Ecosystem = Ecosystem.NPM
) {
  try {
    const client = createSafeDepClient();

    const response = await client.getPackageVersionInsight({
      packageVersion: {
        package: {
          ecosystem: ecosystem,
          name: packageName,
        },
        version: version,
      },
    });

    return { success: true, data: response };
  } catch (error) {
    console.error("Failed to get package insight:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
