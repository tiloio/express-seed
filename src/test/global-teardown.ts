export default async () => {
    (global as any).__DB_TEST_SERVER__.close();
}