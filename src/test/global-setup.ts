import { createLocalDatabase } from "./local-database";


export default async () => {
    (global as any).__DB_TEST_SERVER__ = await createLocalDatabase();
}
